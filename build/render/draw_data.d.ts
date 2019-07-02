import { VertexFormat } from "../common/vertex";
import { Material } from "../material/material";
export declare const SPACE_VERTEX_FORMATS: {
    [spaceID: string]: VertexFormat;
};
export interface DrawCmd {
    elementCount: number;
    material: Material;
}
export declare class DrawData {
    vertexFormat: VertexFormat;
    vtxSize: number;
    idxSize: number;
    totalVtxCount: number;
    totalIdxCount: number;
    vtxBuffer: ArrayBuffer;
    idxBuffer: ArrayBuffer;
    cmdList: DrawCmd[];
    cmdListCount: number;
    constructor();
    init(totalVtxCount: number, totalIdxCount: number): void;
}
