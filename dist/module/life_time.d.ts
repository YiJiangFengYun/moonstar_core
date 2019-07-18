import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithLifeTime extends particleMod.Particle {
    /**
     * Elapsed time of the particle.
     */
    time?: number;
    /**
     * Total time of the life of the particle.
     */
    lifeTime: number;
    /**
     * Relative value of the life of the particle, value is [0 1]
     */
    life?: number;
}
export declare class ModLifeTime extends Module {
    static NAME: string;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
}
