import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithRotationVel extends particleMod.Particle {
    rotationVel?: number;
}
export declare class ModRotationInitial extends Module {
    static NAME: string;
    value: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
