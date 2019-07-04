import * as common from "../common";
import * as particle from "../particle";
import { Module, IEmitter } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";

export interface ParticleWithVelocity extends particle.Particle {
    velocity?: common.Vector;
}

export class ModInitialVelocity extends Module {
    public static NAME = "initial_velocity";
    public velocity: common.Vector = {};

    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModInitialVelocity.NAME;
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let vel = this.velocity;
        vel.x = info.x;
        vel.y = info.y;
    }

    private _onCreateParticle(particle: ParticleWithVelocity) {
        if (particle.velocity) {
            common.copyVector(this.velocity, particle.velocity);
        } else {
            particle.velocity = common.cloneVector(this.velocity);
        }
         
    }
}