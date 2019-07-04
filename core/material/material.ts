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
    public srcBlendFactor = BlendFactor.SRC_ALPHA;
    public dstBlendFactor = BlendFactor.ONE_MINUS_SRC_ALPHA;
    public blendOp = BlendOp.ADD;

    private _id: number;
    public constructor(type?: MaterialType | number) {
        this.type = type;
        this._id = common.gainID();
    }

    public get id() {
        return this._id;
    }

    public init(info: any) {
        this.color.r = info.r || 1;
        this.color.g = info.g || 1;
        this.color.b = info.b || 1;
        this.texturePath = info.texturePath;
        this.srcBlendFactor = info.srcBlendFactor || BlendFactor.SRC_ALPHA;
        this.dstBlendFactor = info.dstBlendFactor || BlendFactor.ONE_MINUS_SRC_ALPHA;
        this.blendOp = info.blendOp || BlendOp.ADD;
    }
}