import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModSizeInitialRandom extends Module {
    public static NAME = "size_initial_random";
    public size: common.Vector = common.Vector.create();
    public scaleMinMax: common.Vector = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSizeInitialRandom.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let size = this.size;
        let scaleMinMax = this.scaleMinMax;
        size[0] = info.width || 0;
        size[1] = info.height || 0;
        scaleMinMax[0] = info.scaleMin || 1;
        scaleMinMax[1] = info.scaleMax || 1;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        let scaleMinMax = this.scaleMinMax;
        let scale = scaleMinMax[0] + Math.random() * (scaleMinMax[1] - scaleMinMax[0]);
        if (particle.size) {
            common.Vector.scale(particle.size, this.size, scale);
        } else {
            particle.size = common.Vector.clone(this.size);
            common.Vector.scale(particle.size, particle.size, scale);
        }
    }
}