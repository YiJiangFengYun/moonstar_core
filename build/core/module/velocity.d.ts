import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithVelocity extends particleMod.Particle {
    velocity?: common.Vector;
}
export declare class ModVelocity extends Module {
    static NAME: string;
    private _vecHelper;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
}
