import * as particleMod from "../particle";
import * as log from "loglevel";
import * as emitterPlayer from "../emitter_player"
import { Module } from "./module";

export interface ParticleWithLifeTime extends particleMod.Particle {
    time?: number;
    life?: number;
}

export class ModLifeTime extends Module {
    public static NAME = "life_time";
    public life: number; //Unit(ms)

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModLifeTime.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.life = info.life;
    }

    public update(dt: number) {
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        for (let i = particleCount - 1; i >= 0; --i) {
            let particle: ParticleWithLifeTime = particles[i];
            particle.time = (particle.time || 0) + dt;
            if (particle.time >= particle.life) {
                player.particleCount = particleCount = this._deleteParticle(
                    particle, 
                    particles,
                    particleCount,
                );
            }
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

    private _onCreateParticle(particle: ParticleWithLifeTime) {
        particle.life = this.life;
        particle.time = 0;
    }
}