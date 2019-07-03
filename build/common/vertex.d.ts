export declare enum AttrName {
    POSITION = "pos",
    UV0 = "uv0",
    COLOR = "color"
}
export declare enum ValueFormat {
    UNDEFINED = 0,
    FLOAT32 = 1,
    UINT32 = 2,
    UINT8 = 3
}
export interface AttrInfo {
    name: AttrName;
    format: ValueFormat;
    count: number;
    normalized: boolean;
}
export declare type VertexInfo = AttrInfo[];
export declare const valueFormatSizes: number[];
export declare const indexSize = 4;
