import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleWithVelocity extends particleMod.Particle {
    velocity?: common.Vector;
}

export class ModVelocityInitial extends Module {
    public static NAME = "velocity_initial";
    public velocity: common.Vector = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModVelocityInitial.NAME;
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