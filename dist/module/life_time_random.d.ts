import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithLifeTime extends particleMod.Particle {
    time?: number;
    life?: number;
}
export declare class ModLifeTimeRandom extends Module {
    static NAME: string;
    lifeMin: number;
    lifeMax: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
    private _deleteParticle;
    private _onCreateParticle;
}
