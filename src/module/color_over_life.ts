import { Module, IEmitter } from "./module";
import { Particle } from "../particle/particle";

export interface ParticleSpecial extends Particle {
    time?: number;
    life?: number;
    colorR?: number;
    colorG?: number;
    colorB?: number;
    colorA?: number;
}

export class ModColorOverLife extends Module {
    public static NAME = "color_over_life";
    public beginColorR: number;
    public beginColorG: number;
    public beginColorB: number;
    public beginColorA: number;
    public endColorR: number;
    public endColorG: number;
    public endColorB: number;
    public endColorA: number;
    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModColorOverLife.NAME;
    }

    public init() {

    }

    public update() {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        let beginColorR = this.beginColorR || 0;
        let beginColorG = this.beginColorG || 0;
        let beginColorB = this.beginColorB || 0;
        let beginColorA = this.beginColorA || 0;
        let endColorR = this.endColorR || 0;
        let endColorG = this.endColorG || 0;
        let endColorB = this.endColorB || 0;
        let endColorA = this.endColorA || 0;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleSpecial = particles[i];
            particle.colorR = beginColorR + (endColorR - beginColorR) * (particle.time / particle.life);
            particle.colorG = beginColorG + (endColorG - beginColorG) * (particle.time / particle.life);
            particle.colorB = beginColorB + (endColorB - beginColorB) * (particle.time / particle.life);
            particle.colorA = beginColorA + (endColorA - beginColorA) * (particle.time / particle.life);
        }
    }
}