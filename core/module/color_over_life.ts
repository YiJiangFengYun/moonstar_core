import * as common from "../common";
import * as particle from "../particle";
import * as emitterData from "../emitter_player";
import { Module } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";

export interface ParticleSpecial extends particle.Particle {
    time?: number;
    life?: number;
}

export class ModColorOverLife extends Module {
    public static NAME = "color_over_life";
    public beginColor: common.Color;
    public endColor: common.Color;
    public constructor(owner: emitterData.EmitterPlayer) {
        super(owner);
        this.name = ModColorOverLife.NAME;
        this.beginColor = common.Color.create();
        this.endColor = common.Color.create();
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let beginColor = this.beginColor;
        let endColor = this.endColor;
        beginColor[0] = info.beginColorR || 0;
        beginColor[1] = info.beginColorG || 0;
        beginColor[2] = info.beginColorB || 0;
        beginColor[3] = info.beginColorA || 0;
        endColor[0] = info.endColorR || 0;
        endColor[1] = info.endColorG || 0;
        endColor[2] = info.endColorB || 0;
        endColor[3] = info.endColorA || 0;
    }

    public update() {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        let beginColor = this.beginColor || common.COLOR_WHITE;
        let endColor = this.endColor || common.COLOR_WHITE;
        let beginColorR = beginColor[0];
        let beginColorG = beginColor[1];
        let beginColorB = beginColor[2];
        let beginColorA = beginColor[3];
        let endColorR = endColor[0];
        let endColorG = endColor[1];
        let endColorB = endColor[2];
        let endColorA = endColor[3];
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleSpecial = particles[i];
            let color = particle.color;
            if (! color) particle.color = color = common.Color.create();
            color[0] = beginColorR + (endColorR - beginColorR) * (particle.time / particle.life);
            color[1] = beginColorG + (endColorG - beginColorG) * (particle.time / particle.life);
            color[2] = beginColorB + (endColorB - beginColorB) * (particle.time / particle.life);
            color[3] = beginColorA + (endColorA - beginColorA) * (particle.time / particle.life);
        }
    }

    private _onCreateParticle(particle: particle.Particle) {
        if (particle.color) {
            common.Color.copy(particle.color, this.beginColor);
        } else {
            particle.color = common.Color.clone(this.beginColor);
        }
    }
}