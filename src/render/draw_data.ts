import { AttrName, AttrFormat, VertexFormat, ATTR_FORMAT_SIZES, INDEX_SIZE } from "../common/vertex";
import { Material } from "../material/material";

export const SPACE_VERTEX_FORMATS: {[spaceID: string]: VertexFormat} = {
    1: [{
        name: AttrName.POSITION, 
        format: AttrFormat.FLOAT32,
        count: 2,
        normalized: false,
    }, {
        name: AttrName.COLOR,
        format: AttrFormat.UINT8,
        count: 4,
        normalized: true,
    }, {
        name: AttrName.UV0,
        format: AttrFormat.FLOAT32,
        count: 2,
        normalized: false,
    }],
    2: [{
        name: AttrName.POSITION, 
        format: AttrFormat.FLOAT32,
        count: 3,
        normalized: false,
    }, {
        name: AttrName.COLOR,
        format: AttrFormat.UINT8,
        count: 4,
        normalized: true,
    }, {
        name: AttrName.UV0,
        format: AttrFormat.FLOAT32,
        count: 2,
        normalized: false,
    }]
}

export interface DrawCmd {
    elementCount: number;
    material: Material;
}

export class DrawData {
    public vertexFormat: VertexFormat;
    public vtxSize: number;
    public idxSize: number;
    public totalVtxCount: number;
    public totalIdxCount: number;
    //Now particle use one vertex buffer, one index buffer and one cmd list.
    public vtxBuffer: ArrayBuffer;
    public idxBuffer: ArrayBuffer;
    public cmdList: DrawCmd[];
    public cmdListCount: number;
    public constructor() {
        this.vertexFormat = SPACE_VERTEX_FORMATS[0];
        this.cmdList = [];

        let vtxBufferSize = 0;
        let vertexFormat = this.vertexFormat;
        let attrFormatSizes = ATTR_FORMAT_SIZES;
        vertexFormat.forEach(item => {
            vtxBufferSize += attrFormatSizes[item.format] * item.count;
        });
        this.vtxSize = vtxBufferSize;
        this.idxSize = INDEX_SIZE;
    }

    public init(totalVtxCount: number, totalIdxCount: number) {
        this.totalVtxCount = totalVtxCount;
        this.totalIdxCount = totalIdxCount;
        let vtxSize = this.vtxSize;
        let idxSize = this.idxSize;
        this.vtxBuffer = new ArrayBuffer(vtxSize * totalVtxCount);
        this.idxBuffer = new ArrayBuffer(idxSize * totalIdxCount);
        this.cmdListCount = 0;
    }
}

