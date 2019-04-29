import { Module, IEmitter } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";
import { Particle } from "../particle/particle";
import { Vector, copyVector, cloneVector } from "../common/vector";

export interface ParticleWithVelocity extends Particle {
    velocity?: Vector;
}

export class ModInitialVelocity extends Module {

    public velocity: Vector;

    public constructor(owner: IEmitter) {
        super(owner);
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init() {
    }

    private _onCreateParticle(particle: ParticleWithVelocity) {
        if (particle.velocity) {
            copyVector(this.velocity, particle.velocity);
        } else {
            particle.velocity = cloneVector(this.velocity);
        }
         
    }
}