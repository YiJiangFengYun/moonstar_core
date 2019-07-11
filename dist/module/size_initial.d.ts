import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSizeInitial extends Module {
    static NAME: string;
    size: common.Vector;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
