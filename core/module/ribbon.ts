import * as common from "../common";
import * as particle from "../particle";
import * as material from "../material";
import * as render from "../render";
import * as emitterPlayer from "../emitter_player";
import * as util from "../util";
import { ModRender, Module } from "./module";
import { ParticleWithLifeTime } from "./life_time";

export class ModRibbon extends Module implements ModRender {
    public static NAME = "ribbon";

    /**
     * A queue (FIFO) to store the particles created sequentially.
     */
    public queueParticles: util.QueueArrayFixed<particle.Particle>;

    public material: material.Material = new material.Material(material.MaterialType.RIBBON);

    private _vecDirectHelper: common.Vector = common.Vector.create();
    private _vecDirectHelper2: common.Vector = common.Vector.create();
    private _vecPerpendicularHelper: common.Vector = common.Vector.create();
    private _posHelper: common.Vector = common.Vector.create();
    private _uvHelper: common.Vector = common.Vector.create();
    private _cmdHelper: render.DrawCmd = render.DrawCmd.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreatedParticle, this);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, this._onDestroyedParticle, this);
        player.on(emitterPlayer.EVENT_RESET, this._onReset, this);
    }

    public init(info: any) {
        super.init(info);
        this.material.init(info);
        this.queueParticles = new util.QueueArrayFixed<particle.Particle>(this.player.maxParticleCount);
    }

    public reset() {
        super.reset();
        this.queueParticles.empty();
    }

    public getTotalVtxCount(): number {
        return this.queueParticles.length * 2;
    }

    public getTotalIdxCount(): number {
        return Math.max(0, (this.queueParticles.length - 1) * 6);
    }

    public getMaxVtxCount(): number {
        return this.player.maxParticleCount * 2;
    }

    public getMaxIdxCount(): number {
        return Math.max(0, (this.player.maxParticleCount - 1) * 6);
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
        let player = this.player;
        let queueParticles = this.queueParticles;
        let particleCount = queueParticles.length;

        let vtxBufferByteOffset = offsets.vtxBufferByteOffset;

        let idxBufferByteOffset = offsets.idxBufferByteOffset;
        let idxValueOffset = batchInfo ? batchInfo.lastBatchVertexCount : 0;

        let vecDirectHelper = this._vecDirectHelper;
        let vecDirectHelper2 = this._vecDirectHelper2;
        let vecPerpendicularHelper = this._vecPerpendicularHelper;
        let posHelper = this._posHelper;
        let uvHelper = this._uvHelper;
        let cmdHelper = this._cmdHelper;

        if (particleCount > 1) {
            let particleCountDecOne = particleCount - 1;
            for (let particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
                let particle: ParticleWithLifeTime = queueParticles.getItem(particleIndex) as ParticleWithLifeTime;
                let particlePos = particle.pos;
                let particle2: particle.Particle;
                let particle3: particle.Particle;
                let particle2Pos: common.Vector;
                let particle3Pos: common.Vector;
                let vecDirect = vecDirectHelper;
                let vecDirect2 = vecDirectHelper2;
                if (particleIndex < particleCountDecOne) {
                    if (particleIndex > 0) {
                        particle2 = queueParticles.getItem(particleIndex + 1);
                        particle2Pos = particle2.pos;
                        particle3 = queueParticles.getItem(particleIndex - 1);
                        particle3Pos = particle3.pos;
                        vecDirect[0] = (particle2Pos[0] - particlePos[0]);
                        vecDirect[1] = (particle2Pos[1] - particlePos[1]);
                        vecDirect2[0] = (particlePos[0] - particle3Pos[0]);
                        vecDirect2[1] = (particlePos[1] - particle3Pos[1]);
                        common.Vector.normalize(vecDirect, vecDirect);
                        common.Vector.normalize(vecDirect2, vecDirect2);
                        common.Vector.add(vecDirect, vecDirect, vecDirect2);
                    } else {
                        particle2 = queueParticles.getItem(particleIndex + 1);
                        particle2Pos = particle2.pos;
                        vecDirect[0] = particle2Pos[0] - particlePos[0];
                        vecDirect[1] = particle2Pos[1] - particlePos[1];
                    }
                } else {
                    particle2 = queueParticles.getItem(particleIndex - 1);
                    particle2Pos = particle2.pos;
                    vecDirect[0] = particlePos[0] - particle2Pos[0];
                    vecDirect[1] = particlePos[1] - particle2Pos[1];
                }
                common.Vector.normalize(vecDirect, vecDirect);
                let vecPerpendicular = vecPerpendicularHelper;
                vecPerpendicular[0] = - vecDirect[1];
                vecPerpendicular[1] = vecDirect[0];
                let scale = particle.scale || common.VECTOR_ONE;
                let scaleWidth = scale[0];
                let size = particle.size || common.COLOR_ZERO;
                let sizeWidth = size[0];
                let color = particle.color || common.COLOR_WHITE;
                let life = (particle as any).life;
                let widthHalf = scaleWidth * sizeWidth * 0.5;
                let vec_width_x = vecPerpendicular[0] * widthHalf;
                let vec_width_y = vecPerpendicular[1] * widthHalf;

                //The vertex of the left.
                posHelper[0] = particlePos[0] - vec_width_x;
                posHelper[1] = particlePos[1] - vec_width_y;
                uvHelper[0] = 0;
                uvHelper[1] = life;
                vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                    pos: posHelper,
                    uv: uvHelper,
                    color: color,
                }, vtxBufferByteOffset);
                

                //The vertex of the right.
                posHelper[0] = particlePos[0] + vec_width_x;
                posHelper[1] = particlePos[1] + vec_width_y;
                uvHelper[0] = 1;
                uvHelper[1] = life;
                vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                    pos: posHelper,
                    uv: uvHelper,
                    color: color,
                }, vtxBufferByteOffset);

                //Index
                if (particleIndex > 0) {
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
                    idxValueOffset += 2;
                }

            }
        }

        let indexCount = Math.max(0, (particleCount - 1) * 6);
        let cmd: render.DrawCmd;
        if (batchInfo) {
            cmd = batchInfo.lastDrawCmd;
            cmd.indexCount += indexCount;
            common.Bounds.union(cmd.bounds, cmd.bounds, player.globalBounds);
        } else {
            cmd = cmdHelper;
            cmd.vertexBufferByteOffset = offsets.vtxBufferByteOffset;
            cmd.indexCount = indexCount;
            cmd.indexOffset = offsets.lastIndexCount;
            cmd.material = this.material.id;
            common.Bounds.copy(cmd.bounds, player.globalBounds);
        }

        return cmd;
    }

    private _onCreatedParticle(particle: particle.Particle) {
        this.queueParticles.push(particle);
    }

    private _onDestroyedParticle() {
        this.queueParticles.pop();
    }

    private _onReset() {
        this.queueParticles.empty();
    }

}