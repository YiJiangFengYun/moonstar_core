import * as common from "../common";
export declare enum BlendFactor {
    ZERO = 0,
    ONE = 1,
    SRC_COLOR = 2,
    ONE_MINUS_SRC_COLOR = 3,
    DST_COLOR = 4,
    ONE_MINUS_DST_COLOR = 5,
    SRC_ALPHA = 6,
    ONE_MINUS_SRC_ALPHA = 7,
    DST_ALPHA = 8,
    ONE_MINUS_DST_ALPHA = 9
}
export declare enum BlendOp {
    ADD = 0
}
export declare enum MaterialType {
    UNDEFINED = 0,
    SPRITE = 1,
    RIBBON = 2,
    SPRITE_CONNECTED = 3
}
export declare class Material {
    type: MaterialType | number;
    color: common.Color;
    texturePath: string;
    srcBlendFactor: BlendFactor;
    dstBlendFactor: BlendFactor;
    blendOp: BlendOp;
    private _id;
    constructor(type?: MaterialType | number);
    readonly id: number;
    init(info: any): void;
}
