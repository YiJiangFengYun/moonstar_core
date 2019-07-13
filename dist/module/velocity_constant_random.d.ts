import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithVelocity extends particleMod.Particle {
    velocity?: common.Vector;
}
export declare class ModVelocityConstantRandom extends Module {
    static NAME: string;
    velocityMin: common.Vector;
    velocityMax: common.Vector;
    private _vecHelper;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
    private _onCreateParticle;
}
