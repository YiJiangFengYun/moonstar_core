export declare enum AttrName {
    POSITION = "pos",
    UV0 = "uv0",
    COLOR = "color"
}
export declare enum AttrFormat {
    UNDEFINED = 0,
    FLOAT32 = 1,
    UINT32 = 2,
    UINT8 = 3
}
export declare type VertexFormat = {
    name: AttrName;
    format: AttrFormat;
    count: number;
    normalized: boolean;
}[];
