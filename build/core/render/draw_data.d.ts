import * as common from "../common";
import * as material from "../material";
export declare const vertexInfo: common.VertexInfo;
export interface FillVertexInfo {
    posX: number;
    posY: number;
    uv0X: number;
    uv0Y: number;
    colorR: number;
    colorG: number;
    colorB: number;
    colorA: number;
}
export declare function fillVertex(data: FillVertexInfo, bufferView: DataView, byteOffset: number): number;
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
    vtxBufferView: DataView;
    idxBuffer: ArrayBuffer;
    idxBufferView: DataView;
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
