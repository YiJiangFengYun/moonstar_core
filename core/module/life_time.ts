import * as particle from "../particle";
import * as log from "loglevel";
import { IEmitter, Module } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";

export interface ParticleWithLifeTime extends particle.Particle {
    time?: number;
    life?: number;
}

export class ModLifeTime extends Module {
    public static NAME = "life_time";
    public life: number; //Unit(ms)

    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModLifeTime.NAME;
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.life = info.life;
    }

    public update(dt: number) {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        for (let i = particleCount - 1; i >= 0; --i) {
            let particle: ParticleWithLifeTime = particles[i];
            particle.time = (particle.time || 0) + dt;
            if (particle.time >= particle.life) {
                owner.particleCount = particleCount = this._deleteParticle(
                    particle, 
                    particles,
                    particleCount,
                );
            }
        }

    }

    private _deleteParticle(particle: particle.Particle, particles: particle.Particle[], particleCount: number) {
        let index = particles.indexOf(particle);
        if (index >= 0) {
            let end = --particleCount;
            let endParticle = particles[end];
            particles[end] = particles[index];
            particles[index] = endParticle;
            
        } else {
            log.error("Can't find the particle from the particles for delete the particle.");
        }
        return particleCount;
    }

    private _onCreateParticle(particle: ParticleWithLifeTime) {
        particle.life = this.life;
        particle.time = 0;
    }
}