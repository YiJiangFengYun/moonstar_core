import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModSizeInitial extends Module {
    public static NAME = "size_initial";
    public size: common.Vector = common.Vector.create();

    public constructor(owner: emitterPlayer.EmitterPlayer) {
        super(owner);
        this.name = ModSizeInitial.NAME;
        owner.on(particleMod.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let size = this.size;
        size[0] = info.width || 0;
        size[1] = info.height || 0;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        if (particle.size) {
            common.Vector.copy(particle.size, this.size);
        } else {
            particle.size = common.Vector.clone(this.size);
        }
    }
}