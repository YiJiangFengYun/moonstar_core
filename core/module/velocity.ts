import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleWithVelocity extends particleMod.Particle {
    velocity?: common.Vector;
}

export class ModVelocity extends Module {
    public static NAME = "velocity";

    private _vecHelper: common.Vector = common.Vector.create();
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
    }

    public init(info: any) {
        super.init(info);
    }

    public update(dt: number) {
        super.update(dt);
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleWithVelocity = particles[i];
            let vel = particle.velocity || common.VECTOR_ZERO;
            let orientation = particle.orientation || 0;
            let vecHelper = this._vecHelper;
            common.Vector.rotate(vecHelper, vel, common.VECTOR_ZERO, orientation);
            let pos = particle.pos;
            pos[0] = pos[0] + vecHelper[0] * dt;
            pos[1] = pos[1] + vecHelper[1] * dt;
        }
    }
}