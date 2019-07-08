import * as common from "../common";
import * as particle from "../particle";
import { Module, IEmitter } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";

export interface ParticleWithVelocity extends particle.Particle {
    velocity?: common.Vector;
}

export class ModVelocityConstant extends Module {
    public static NAME = "velocity_constant";
    public velocity: common.Vector = common.Vector.create();

    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModVelocityConstant.NAME;
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let vel = this.velocity;
        vel[0] = info.x;
        vel[1] = info.y;
    }

    public update(dt: number) {
        super.update(dt);
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleWithVelocity = particles[i];
            let vel = particle.velocity;
            let pos = particle.pos;
            pos[0] = pos[0] + vel[0] * dt;
            pos[1] = pos[1] + vel[1] * dt;
        }
    }

    private _onCreateParticle(particle: ParticleWithVelocity) {
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, this.velocity);
        } else {
            particle.velocity = common.Vector.clone(this.velocity);
        }
         
    }
}