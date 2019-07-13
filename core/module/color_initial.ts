import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModColorInitial extends Module {
    public static NAME = "color_initial";
    public color: common.Color = common.Color.create();
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let color = this.color;
        let colorConfig = info.color || common.COLOR_WHITE;
        color[0] = colorConfig[0];
        color[1] = colorConfig[1];
        color[2] = colorConfig[2];
        color[3] = colorConfig[3];
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        if (particle.color) {
            common.Color.copy(particle.color, this.color);
        } else {
            particle.color = common.Color.clone(this.color);
        }
    }
}