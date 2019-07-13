import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleWithRotationVel extends particleMod.Particle {
    rotationVel?: number;
}

export class ModRotationInitial extends Module {
    public static NAME = "rotation_initial";

    public value: number = 0; //(radian)

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModRotationInitial.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.value = info.value || 0;
    }

    private _onCreateParticle(particle: ParticleWithRotationVel) {
        particle.rotationVel = this.value;
    }
}