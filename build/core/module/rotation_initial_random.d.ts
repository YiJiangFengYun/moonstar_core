import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithRotationVel extends particleMod.Particle {
    rotationVel?: number;
}
export declare class ModRotationInitialRandom extends Module {
    static NAME: string;
    valueMin: number;
    valueMax: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
