import * as common from "../common";
import * as particle from "../particle";
import { Module, IEmitter } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";
import { Particle } from "../particle";

export interface ParticleSpecial extends particle.Particle {
    time?: number;
    life?: number;
}

export class ModColorOverLife extends Module {
    public static NAME = "color_over_life";
    public beginColor: common.Color;
    public endColor: common.Color;
    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModColorOverLife.NAME;
        this.beginColor = { r: 0, g: 0, b: 0, a: 0 };
        this.endColor = { r: 0, g: 0, b: 0, a: 0 };
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let beginColor = this.beginColor;
        let endColor = this.endColor;
        beginColor.r = info.beginColorR;
        beginColor.g = info.beginColorG;
        beginColor.b = info.beginColorB;
        beginColor.a = info.beginColorA;
        endColor.r = info.endColorR;
        endColor.g = info.endColorG;
        endColor.b = info.endColorB;
        endColor.a = info.endColorA;
    }

    public update() {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        let beginColor = this.beginColor || common.WHITE;
        let endColor = this.endColor || common.WHITE;
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
            if (! color) particle.color = color = {...common.WHITE};
            color.r = beginColorR + (endColorR - beginColorR) * (particle.time / particle.life);
            color.g = beginColorG + (endColorG - beginColorG) * (particle.time / particle.life);
            color.b = beginColorB + (endColorB - beginColorB) * (particle.time / particle.life);
            color.a = beginColorA + (endColorA - beginColorA) * (particle.time / particle.life);
        }
    }

    private _onCreateParticle(particle: Particle) {
        if (particle.color) {
            common.copyColor(this.beginColor, particle.color);
        } else {
            particle.color = { ...this.beginColor };
        }
    }
}