import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModLifeTimeInitialRandom extends Module {
    static NAME: string;
    lifeMin: number;
    lifeMax: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
