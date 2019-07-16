import * as particleMod from "../particle";
import * as log from "loglevel";
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
                player.particleCount = particleCount = this._deleteParticle(
                    particle, 
                    particles,
                    particleCount,
                );
            } else {
                particle.life = particle.time / particle.lifeTime;
            }
        }

        if ( ! player.completed && player.checkComplete()) {
            player.complete();
        }

    }

    private _deleteParticle(particle: particleMod.Particle, particles: particleMod.Particle[], particleCount: number) {
        let index = particles.indexOf(particle);
        if (index >= 0) {
            let end = --particleCount;
            let endParticle = particles[end];
            particles[end] = particles[index];
            particles[index] = endParticle;
            this.player.emit(emitterPlayer.EVENT_DESTROYED_PARTICLE, particle);
            
        } else {
            log.error("Can't find the particle from the particles for delete the particle.");
        }
        return particleCount;
    }
}