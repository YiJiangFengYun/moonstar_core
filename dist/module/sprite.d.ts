import * as material from "../material";
import * as render from "../render";
import * as emitterPlayer from "../emitter_player";
import { ModRender, Module } from "./module";
export declare class ModSprite extends Module implements ModRender {
    static NAME: string;
    material: material.Material;
    useSubUV: boolean;
    private _posHelper;
    private _uvHelper;
    private _cmdHelper;
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
    }): void;
}
