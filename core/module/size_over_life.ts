import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleSpecial extends particleMod.Particle {
    time?: number;
    life?: number;
}

export class ModSizeOverLife extends Module {
    public static NAME = "size_over_life";
    public sizeBegin: common.Vector = common.Vector.create();
    public sizeEnd: common.Vector = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSizeOverLife.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let sizeBegin = this.sizeBegin;
        let sizeBeginConfig = info.sizeBegin || common.VECTOR_ZERO;
        sizeBegin[0] = sizeBeginConfig[0] || 0;
        sizeBegin[1] = sizeBeginConfig[1] || 0;
        let sizeEnd = this.sizeEnd;
        let sizeEndConfig = info.sizeEnd || common.VECTOR_ZERO;
        sizeEnd[0] = sizeEndConfig[0] || 0;
        sizeEnd[1] = sizeEndConfig[1] || 0;

    }

    public update() {
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        let sizeBegin = this.sizeBegin;
        let sizeEnd = this.sizeEnd;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleSpecial = particles[i];
            let size = particle.size;
            size[0] = sizeBegin[0] + (sizeEnd[0] - sizeBegin[0]) * (particle.time / particle.life);
            size[1] = sizeBegin[1] + (sizeEnd[1] - sizeBegin[1]) * (particle.time / particle.life);
        }
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        if (particle.size) {
            common.Vector.copy(particle.size, this.sizeBegin);
        } else {
            particle.size = common.Vector.clone(this.sizeBegin);
        }
    }
}