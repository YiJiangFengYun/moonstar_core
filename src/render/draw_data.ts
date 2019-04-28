import { AttrName, AttrFormat, VertexFormat } from "../common/vertex";
import { SpaceID } from "../common/space_type";
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
    public space: SpaceID;
    public vertexFormat: VertexFormat;
    public totalVtxCount: number;
    public totalIdxCount: number;
    //Now particle use one vertex buffer, one index buffer and one cmd list.
    public vtxBuffer: ArrayBuffer;
    public idxBuffer: ArrayBuffer;
    public cmdList: DrawCmd[];
    public constructor(space: SpaceID) {
        this.space = space;
        this.vertexFormat = SPACE_VERTEX_FORMATS[space];
    }
}

