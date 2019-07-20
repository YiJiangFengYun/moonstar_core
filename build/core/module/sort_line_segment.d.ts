import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSortLineSegment extends Module {
    static NAME: string;
    source: common.Vector;
    target: common.Vector;
    private _vector;
    private _changed;
    private _vecHelper1;
    private _vecHelper2;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
    private _onChangeParticle;
}
