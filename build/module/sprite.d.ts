import { ModRender, Module, IEmitter } from "./module";
import { VertexFormat } from "../common/vertex";
export declare class ModSprite extends Module implements ModRender {
    static NAME: string;
    constructor(owner: IEmitter);
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    fillBuffers(data: {
        vtxBuffer: ArrayBuffer;
        vtxBufferByteOffset: number;
        vtxFormat: VertexFormat;
        vtxSize: number;
        idxBuffer: ArrayBuffer;
        idxBufferByteOffset: number;
        idxValueOffset: number;
        idxSize: number;
    }): void;
}
