import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleWithVelocity extends particleMod.Particle {
    velocity?: common.Vector;
}
export declare class ModVelocityConstant extends Module {
    static NAME: string;
    velocity: common.Vector;
    private _vecHelper;
    constructor(owner: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
    private _onCreateParticle;
}
