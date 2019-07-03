import * as render from "../render";
import { ModRender, Module, IEmitter } from "./module";
export declare class ModSprite extends Module implements ModRender {
    static NAME: string;
    constructor(owner: IEmitter);
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number;
    }): void;
}
