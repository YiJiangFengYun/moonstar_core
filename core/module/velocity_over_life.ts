import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
import { ParticleWithVelocity } from "./velocity";
import { ParticleWithLifeTime } from "./life_time";

export class ModVelocityOverLife extends Module {
    public static NAME = "velocity_over_life";

    public velocityBegin: common.Vector = common.Vector.create();
    public velocityEnd: common.Vector = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModVelocityOverLife.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let velBegin = this.velocityBegin;
        let velEnd = this.velocityEnd;
        let velBeginConfig = info.velocityBegin || common.VECTOR_ZERO;
        let velEndConfig = info.velocityEnd || common.VECTOR_ZERO;
        velBegin[0] = velBeginConfig[0] || 0;
        velBegin[1] = velBeginConfig[1] || 0;
        velEnd[0] = velEndConfig[0] || 0;
        velEnd[1] = velEndConfig[1] || 0;
    }

    public update() {
        let player = this.player;
        let particles = player.particles;
        let particleCount = player.particleCount;
        let velocityBegin = this.velocityBegin;
        let velocityEnd = this.velocityEnd;
        for (let i = 0; i < particleCount; ++i) {
            let particle: ParticleWithVelocity & ParticleWithLifeTime = particles[i] as ParticleWithVelocity & ParticleWithLifeTime;
            let velocity = particle.velocity;
            let life = particle.life;
            velocity[0] = velocityBegin[0] + (velocityEnd[0] - velocityBegin[0]) * life;
            velocity[1] = velocityBegin[1] + (velocityEnd[1] - velocityBegin[1]) * life;
        }
    }

    private _onCreateParticle(particle: ParticleWithVelocity) {
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, this.velocityBegin);
        } else {
            particle.velocity = common.Vector.clone(this.velocityBegin);
        }
    }
}