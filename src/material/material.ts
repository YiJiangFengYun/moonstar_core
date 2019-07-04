import * as common from "../common";

export enum BlendFactor
{
    ZERO,
    ONE,
    SRC_COLOR,
    ONE_MINUS_SRC_COLOR,
    DST_COLOR,
    ONE_MINUS_DST_COLOR,
    SRC_ALPHA,
    ONE_MINUS_SRC_ALPHA,
    DST_ALPHA,
    ONE_MINUS_DST_ALPHA,
};

export enum BlendOp
{
    ADD,
};

export enum MaterialType {
    UNDEFINED,
    SPRITE,
}

//class Material with members: color, texture path, and blend.
export class Material {
    public type: MaterialType | number;
    public color: common.Color = { ...common.WHITE };
    public texturePath: string;
    public srcColorBlendFactor = BlendFactor.SRC_ALPHA;
    public dstColorBlendFactor = BlendFactor.ONE_MINUS_SRC_ALPHA;
    public colorBlendOp = BlendOp.ADD;
    public srcAlphaBlendFactor = BlendFactor.SRC_ALPHA;
    public dstAlphaBlendFactor = BlendFactor.DST_ALPHA;
    public alphaBlendOp = BlendOp.ADD;

    public constructor(type?: MaterialType | number) {
        this.type = type;
    }
}