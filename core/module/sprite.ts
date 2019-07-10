import * as common from "../common";
import * as material from "../material";
import * as render from "../render";
import * as emitterPlayer from "../emitter_player";
import { ModRender, Module } from "./module";

export class ModSprite extends Module implements ModRender {
    public static NAME = "sprite";

    public material: material.Material;
    public useSubUV: boolean;

    private _posHelper: common.Vector = common.Vector.create();
    private _uvHelper: common.Vector = common.Vector.create();
    private _cmdHelper: render.DrawCmd = render.DrawCmd.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSprite.NAME;
        this.material = new material.Material(material.MaterialType.SPRITE);
    }

    public init(info: any) {
        super.init(info);
        this.material.init(info);
        this.useSubUV = info.useSubUV || false;
    }

    public getTotalVtxCount(): number {
        let player = this.player;
        let particleCount = player.particleCount;
        return particleCount * 4;
    }

    public getTotalIdxCount(): number {
        let player = this.player;
        let particleCount = player.particleCount;
        return particleCount * 6;
    }

    public getMaxVtxCount(): number {
        return this.player.maxParticleCount * 4;
    }

    public getMaxIdxCount(): number {
        return this.player.maxParticleCount * 6;
    }

    public fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number; //used as idxValueOffset
        lastIndexCount: number; // used as index offset of cmd.
    }): void {
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        let useSubUV = this.useSubUV;
        // todo 
        // let origin = player.origin;
        // let useLocal = player.useLocalSpace; 

        let vtxBufferByteOffset = offsets.idxBufferByteOffset;

        let idxBufferByteOffset = offsets.idxBufferByteOffset;
        let idxValueOffset = offsets.lastVertexCount;

        let posHelper: common.Vector = this._posHelper;
        let uvHelper: common.Vector = this._uvHelper;
        let cmdHelper: render.DrawCmd = this._cmdHelper;

        //Traverse all particles.
        for (let particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            let particle = particles[particleIndex];
            let pos = particle.pos || common.COLOR_ZERO;
            let scale = particle.scale || common.VECTOR_ONE;
            let size = particle.size || common.COLOR_ZERO;
            let color = particle.color || common.COLOR_WHITE;
            let rotation = particle.rotation || 0;
            
            let angle = rotation;
            let cos = Math.cos(angle);
            let sin = Math.sin(angle);
            let halfW = size[0] * scale[0] / 2;
            let halfH = size[1] * scale[1] / 2;
            let halfWNegative = - halfW;
            let halfHNegative = - halfH;

            let subUV: common.Vector4;
            if (this.useSubUV) {
                subUV = particle.subUV || common.VECTOR4_ZERO_ONE;
            }
            //Vertex 0 left top
            posHelper[0] = pos[0] + cos * halfWNegative - sin * halfH;
            posHelper[1] = pos[1] + sin * halfWNegative + cos * halfH;
            if (useSubUV) {
                uvHelper[0] = subUV[0];
                uvHelper[1] = subUV[1];
            } else {
                uvHelper[0] = 0;
                uvHelper[1] = 0;
            }
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 1 right top
            posHelper[0] = pos[0] + cos * halfW - sin * halfH;
            posHelper[1] = pos[1] + sin * halfW + cos * halfH;
            if (useSubUV) {
                uvHelper[0] = subUV[2];
                uvHelper[1] = subUV[1];
            } else {
                uvHelper[0] = 1;
                uvHelper[1] = 0;
            }
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 2 left bottom
            posHelper[0] = pos[0] + cos * halfWNegative - sin * halfHNegative;
            posHelper[1] = pos[1] + sin * halfWNegative + cos * halfHNegative;
            if (subUV) {
                uvHelper[0] = subUV[0];
                uvHelper[1] = subUV[3];
            } else {
                uvHelper[0] = 0;
                uvHelper[1] = 1;
            }
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 3 right bottom
            posHelper[0] = pos[0] + cos * halfW - sin * halfHNegative;
            posHelper[1] = pos[1] + sin * halfW + cos * halfHNegative;
            if (subUV) {
                uvHelper[0] = subUV[2];
                uvHelper[1] = subUV[3];
            } else {
                uvHelper[0] = 1;
                uvHelper[1] = 1;
            }
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);

            //Index
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);

            idxValueOffset += 4;
        }

        cmdHelper.indexOffset = offsets.lastIndexCount;
        cmdHelper.indexCount = particleCount * 6;
        cmdHelper.material = this.material;

        common.Vector.copy(cmdHelper.translationEmitter, player.origin);
        cmdHelper.rotationEmitter = player.rotation;

        drawData.fillDrawCmd(cmdHelper);
        
    }
}