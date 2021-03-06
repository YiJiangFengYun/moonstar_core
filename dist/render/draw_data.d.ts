import * as common from "../common";
export declare const vertexInfo: common.VertexInfo;
export interface FillVertexInfo {
    pos: common.Vector;
    uv: common.Vector;
    color: common.Color;
}
export declare function fillVertex(data: FillVertexInfo, buffer: ArrayBuffer, byteOffset: number): number;
export interface DrawCmd {
    vertexBufferByteOffset: number;
    indexOffset: number;
    indexCount: number;
    material: number;
    bounds: common.Bounds;
    matrixModel: common.Matrix4x4;
}
export declare const DrawCmd: {
    create: () => DrawCmd;
    copy: (out: DrawCmd, cmd: DrawCmd) => DrawCmd;
};
export declare class DrawData {
    vertexInfo: common.VertexInfo;
    vtxSize: number;
    idxSize: number;
    totalVtxCount: number;
    totalIdxCount: number;
    vtxBuffer: ArrayBuffer;
    idxBuffer: ArrayBuffer;
    idxBufferView: Uint16Array;
    cmdList: DrawCmd[];
    cmdCount: number;
    constructor();
    /**
     * Initialize and allocate the capacity of its buffers.
     * @param totalVtxCount
     * @param totalIdxCount
     */
    init(info: {
        maxVtxCount: number;
        maxIdxCount: number;
    }): void;
    updateData(info: {
        totalVtxCount: number;
        totalIdxCount: number;
    }): void;
    clearCmds(): void;
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
