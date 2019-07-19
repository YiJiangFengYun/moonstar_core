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
    RIBBON,
    SPRITE_CONNECTED,
}

//class Material with members: color, texture path, and blend.
export class Material {
    public type: MaterialType | number;
    public color: common.Color = common.Color.create();
    public texturePath: string;
    public srcBlendFactor = BlendFactor.SRC_ALPHA;
    public dstBlendFactor = BlendFactor.ONE_MINUS_SRC_ALPHA;
    public blendOp = BlendOp.ADD;

    private _id: number;
    public constructor(type?: MaterialType | number) {
        this.type = type;
        this._id = common.gainID();
        this.color.set(common.COLOR_WHITE);
    }

    public get id() {
        return this._id;
    }

    public init(info: any) {
        this.color[0] = info.r || 1;
        this.color[1] = info.g || 1;
        this.color[2] = info.b || 1;
        this.color[3] = info.a || 1;
        this.texturePath = info.texturePath;
        this.srcBlendFactor = info.srcBlendFactor || BlendFactor.SRC_ALPHA;
        this.dstBlendFactor = info.dstBlendFactor || BlendFactor.ONE;
        this.blendOp = info.blendOp || BlendOp.ADD;
    }
}