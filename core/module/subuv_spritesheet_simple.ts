import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

interface ParticleWithFrameInfo extends particleMod.Particle {
    currTimes?: number;
    currFrame?: number;
    startFrameTime?: number;
}

export class ModSubUVSpriteSheetSimple extends Module {
    public static NAME = "subuv_spritesheet_simple";

    /**
     * UV Size of one frame.
     */
    public frameUVSize: common.Vector = common.Vector.create();

    /**
     * Frame interval for play animation.
     */
    public frameInterval: number;

    /**
     * Play times.
     */
    public times: number;

    private _colSize: number;
    private _rowSize: number;
    private _totalFrames: number;


    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSubUVSpriteSheetSimple.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.frameUVSize[0] = info.uvSize[0];
        this.frameUVSize[1] = info.uvSize[1];
        this.frameInterval = info.frameRate > 0 ? 1 / info.frameRate : Number.MAX_VALUE;
        this.times = info.times || 0;
        this._colSize = Math.floor(1 / info.uvSize[0]);
        this._rowSize = Math.floor(1 / info.uvSize[1]);
        this._totalFrames = this._colSize * this._rowSize;
    }

    public update(dt: number) {
        super.update(dt);
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        let times = this.times;
        let frameInterval = this.frameInterval;
        let totalFrames = this._totalFrames;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleWithFrameInfo = particles[i];
            let framePastTime = player.time - particle.startFrameTime;
            let frame = Math.floor(framePastTime / frameInterval);
            let playTimes = Math.floor(frame / totalFrames);
            if (times && playTimes >= times) {
                playTimes = times;
                frame = totalFrames - 1;
            } else {
                frame = frame % totalFrames;
            }
            if (particle.currFrame !== frame || particle.currTimes !== playTimes) {
                particle.currFrame = frame
                particle.currTimes = playTimes;
                this._updateParticleSubUV(particle);
            }
            

        }
    }

    private _onCreateParticle(particle: ParticleWithFrameInfo) {
        particle.currFrame = 0;
        particle.currTimes = 0;
        particle.startFrameTime = this.player.time;
        this._updateParticleSubUV(particle);
    }

    private _updateParticleSubUV(particle: ParticleWithFrameInfo) {
        let currFrame = particle.currFrame;
        let frameUVSize = this.frameUVSize;
        let colSize = this._colSize;
        let colIndex = currFrame % colSize;
        let rowIndex = Math.floor(currFrame / colSize);
        let uL = colIndex * frameUVSize[0];
        let vT = rowIndex * frameUVSize[1];
        let uR = uL + frameUVSize[0];
        let vB = vT + frameUVSize[1]
        if (particle.subUV) {
            common.Vector4.copy(particle.subUV, [
                uL,
                vT,
                uR,
                vB,
            ]);
        } else {
            particle.subUV = common.Vector4.fromValues(
                uL,
                vT,
                uR,
                vB,
            );
        }
    }
}