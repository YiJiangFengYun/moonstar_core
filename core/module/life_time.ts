import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player"
import { Module } from "./module";

export interface ParticleWithLifeTime extends particleMod.Particle {
    /**
     * Elapsed time of the particle.
     */
    time?: number;
    /**
     * Total time of the life of the particle.
     */
    lifeTime: number;

    /**
     * Relative value of the life of the particle, value is [0 1]
     */
    life?: number;
}

export class ModLifeTime extends Module {
    public static NAME = "life_time";

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModLifeTime.NAME;
    }

    public init(info: any) {
        super.init(info);
    }

    public update(dt: number) {
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        for (let i = particleCount - 1; i >= 0; --i) {
            let particle: ParticleWithLifeTime = particles[i] as ParticleWithLifeTime;
            particle.time = particle.time + dt;
            if (particle.time >= particle.lifeTime) {
                particle.life = 1;
                player.deleteParticle(
                    particle, 
                );
            } else {
                particle.life = particle.time / particle.lifeTime;
            }
        }

        if ( ! player.completed && player.checkComplete()) {
            player.complete();
        }

    }
}