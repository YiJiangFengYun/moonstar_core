export enum AttrName {
    POSITION = "pos",
    UV0 = "uv0",
    COLOR = "color",
}

export enum ValueFormat {
    UNDEFINED,
    FLOAT32,
    UINT32,
    UINT8,
}

export interface AttrInfo {
    name: AttrName,
    format: ValueFormat,
    count: number,
    normalized: boolean,
}

export type VertexInfo = AttrInfo[];

export const valueFormatSizes = [
    0,
    4,
    4,
    1,
];

export const indexSize = 2;

