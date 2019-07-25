import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
import { ParticleWithVelocity } from "./velocity";

export class ModVelocityInitial extends Module {
    public static NAME = "velocity_initial";
    public velocity: common.Vector = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let vel = this.velocity;
        let velConfig = info.velocity || common.VECTOR_ZERO;
        vel[0] = velConfig[0];
        vel[1] = velConfig[1];
    }

    private _onCreateParticle(particle: ParticleWithVelocity) {
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, this.velocity);
        } else {
            particle.velocity = common.Vector.clone(this.velocity);
        }
    }
}