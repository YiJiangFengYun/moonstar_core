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
    private _vecPerpendicularHelper: common.Vector = common.Vector.create();
    private _posHelper: common.Vector = common.Vector.create();
    private _uvHelper: common.Vector = common.Vector.create();
    private _cmdHelper: render.DrawCmd = render.DrawCmd.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModRibbon.NAME;

        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreatedParticle, this);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, this._onDestroyedParticle, this);
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
        let player = this.player;
        let particleCount = player.particleCount;
        return particleCount * 2;
    }

    public getTotalIdxCount(): number {
        let player = this.player;
        let particleCount = player.particleCount;
        return (particleCount - 1) * 6;
    }

    public getMaxVtxCount(): number {
        return this.player.maxParticleCount * 2;
    }

    public getMaxIdxCount(): number {
        return (this.player.maxParticleCount - 1) * 6;
    }

    public fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number; //used as idxValueOffset
        lastIndexCount: number; // used as index offset of cmd.
    }): void {
        let player = this.player;
        let queueParticles = this.queueParticles;
        let particleCount = queueParticles.length;

        let vtxBufferByteOffset = offsets.vtxBufferByteOffset;

        let idxBufferByteOffset = offsets.idxBufferByteOffset;
        let idxValueOffset = 0;

        let vecDirectHelper = this._vecDirectHelper;
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
                let particle2Pos: common.Vector;
                let vecDirect = vecDirectHelper;
                if (particleIndex < particleCountDecOne) {
                    particle2 = queueParticles.getItem(particleIndex + 1);
                    particle2Pos = particle2.pos;
                    vecDirect[0] = particle2Pos[0] - particlePos[0];
                    vecDirect[1] = particle2Pos[1] - particlePos[1];
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
                let width = scaleWidth * sizeWidth;
                let vec_width_x = vecPerpendicular[0] * width;
                let vec_width_y = vecPerpendicular[1] * width;

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

        cmdHelper.vertexBufferByteOffset = offsets.vtxBufferByteOffset;
        cmdHelper.indexOffset = offsets.lastIndexCount;
        cmdHelper.indexCount = (particleCount - 1) * 6;
        cmdHelper.material = this.material.id;
        cmdHelper.emitterPlayer = this.player.id;

        common.Vector.copy(cmdHelper.translationEmitter, player.position);
        cmdHelper.rotationEmitter = player.rotation;

        drawData.fillDrawCmd(cmdHelper);
    }

    private _onCreatedParticle(particle: particle.Particle) {
        this.queueParticles.push(particle);
    }

    private  _onDestroyedParticle() {
        this.queueParticles.pop();
    }

}