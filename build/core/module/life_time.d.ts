import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithLifeTime extends particleMod.Particle {
    time?: number;
    life?: number;
}
export declare class ModLifeTime extends Module {
    static NAME: string;
    life: number;
    constructor(owner: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
    private _deleteParticle;
    private _onCreateParticle;
}
