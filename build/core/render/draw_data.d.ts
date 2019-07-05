import * as common from "../common";
import * as material from "../material";
import { Vector, Color } from "../common";
export declare const vertexInfo: common.VertexInfo;
export interface FillVertexInfo {
    pos: Vector;
    uv: Vector;
    color: Color;
}
export declare function fillVertex(data: FillVertexInfo, buffer: ArrayBuffer, byteOffset: number): number;
export interface DrawCmd {
    indexOffset: number;
    indexCount: number;
    material: material.Material;
}
export declare class DrawData {
    vertexInfo: common.VertexInfo;
    vtxSize: number;
    idxSize: number;
    totalVtxCount: number;
    totalIdxCount: number;
    vtxBuffer: ArrayBuffer;
    idxBuffer: ArrayBuffer;
    idxBufferView: Uint32Array;
    cmdList: DrawCmd[];
    cmdCount: number;
    constructor();
    /**
     * Initialize its state and allocate the capacity of its buffers.
     * @param totalVtxCount
     * @param totalIdxCount
     */
    init(info: {
        totalVtxCount: number;
        totalIdxCount: number;
        maxVtxCount: number;
        maxIdxCount: number;
    }): void;
    /**
     * Fill a vertex data to vertex buffer.
     * @param data
     * @param byteOffset
     */
    fillVertex(data: FillVertexInfo, byteOffset: number): number;
    /**
     * Fill a index value to index buffer.
     * @param index
     * @param byteOffset
     */
    fillIndex(index: number, byteOffset: number): number;
    fillDrawCmd(drawCmd: DrawCmd): void;
}
