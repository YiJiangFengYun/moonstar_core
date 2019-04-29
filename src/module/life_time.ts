import * as log from "loglevel";
import { IEmitter, Module } from "./module";
import { Particle } from "../particle/particle";

export interface ParticleWithLife extends Particle {
    life?: number;
}

export class ModLifeTime extends Module {

    public life: number; //Unit(ms)

    public constructor(owner: IEmitter) {
        super(owner);
    }

    public init() {
    }

    public update(dt: number) {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        let life = this.life;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleWithLife = particles[i];
            particle.life = (particle.life || 0) + dt;
            if (particle.life >= life) {
                owner.particleCount = particleCount = this._deleteParticle(
                    particle, 
                    particles,
                    particleCount,
                );
                --i;
            }
        }

    }

    private _deleteParticle(particle: Particle, particles: Particle[], particleCount: number) {
        let index = particles.indexOf(particle);
        if (index >= 0) {
            let endParticle = particles[--particleCount];
            particles[index] = endParticle;
        } else {
            log.error("Can't find the particle from the particles for delete the particle.");
        }
        return particleCount;
    }
}