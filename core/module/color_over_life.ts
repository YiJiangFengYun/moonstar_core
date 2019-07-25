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
        this.colorBegin = common.Color.create();
        this.colorEnd = common.Color.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let colorBegin = this.colorBegin;
        let colorBeginConfig = info.colorBegin || common.COLOR_WHITE;
        let colorEnd = this.colorEnd;
        let colorEndConfig = info.colorEnd || common.COLOR_WHITE;
        colorBegin[0] = colorBeginConfig[0];
        colorBegin[1] = colorBeginConfig[1];
        colorBegin[2] = colorBeginConfig[2];
        colorBegin[3] = colorBeginConfig[3];
        colorEnd[0] = colorEndConfig[0];
        colorEnd[1] = colorEndConfig[1];
        colorEnd[2] = colorEndConfig[2];
        colorEnd[3] = colorEndConfig[3];
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
            let life = particle.life;
            color[0] = beginColorR + (endColorR - beginColorR) * life;
            color[1] = beginColorG + (endColorG - beginColorG) * life;
            color[2] = beginColorB + (endColorB - beginColorB) * life;
            color[3] = beginColorA + (endColorA - beginColorA) * life;
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