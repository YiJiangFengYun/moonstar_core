import * as common from "../common";
import * as material from "../material";
import * as render from "../render";
import * as emitterPlayer from "../emitter_player";
import { ModRender, Module } from "./module";

export class ModSpriteConnected extends Module implements ModRender {
    public static NAME = "sprite_connected";

    public material: material.Material = new material.Material(material.MaterialType.SPRITE_CONNECTED);
    public head: common.Vector;
    public tail: common.Vector;
    public ribbon: boolean;

    private _posHelper: common.Vector = common.Vector.create();
    private _uvHelper: common.Vector = common.Vector.create();
    private _cmdHelper: render.DrawCmd = render.DrawCmd.create();
    private _sizeHelper: common.Vector = common.Vector.create();
    private _scaleHelper: common.Vector = common.Vector.create();
    private _colorHelper: common.Color = common.Color.create();
    private _vectorHelper: common.Vector = common.Vector.create();
    private _vectorHelper2: common.Vector = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
    }

    public init(info: any) {
        super.init(info);
        this.material.init(info);
        if (info.head) {
            let head = this.head = common.Vector.create();
            let headConfig = info.head;
            head[0] = headConfig[0] || 0;
            head[1] = headConfig[1] || 0;
        } else {
            this.head = null;
        }
        if (info.tail) {
            let tail = this.tail = common.Vector.create();
            let tailConfig = info.tail;
            tail[0] = tailConfig[0] || 0;
            tail[1] = tailConfig[1] || 0;
        } else {
            this.tail = null;
        }
        this.ribbon = info.ribbon || false;
    }

    public getTotalVtxCount(): number {
        let player = this.player;
        let particleCount = player.particleCount;
        if (this.head) {
            ++particleCount;
        }
        if (this.tail) {
            ++particleCount;
        }
        if (this.ribbon) {
            return 2 * particleCount;
        } else {
            return Math.max(0, 4 * (particleCount - 1));
        }
    }

    public getTotalIdxCount(): number {
        let player = this.player;
        let particleCount = player.particleCount;
        if (this.head) {
            ++particleCount;
        }
        if (this.tail) {
            ++particleCount;
        }
        return Math.max(0, 6 * (particleCount - 1));
    }

    public getMaxVtxCount(): number {
        let particleCount = this.player.maxParticleCount;
        if (this.head) {
            ++particleCount;
        }
        if (this.tail) {
            ++particleCount;
        }
        if (this.ribbon) {
            return 2 * particleCount;
        } else {
            return  Math.max(0, 4 * (particleCount - 1));
        }
    }

    public getMaxIdxCount(): number {
        let particleCount = this.player.maxParticleCount;
        if (this.head) {
            ++particleCount;
        }
        if (this.tail) {
            ++particleCount;
        }
        return Math.max(0, 6 * (particleCount - 1));
    }

    public fillBuffers(drawData: render.DrawData,
        offsets: {
            vtxBufferByteOffset: number;
            idxBufferByteOffset: number;
            lastVertexCount: number; //used as idxValueOffset
            lastIndexCount: number; // used as index offset of cmd.
        }, batchInfo?: {
            lastBatchVertexCount: number;
            lastDrawCmd: render.DrawCmd;
        }
    ): render.DrawCmd {
        let context = this;
        let player = this.player;
        let head = this.head;
        let tail = this.tail;
        let ribbon = this.ribbon;
        let particles = player.particles;
        let particleCount = player.particleCount;
        let finalParticleCount = particleCount;
        if (head) ++finalParticleCount;
        if (tail) ++ finalParticleCount;

        let vtxBufferByteOffset = offsets.vtxBufferByteOffset;

        let idxBufferByteOffset = offsets.idxBufferByteOffset;
        let idxValueOffset = batchInfo ? batchInfo.lastBatchVertexCount : 0;

        let fillVertexData = (
            sliceIndex: number,
            pos1: common.Vector,
            pos2: common.Vector,
            size1: common.Vector,
            size2: common.Vector,
            scale1: common.Vector,
            scale2: common.Vector,
            color1: common.Color,
            color2: common.Color,
            lastPos: common.Vector, // It is for ribbon
        ) => {
            let posHelper = context._posHelper;
            let uvHelper = context._uvHelper;
            let perpHelper = context._vectorHelper;
            let total = finalParticleCount;
            let totalDecOne = total - 1;
            let isRibbon = ribbon;

            let halfSize1 = scale1[0] * size1[0] * 0.5;
            let halfSize2 = scale2[0] * size2[0] * 0.5;

            if (isRibbon && lastPos) {
                let vecHelper = this._vectorHelper2;
                common.Vector.sub(vecHelper, pos1, lastPos);
                common.Vector.sub(perpHelper, pos2, pos1);
                common.Vector.normalize(vecHelper, vecHelper);
                common.Vector.normalize(perpHelper, perpHelper);
                common.Vector.add(perpHelper, vecHelper, perpHelper);
            } else {
                common.Vector.sub(perpHelper, pos2, pos1);
                common.Vector.normalize(perpHelper, perpHelper);
            }
            //Perpendicular
            common.Vector.set(perpHelper, - perpHelper[1], perpHelper[0]);

            //Vertex 0 left top
            common.Vector.scaleAndAdd(posHelper, pos1, perpHelper, - halfSize1);
            uvHelper[0] = 0;
            uvHelper[1] = sliceIndex / totalDecOne;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color1,
            }, vtxBufferByteOffset);

            //Vertex 1 right top
            common.Vector.scaleAndAdd(posHelper, pos1, perpHelper, halfSize1);
            uvHelper[0] = 1;
            uvHelper[1] = sliceIndex / totalDecOne;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color1,
            }, vtxBufferByteOffset);

            if (! ribbon || sliceIndex === totalDecOne - 1) {

                if (ribbon) { //Recaculate perpendicular vector for final point.
                    common.Vector.sub(perpHelper, pos2, pos1);
                    common.Vector.normalize(perpHelper, perpHelper);
                    //Perpendicular
                    common.Vector.set(perpHelper, - perpHelper[1], perpHelper[0]);
                }

                //Vertex 2 left bottom
                common.Vector.scaleAndAdd(posHelper, pos2, perpHelper, - halfSize2);
                uvHelper[0] = 0;
                uvHelper[1] = (sliceIndex + 1) / totalDecOne;
                vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                    pos: posHelper,
                    uv: uvHelper,
                    color: color2,
                }, vtxBufferByteOffset);
    
                //Vertex 3 right bottom
                common.Vector.scaleAndAdd(posHelper, pos2, perpHelper, halfSize2);
                uvHelper[0] = 1;
                uvHelper[1] = (sliceIndex + 1) / totalDecOne;
                vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                    pos: posHelper,
                    uv: uvHelper,
                    color: color2,
                }, vtxBufferByteOffset);
            }

            //Index
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);

            if (ribbon) {
                idxValueOffset += 2;
            } else {
                idxValueOffset += 4;
            }
        }

        let sizeHelper = this._sizeHelper;
        let scaleHelper = this._scaleHelper;
        let colorHelper = this._colorHelper;
        let sliceIndex = 0;

        if (head) {
            if (particleCount) {
                common.Vector.copy(sizeHelper, particles[0].size || common.VECTOR_ZERO);
                common.Vector.copy(scaleHelper, particles[0].scale || common.VECTOR_ONE);
                common.Color.copy(colorHelper, particles[0].color || common.COLOR_WHITE);
            } else {
                common.Vector.copy(sizeHelper, common.VECTOR_ZERO);
                common.Vector.copy(scaleHelper, common.VECTOR_ONE);
                common.Color.copy(colorHelper, common.COLOR_WHITE);
            }
        }

        //Traverse all particles.
        for (let particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            let particle = particles[particleIndex];
            let pos = particle.pos || common.VECTOR_ZERO;
            let scale = particle.scale || common.VECTOR_ONE;
            let size = particle.size || common.VECTOR_ZERO;
            let color = particle.color || common.COLOR_WHITE;
            if (particleIndex) {
                let particleLast = particles[particleIndex - 1];
                let posLast = particleLast.pos || common.VECTOR_ZERO;
                let scaleLast = particleLast.scale || common.VECTOR_ONE;
                let sizeLast = particleLast.size || common.VECTOR_ZERO;
                let colorLast = particleLast.color || common.COLOR_WHITE;
                fillVertexData(
                    sliceIndex,
                    posLast,
                    pos,
                    sizeLast,
                    size,
                    scaleLast,
                    scale,
                    colorLast,
                    color,
                    particleIndex > 1 ? particles[particleIndex - 2].pos : head,
                );
                ++sliceIndex;
            } else if (head) {
                fillVertexData(
                    sliceIndex,
                    head, 
                    pos, 
                    sizeHelper, 
                    size, 
                    scaleHelper, 
                    scale, 
                    colorHelper,
                    color,
                    null,
                );
                ++sliceIndex;
            }
        }

        if (tail) {
            if (particleCount) {
                let particle = particles[particleCount - 1];
                common.Vector.copy(sizeHelper, particle.size || common.VECTOR_ZERO);
                common.Vector.copy(scaleHelper, particle.scale || common.VECTOR_ONE);
                common.Color.copy(colorHelper, particle.color || common.COLOR_WHITE);

                let pos = particle.pos || common.VECTOR_ZERO;
                let scale = particle.scale || common.VECTOR_ONE;
                let size = particle.size || common.VECTOR_ZERO;
                let color = particle.color || common.COLOR_WHITE;
                fillVertexData(
                    sliceIndex,
                    pos,
                    tail, 
                    size,
                    sizeHelper,
                    scale,
                    scaleHelper, 
                    color,
                    colorHelper,
                    particleCount > 1 ? particles[particleCount - 2].pos : head,
                );
            } else {
                fillVertexData(
                    sliceIndex,
                    head,
                    tail,
                    sizeHelper,
                    common.VECTOR_ZERO,
                    scaleHelper,
                    common.VECTOR_ONE,
                    colorHelper,
                    common.COLOR_WHITE,
                    null,
                );
            }
        }

        let indexCount = Math.max(0, 6 * (finalParticleCount - 1));
        let cmd: render.DrawCmd;
        if (batchInfo) {
            cmd = batchInfo.lastDrawCmd;
            cmd.indexCount += indexCount;
            common.Bounds.union(cmd.bounds, cmd.bounds, player.globalBounds);
        } else {
            cmd = context._cmdHelper;
            cmd.vertexBufferByteOffset = offsets.vtxBufferByteOffset;
            cmd.indexCount = indexCount;
            cmd.indexOffset = offsets.lastIndexCount;
            cmd.material = this.material.id;
            common.Bounds.copy(cmd.bounds, player.globalBounds);
        }

        return cmd;
    }
}