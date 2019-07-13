import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export interface ParticleSpecial extends particleMod.Particle {
    time?: number;
    life?: number;
}
export declare class ModSizeOverLife extends Module {
    static NAME: string;
    sizeBegin: common.Vector;
    sizeEnd: common.Vector;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(): void;
    private _onCreateParticle;
}
