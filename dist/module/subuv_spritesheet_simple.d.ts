import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSubUVSpriteSheetSimple extends Module {
    static NAME: string;
    /**
     * UV Size of one frame.
     */
    frameUVSize: common.Vector;
    /**
     * Frame interval for play animation.
     */
    frameInterval: number;
    /**
     * Play times.
     */
    times: number;
    private _colSize;
    private _rowSize;
    private _totalFrames;
    constructor(owner: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
    private _onCreateParticle;
    private _updateParticleSubUV;
}
