import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSizeInitialRandom extends Module {
    static NAME: string;
    sizeMin: common.Vector;
    sizeMax: common.Vector;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
