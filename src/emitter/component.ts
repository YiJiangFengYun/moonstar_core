import { Emitter } from "./emitter";
import { VertexFormat } from "../common/vertex";

export class EComponent {
    public owner: Emitter;
    public constructor(owner: Emitter) {
        this.owner = owner;
    }

    public update(dt: number):void {

    }
}

export class ERenderComponent extends EComponent {

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