import { VertexFormat } from "../common/vertex";
import { SpaceID } from "../common/space_type";
import { Material } from "../material/material";
export declare const SPACE_VERTEX_FORMATS: {
    [spaceID: string]: VertexFormat;
};
export interface DrawCmd {
    elementCount: number;
    material: Material;
}
export declare class DrawData {
    space: SpaceID;
    vertexFormat: VertexFormat;
    totalVtxCount: number;
    totalIdxCount: number;
    vtxBuffer: ArrayBuffer;
    idxBuffer: ArrayBuffer;
    cmdList: DrawCmd[];
    constructor(space: SpaceID);
}
