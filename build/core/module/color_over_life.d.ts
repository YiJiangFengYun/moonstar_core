import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterData from "../emitter_player";
import { Module } from "./module";
export interface ParticleSpecial extends particleMod.Particle {
    time?: number;
    life?: number;
}
export declare class ModColorOverLife extends Module {
    static NAME: string;
    beginColor: common.Color;
    endColor: common.Color;
    constructor(owner: emitterData.EmitterPlayer);
    init(info: any): void;
    update(): void;
    private _onCreateParticle;
}
