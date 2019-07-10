import * as common from "../common";
import * as material from "../material";
import { Vector, Color } from "../common";
export const vertexInfo: common.VertexInfo = [
    {
        name: common.AttrName.POSITION, 
        format: common.ValueFormat.FLOAT32,
        count: 2,
        normalized: false,
    },
    {
        name: common.AttrName.UV0,
        format: common.ValueFormat.FLOAT32,
        count: 2,
        normalized: false,
    },
    {
        name: common.AttrName.COLOR,
        format: common.ValueFormat.UINT8,
        count: 4,
        normalized: true,
    }
];

export interface FillVertexInfo {
    pos: Vector;
    uv: Vector;
    color: Color;
}

export function fillVertex(data: FillVertexInfo, buffer: ArrayBuffer, byteOffset: number) {

    // Position
    let float32Array = new Float32Array(buffer, byteOffset);
    float32Array.set(data.pos);
    byteOffset += data.pos.byteLength;
    // UV0
    float32Array.set(data.uv, data.pos.length);
    byteOffset += data.uv.byteLength;

    // Color
    let uint8Array = new Uint8Array(buffer, byteOffset);
    uint8Array[0] = data.color[0] * 255;
    uint8Array[1] = data.color[1] * 255;
    uint8Array[2] = data.color[2] * 255;
    uint8Array[3] = data.color[3] * 255;
    byteOffset += 4;

    return byteOffset;
}

export interface DrawCmd {
    vertexBufferByteOffset: number;
    indexOffset: number;
    indexCount: number;
    material: material.Material;
    translationEmitter: common.Vector;
    rotationEmitter: number;
    scaleEmitter: common.Vector;
}

export const DrawCmd = {
    create: function(): DrawCmd {
        return {
            vertexBufferByteOffset: 0,
            indexOffset: 0,
            indexCount: 0,
            material: null,
            translationEmitter: common.Vector.create(),
            rotationEmitter: 0,
            scaleEmitter: common.Vector.fromValues(1, 1),
        };
    },

    copy: function(out: DrawCmd, cmd: DrawCmd) {
        if (! out) out = DrawCmd.create();
        out.vertexBufferByteOffset = cmd.vertexBufferByteOffset;
        out.indexOffset = cmd.indexOffset;
        out.indexCount = cmd.indexCount;
        out.material = cmd.material;
        common.Vector.copy(out.translationEmitter, cmd.translationEmitter);
        out.rotationEmitter = cmd.rotationEmitter;
        common.Vector.copy(out.scaleEmitter, cmd.scaleEmitter);
        return out;
    }
}

export class DrawData {
    public vertexInfo: common.VertexInfo;
    public vtxSize: number;
    public idxSize: number;
    public totalVtxCount: number;
    public totalIdxCount: number;
    //Now particle use one vertex buffer, one index buffer and one cmd list.
    public vtxBuffer: ArrayBuffer;
    public idxBuffer: ArrayBuffer;
    public idxBufferView: Uint16Array;
    public cmdList: DrawCmd[];
    public cmdCount: number;
    public constructor() {
        this.vertexInfo = vertexInfo;
        this.cmdList = [];

        let vtxSize = 0;
        let vInfo = this.vertexInfo;
        let vFSizes = common.valueFormatSizes;
        vInfo.forEach((value) => {
            vtxSize += vFSizes[value.format] * value.count;
        });
        this.vtxSize = vtxSize;
        this.idxSize = common.indexSize;
    }

    /**
     * Initialize and allocate the capacity of its buffers.
     * @param totalVtxCount 
     * @param totalIdxCount 
     */
    public init(info: {
        maxVtxCount: number;
        maxIdxCount: number;
    }) {
        let vtxSize = this.vtxSize;
        let idxSize = this.idxSize;
        let bufferSize = vtxSize * info.maxVtxCount;
        if (! this.vtxBuffer || this.vtxBuffer.byteLength < bufferSize) {
            this.vtxBuffer = new ArrayBuffer(bufferSize);
        }
        bufferSize = idxSize * info.maxIdxCount;
        if (! this.idxBuffer || this.idxBuffer.byteLength < bufferSize) {
            this.idxBuffer = new ArrayBuffer(bufferSize);
            this.idxBufferView = new Uint16Array(this.idxBuffer);
        }
        this.cmdCount = 0;
    }

    public updateData(info: {
        totalVtxCount: number;
        totalIdxCount: number;
    }) {
        this.totalVtxCount = info.totalVtxCount;
        this.totalIdxCount = info.totalIdxCount;
    }

    public clearCmds() {
        this.cmdCount = 0;
    }

    /**
     * Fill a vertex data to vertex buffer.
     * @param data 
     * @param byteOffset 
     */
    public fillVertex(data: FillVertexInfo, byteOffset: number) {
        return fillVertex(data, this.vtxBuffer, byteOffset);
    }

    /**
     * Fill a index value to index buffer.
     * @param index 
     * @param byteOffset 
     */
    public fillIndex(index: number, byteOffset: number) {
        this.idxBufferView[byteOffset / common.indexSize] = index;
        return byteOffset + common.indexSize;
    }

    public fillDrawCmd(drawCmd: DrawCmd) {
        let cmdList = this.cmdList;
        let cmdCount = this.cmdCount;
        let cmd = cmdList[cmdCount];
        if (! cmd) cmdList[cmdCount] = cmd = DrawCmd.create();
        DrawCmd.copy(cmd, drawCmd);
        ++this.cmdCount;
    }
}

