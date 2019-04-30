import { ModRender, Module, IEmitter } from "./module";
import { VertexFormat } from "../common/vertex";
export declare class ModSprite extends Module implements ModRender {
    static NAME: string;
    constructor(owner: IEmitter);
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    fillVtxBuffer(buffer: ArrayBuffer, offset: number, vtxFormat: VertexFormat, vtxSize: number): void;
    fillIdxBuffer(buffer: ArrayBuffer, offset: number, idxOffset: number, idxSize: number): void;
}
