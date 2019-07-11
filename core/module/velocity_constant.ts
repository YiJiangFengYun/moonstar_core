import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleWithVelocity extends particleMod.Particle {
    velocity?: common.Vector;
}

export class ModVelocityConstant extends Module {
    public static NAME = "velocity_constant";
    public velocity: common.Vector = common.Vector.create();

    private _vecHelper: common.Vector = common.Vector.create();
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModVelocityConstant.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let vel = this.velocity;
        vel[0] = info.x;
        vel[1] = info.y;
    }

    public update(dt: number) {
        super.update(dt);
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleWithVelocity = particles[i];
            let vel = particle.velocity;
            let orientation = particle.orientation || 0;
            let vecHelper = this._vecHelper;
            common.Vector.rotate(vecHelper, vel, common.VECTOR_ZERO, orientation);
            let pos = particle.pos;
            pos[0] = pos[0] + vecHelper[0] * dt;
            pos[1] = pos[1] + vecHelper[1] * dt;
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