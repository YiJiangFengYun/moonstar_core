import * as common from "../common";
import * as material from "../material";
import * as render from "../render";
import * as emitterPlayer from "../emitter_player";
import { ModRender, Module } from "./module";
export declare class ModSpriteConnected extends Module implements ModRender {
    static NAME: string;
    material: material.Material;
    head: common.Vector;
    tail: common.Vector;
    ribbon: boolean;
    private _posHelper;
    private _uvHelper;
    private _cmdHelper;
    private _sizeHelper;
    private _scaleHelper;
    private _colorHelper;
    private _vectorHelper;
    private _vectorHelper2;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    getMaxVtxCount(): number;
    getMaxIdxCount(): number;
    fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number;
        lastIndexCount: number;
    }, batchInfo?: {
        lastBatchVertexCount: number;
        lastDrawCmd: render.DrawCmd;
    }): render.DrawCmd;
}
