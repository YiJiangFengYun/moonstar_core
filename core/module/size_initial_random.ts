import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModSizeInitialRandom extends Module {
    public static NAME = "size_initial_random";
    public sizeMin: common.Vector = common.Vector.create();
    public sizeMax: common.Vector = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let sizeMin = this.sizeMin;
        let sizeMax = this.sizeMax;
        let sizeMinConfig = info.sizeMin || common.VECTOR_ZERO;
        let sizeMaxConfig = info.sizeMax || common.VECTOR_ZERO;
        sizeMin[0] = sizeMinConfig[0] || 0;
        sizeMin[1] = sizeMinConfig[1] || 0;
        sizeMax[0] = sizeMaxConfig[0] || 0;
        sizeMax[1] = sizeMaxConfig[1] || 0;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        let sizeMin = this.sizeMin;
        let sizeMax = this.sizeMax;
        let r = Math.random();
        let w = Math.max(0, sizeMin[0] + (sizeMax[0] - sizeMin[0]) * r);
        let h = Math.max(0, sizeMin[1] + (sizeMax[1] - sizeMin[0]) * r);
        if (particle.size) {
            common.Vector.set(particle.size, w, h);
        } else {
            particle.size = common.Vector.fromValues(w, h);
        }
    }
}