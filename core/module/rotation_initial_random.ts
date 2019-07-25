import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleWithRotationVel extends particleMod.Particle {
    rotationVel?: number;
}

export class ModRotationInitialRandom extends Module {
    public static NAME = "rotation_initial_random";

    public valueMin: number = 0; //(radian)
    public valueMax: number = 0;

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.valueMin = info.valueMin || 0;
        this.valueMax = info.valueMax || 0;
    }

    private _onCreateParticle(particle: ParticleWithRotationVel) {
        particle.rotationVel = this.valueMin + (this.valueMax -  this.valueMin) * Math.random();
    }
}