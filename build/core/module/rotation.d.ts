import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithRotationVel extends particleMod.Particle {
    rotationVel?: number;
}
export declare class ModRotation extends Module {
    static NAME: string;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
}
