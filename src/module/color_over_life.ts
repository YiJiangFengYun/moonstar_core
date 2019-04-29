import { Module, IEmitter } from "./module";
import { Particle } from "../particle/particle";

export interface ParticleSpecial extends Particle {
    time?: number;
    life?: number;
    color?: number;
}

export class ModColorOverLife extends Module {
    public beginColor: number;
    public endColor: number;
    public constructor(owner: IEmitter) {
        super(owner);
    }

    public init() {

    }

    public update() {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        let beginColor = this.beginColor || 0;
        let endColor = this.endColor || 0;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleSpecial = particles[i];
            particle.color = beginColor + (endColor - beginColor) * (particle.time / particle.life);
        }
    }
}