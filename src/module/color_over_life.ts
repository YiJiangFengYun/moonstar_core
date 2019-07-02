import { Module, IEmitter } from "./module";
import { Particle } from "../particle/particle";
import { Color, WHITE } from "../common/color";

export interface ParticleSpecial extends Particle {
    time?: number;
    life?: number;
}

export class ModColorOverLife extends Module {
    public static NAME = "color_over_life";
    public beginColor: Color;
    public endColor: Color;
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
        let beginColor = this.beginColor || WHITE;
        let endColor = this.endColor || WHITE;
        let beginColorR = beginColor.r;
        let beginColorG = beginColor.g;
        let beginColorB = beginColor.b;
        let beginColorA = beginColor.a;
        let endColorR = endColor.r;
        let endColorG = endColor.g;
        let endColorB = endColor.b;
        let endColorA = endColor.a;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleSpecial = particles[i];
            let color = particle.color;
            if (! color) particle.color = color = {...WHITE};
            color.r = beginColorR + (endColorR - beginColorR) * (particle.time / particle.life);
            color.g = beginColorG + (endColorG - beginColorG) * (particle.time / particle.life);
            color.b = beginColorB + (endColorB - beginColorB) * (particle.time / particle.life);
            color.a = beginColorA + (endColorA - beginColorA) * (particle.time / particle.life);
        }
    }
}