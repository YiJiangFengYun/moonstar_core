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
    ONE_MINUS_DST_ALPHA = 9,
    CONSTANT_COLOR = 10,
    ONE_MINUS_CONSTANT_COLOR = 11,
    CONSTANT_ALPHA = 12,
    ONE_MINUS_CONSTANT_ALPHA = 13,
    SRC_ALPHA_SATURATE = 14
}
export declare enum BlendOp {
    ADD = 0
}
export declare class Material {
    static equal(a1: Material, a2: Material): boolean;
    static sort(a1: Material, a2: Material): number;
    color: common.Color;
    texturePath: string;
    blend: boolean;
    blendSrcRGB: BlendFactor;
    blendDstRGB: BlendFactor;
    blendSrcAlpha: BlendFactor;
    blendDstAlpha: BlendFactor;
    blendOpRGB: BlendOp;
    blendOpAlpha: BlendOp;
    private _id;
    constructor();
    get id(): number;
    init(info: any): void;
}
