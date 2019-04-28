export enum AttrName {
    POSITION = "pos",
    UV0 = "uv0",
    COLOR = "color",
}

export enum AttrFormat {
    UNDEFINED,
    FLOAT32,
    UINT32,
    UINT8,
}

export type VertexFormat = {
    name: AttrName,
    format: AttrFormat,
    count: number,
    normalized: boolean,
}[];

