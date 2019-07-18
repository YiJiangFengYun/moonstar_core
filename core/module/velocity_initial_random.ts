import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
import { ParticleWithVelocity } from "./velocity";

export class ModVelocityInitialRandom extends Module {
    public static NAME = "velocity_initial_random";
    public velocityMin: common.Vector = common.Vector.create();
    public velocityMax: common.Vector = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModVelocityInitialRandom.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let velMin = this.velocityMin;
        let velMinConfig = info.velocityMin || common.VECTOR_ZERO;
        let velMax = this.velocityMax;
        let velMaxConfig = info.velocityMax || common.VECTOR_ZERO;
        velMin[0] = velMinConfig[0] || 0;
        velMin[1] = velMinConfig[1] || 0;
        velMax[0] = velMaxConfig[0] || 0;
        velMax[1] = velMaxConfig[1] || 0;
    }

    private _onCreateParticle(particle: ParticleWithVelocity) {
        let velMin = this.velocityMin;
        let velMax = this.velocityMax;
        let r = Math.random();
        let x = Math.max(0, velMin[0] + (velMax[0] - velMin[0]) * r);
        let y = Math.max(0, velMin[1] + (velMax[1] - velMin[1]) * r);
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, [x, y]);
        } else {
            particle.velocity = common.Vector.clone([x, y]);
        }
    }
}