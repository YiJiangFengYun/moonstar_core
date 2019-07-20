import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModLocationInitialLineSegment extends Module {
    static NAME: string;
    source: common.Vector;
    target: common.Vector;
    bias: number;
    private _vector;
    private _vecPerpendicular;
    private _vecHelper;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
