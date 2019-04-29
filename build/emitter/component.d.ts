import { Emitter } from "./emitter";
import { VertexFormat } from "../common/vertex";
export declare class EComponent {
    owner: Emitter;
    constructor(owner: Emitter);
    update(dt: number): void;
}
export declare class ERenderComponent extends EComponent {
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    fillVtxBuffer(buffer: ArrayBuffer, offset: number, vtxFormat: VertexFormat, vtxSize: number): void;
    fillIdxBuffer(buffer: ArrayBuffer, offset: number, idxOffset: number, idxSize: number): void;
}
