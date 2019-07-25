import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
import { ParticleWithVelocity } from "./velocity";

export class ModVelocityInitialVary extends Module {
    public static NAME = "velocity_initial_vary";

    public velocityBegin: common.Vector = common.Vector.create();
    public velocityEnd: common.Vector = common.Vector.create();
    public period: number = Number.MAX_VALUE;
    /**
     * Use trigonometric to smooth.
     */
    public trigSmooth: boolean;

    private _velocityHelper = common.Vector.create();
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
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
        this.period = info.period || Number.MAX_VALUE;
        this.trigSmooth = info.trigSmooth || false;
    }

    private _onCreateParticle(particle: ParticleWithVelocity) {
        let player = this.player;
        let time = player.time;
        let period = this.period;
        let prog = (time % period) / period;
        let velocityBegin = this.velocityBegin;
        let velocityEnd = this.velocityEnd;
        let velocity = this._velocityHelper;

        if (this.trigSmooth) {
            prog = Math.sin(prog * 2 * Math.PI);
            prog = (prog + 1) / 2;
        } else {
            if (prog < 0.5) {
                prog = prog * 2;
            } else {
                prog = 2 - prog * 2;
            }
        }
        velocity[0] = velocityBegin[0] + (velocityEnd[0] - velocityBegin[0]) * prog;
        velocity[1] = velocityBegin[1] + (velocityEnd[1] - velocityBegin[1]) * prog;
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, velocity);
        } else {
            particle.velocity = common.Vector.clone(velocity);
        }
    }
}