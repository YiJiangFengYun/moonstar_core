import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModWidthInitial extends Module {
    public static NAME = "width_initial";
    public width: number = 0;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModWidthInitial.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.width = info.width || 0;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        if (particle.size) {
            common.Vector.copy(particle.size, [this.width, 0]);
        } else {
            particle.size = common.Vector.clone([this.width, 0]);
        }
    }
}