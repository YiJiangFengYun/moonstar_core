import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModColorInitialRandom extends Module {
    public static NAME = "color_initial_random";
    public colorMin: common.Color = common.Color.create();
    public colorMax: common.Color = common.Color.create();
    public channelSame: boolean;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let colorMin = this.colorMin;
        let colorMinConfig = info.colorMin || common.COLOR_BLACK;
        let colorMax = this.colorMax;
        let colorMaxConfig = info.colorMax || common.COLOR_WHITE;
        colorMin[0] = colorMinConfig[0];
        colorMin[1] = colorMinConfig[1];
        colorMin[2] = colorMinConfig[2];
        colorMin[3] = colorMinConfig[3];

        colorMax[0] = colorMaxConfig[0];
        colorMax[1] = colorMaxConfig[1];
        colorMax[2] = colorMaxConfig[2];
        colorMax[3] = colorMaxConfig[3];

        this.channelSame = info.channelSame || false;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        let color: [number, number, number, number] = [0, 0, 0, 0];
        let colorMin = this.colorMin;
        let colorMax = this.colorMax;
        if (this.channelSame) {
            let r = Math.random();
            color[0] = colorMin[0] + (colorMax[0] - colorMin[0]) * r;
            color[1] = colorMin[1] + (colorMax[1] - colorMin[1]) * r;
            color[2] = colorMin[2] + (colorMax[2] - colorMin[2]) * r;
            color[3] = colorMin[3] + (colorMax[3] - colorMin[3]) * r;
        } else {
            color[0] = colorMin[0] + (colorMax[0] - colorMin[0]) * Math.random();
            color[1] = colorMin[1] + (colorMax[1] - colorMin[1]) * Math.random();
            color[2] = colorMin[2] + (colorMax[2] - colorMin[2]) * Math.random();
            color[3] = colorMin[3] + (colorMax[3] - colorMin[3]) * Math.random();
        }
        if (particle.color) {
            common.Color.copy(particle.color, color);
        } else {
            particle.color = common.Color.clone(color);
        }
    }
}