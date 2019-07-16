import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModLifeTimeInitial extends Module {
    static NAME: string;
    life: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
