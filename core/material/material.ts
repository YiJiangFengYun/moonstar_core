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

    public static equal(a1: Material, a2: Material) {
        if (a1.type !== a2.type) return false;
        if (common.Color.equals(a1.color, a2.color) === false) return false;
        if (a1.texturePath !== a2.texturePath) return false;
        if (a1.srcBlendFactor !== a2.srcBlendFactor) return false;
        if (a1.dstBlendFactor !== a2.dstBlendFactor) return false;
        if (a1.blendOp !== a2.blendOp) return false;
        return true;
    }

    public static sort(a1: Material, a2: Material) {
        if (a1.type !== a2.type) return a1.type - a2.type;
        let sqrLen1 = common.Color.sqrLen(a1.color);
        let sqrLen2 = common.Color.sqrLen(a2.color);
        if (sqrLen1 !== sqrLen2) {
            return sqrLen1 - sqrLen2;
        }
        let texBoolNum1 = Number(Boolean(a1.texturePath));
        let texBoolNum2 = Number(Boolean(a2.texturePath));
        if (texBoolNum1 !== texBoolNum2) {
            return texBoolNum1 - texBoolNum2;
        }
        if (a1.texturePath > a2.texturePath) {
            return 1;
        } else if (a1.texturePath < a2.texturePath) {
            return -1;
        }
        if (a1.srcBlendFactor !== a2.srcBlendFactor) {
            return a1.srcBlendFactor - a2.srcBlendFactor;
        }
        if (a1.dstBlendFactor !== a2.dstBlendFactor) {
            return a1.dstBlendFactor - a2.dstBlendFactor;
        }
        if (a1.blendOp !== a2.blendOp) {
            return a1.blendOp - a2.blendOp;
        }
        return 0;
    }

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
        common.Vector4.copy(this.color, common.COLOR_WHITE);
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