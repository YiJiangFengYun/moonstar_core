import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleSpecial extends particleMod.Particle {
    time?: number;
    life?: number;
}

export class ModColorOverLife extends Module {
    public static NAME = "color_over_life";
    public colorBegin: common.Color;
    public colorEnd: common.Color;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModColorOverLife.NAME;
        this.colorBegin = common.Color.create();
        this.colorEnd = common.Color.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let colorBegin = this.colorBegin;
        let colorEnd = this.colorEnd;
        colorBegin[0] = info.rBegin || 0;
        colorBegin[1] = info.gBegin || 0;
        colorBegin[2] = info.bBegin || 0;
        colorBegin[3] = info.aBegin || 0;
        colorEnd[0] = info.rEnd || 0;
        colorEnd[1] = info.gEnd || 0;
        colorEnd[2] = info.bEnd || 0;
        colorEnd[3] = info.aEnd || 0;
    }

    public update() {
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        let colorBegin = this.colorBegin || common.COLOR_WHITE;
        let colorEnd = this.colorEnd || common.COLOR_WHITE;
        let beginColorR = colorBegin[0];
        let beginColorG = colorBegin[1];
        let beginColorB = colorBegin[2];
        let beginColorA = colorBegin[3];
        let endColorR = colorEnd[0];
        let endColorG = colorEnd[1];
        let endColorB = colorEnd[2];
        let endColorA = colorEnd[3];
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

    private _onCreateParticle(particle: particleMod.Particle) {
        if (particle.color) {
            common.Color.copy(particle.color, this.colorBegin);
        } else {
            particle.color = common.Color.clone(this.colorBegin);
        }
    }
}