import { ModRender, Module, IEmitter } from "./module";
import { VertexFormat } from "../common/vertex";

export class ModSprite extends Module implements ModRender {

    public constructor(owner: IEmitter) {
        super(owner);
    }

    public getTotalVtxCount(): number {
        return 0;
    }

    public getTotalIdxCount(): number {
        return 0;
    }

    public fillVtxBuffer(buffer: ArrayBuffer, offset: number, vtxFormat: VertexFormat, vtxSize: number): void {
    }

    public fillIdxBuffer(buffer: ArrayBuffer, offset: number, idxOffset: number, idxSize: number): void {
    }
}