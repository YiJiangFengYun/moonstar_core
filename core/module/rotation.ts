import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleWithRotationVel extends particleMod.Particle {
    rotationVel?: number;
}

export class ModRotation extends Module {
    public static NAME = "rotation";

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
            let particle: ParticleWithRotationVel = particles[i];
            let vel = particle.rotationVel || 0;
            let rotation = particle.rotation || 0;
            particle.rotation = rotation + vel * dt;
        }
    }
}