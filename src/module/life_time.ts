import * as log from "loglevel";
import { IEmitter, Module } from "./module";
import { Particle } from "../particle/particle";
import { EVENT_CREATE_PARTICLE } from "./spawn";

export interface ParticleWithLifeTime extends Particle {
    time?: number;
    life?: number;
}

export class ModLifeTime extends Module {

    public life: number; //Unit(ms)

    public constructor(owner: IEmitter) {
        super(owner);
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init() {
    }

    public update(dt: number) {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleWithLifeTime = particles[i];
            particle.time = (particle.time || 0) + dt;
            if (particle.time >= particle.life) {
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

    private _onCreateParticle(particle: ParticleWithLifeTime) {
        particle.life = this.life;
    }
}