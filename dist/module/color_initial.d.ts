import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModColorInitial extends Module {
    static NAME: string;
    color: common.Color;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
