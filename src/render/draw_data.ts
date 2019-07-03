import { AttrName, ValueFormat, VertexInfo, valueFormatSizes, indexSize } from "../common/vertex";
import { Material } from "../material/material";
export const vertexInfo: VertexInfo = [
    {
        name: AttrName.POSITION, 
        format: ValueFormat.FLOAT32,
        count: 2,
        normalized: false,
    },
    {
        name: AttrName.UV0,
        format: ValueFormat.FLOAT32,
        count: 2,
        normalized: false,
    },
    {
        name: AttrName.COLOR,
        format: ValueFormat.UINT8,
        count: 4,
        normalized: true,
    }
];

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

export function fillVertex(data: FillVertexInfo, bufferView: DataView, byteOffset: number) {

    // Position
    bufferView.setFloat32(byteOffset, data.posX);
    byteOffset += 4;
    bufferView.setFloat32(byteOffset, data.posY);
    byteOffset += 4;

    // UV0
    bufferView.setFloat32(byteOffset, data.uv0X);
    byteOffset += 4;
    bufferView.setFloat32(byteOffset, data.uv0Y);
    byteOffset += 4;

    // Color
    bufferView.setUint8(byteOffset, (data.colorR || 0) * 255);
    byteOffset += 1;
    bufferView.setUint8(byteOffset, (data.colorG || 0) * 255);
    byteOffset += 1;
    bufferView.setUint8(byteOffset, (data.colorB || 0) * 255);
    byteOffset += 1;
    bufferView.setUint8(byteOffset, (data.colorA || 0) * 255);
    byteOffset += 1;

    return byteOffset;
}

export interface DrawCmd {
    elementCount: number;
    material: Material;
}

export class DrawData {
    public vertexInfo: VertexInfo;
    public vtxSize: number;
    public idxSize: number;
    public totalVtxCount: number;
    public totalIdxCount: number;
    //Now particle use one vertex buffer, one index buffer and one cmd list.
    public vtxBuffer: ArrayBuffer;
    public vtxBufferView: DataView;
    public idxBuffer: ArrayBuffer;
    public idxBufferView: DataView;
    public cmdList: DrawCmd[];
    public cmdListCount: number;
    public constructor() {
        this.vertexInfo = vertexInfo;
        this.cmdList = [];

        let vtxSize = 0;
        let vInfo = this.vertexInfo;
        let vFSizes = valueFormatSizes;
        vInfo.forEach((value) => {
            vtxSize += vFSizes[value.format] * value.count;
        });
        this.vtxSize = vtxSize;
        this.idxSize = indexSize;
    }

    /**
     * Initialize its state and allocate the capacity of its buffers.
     * @param totalVtxCount 
     * @param totalIdxCount 
     */
    public init(totalVtxCount: number, totalIdxCount: number) {
        this.totalVtxCount = totalVtxCount;
        this.totalIdxCount = totalIdxCount;
        let vtxSize = this.vtxSize;
        let idxSize = this.idxSize;
        this.vtxBuffer = new ArrayBuffer(vtxSize * totalVtxCount);
        this.vtxBufferView = new DataView(this.vtxBuffer);
        this.idxBuffer = new ArrayBuffer(idxSize * totalIdxCount);
        this.idxBufferView = new DataView(this.idxBuffer);
        this.cmdListCount = 0;
    }

    /**
     * Fill a vertex data to vertex buffer.
     * @param data 
     * @param byteOffset 
     */
    public fillVertex(data: FillVertexInfo, byteOffset: number) {
        return fillVertex(data, this.vtxBufferView, byteOffset);
    }

    /**
     * Fill a index value to index buffer.
     * @param index 
     * @param byteOffset 
     */
    public fillIndex(index: number, byteOffset: number) {
        this.idxBufferView.setUint32(byteOffset, index);
        return byteOffset + 4;
    }
}

