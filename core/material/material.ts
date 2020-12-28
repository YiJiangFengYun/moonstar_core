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
    CONSTANT_COLOR,
    ONE_MINUS_CONSTANT_COLOR,
    CONSTANT_ALPHA,
    ONE_MINUS_CONSTANT_ALPHA,
    SRC_ALPHA_SATURATE,
};

export enum BlendOp
{
    ADD,
};

//class Material with members: color, texture path, and blend.
export class Material {

    public static equal(a1: Material, a2: Material) {
        if (common.Color.equals(a1.color, a2.color) === false) return false;
        if (a1.texturePath !== a2.texturePath) return false;
        if (a1.blend !== a2.blend) return false;
        if (a1.blendOpRGB !== a2.blendOpRGB) return false;
        if (a1.blendOpAlpha !== a2.blendOpAlpha) return false;
        if (a1.blendSrcRGB !== a2.blendSrcRGB) return false;
        if (a1.blendDstRGB !== a2.blendDstRGB) return false;
        if (a1.blendSrcAlpha !== a2.blendSrcAlpha) return false;
        if (a1.blendDstAlpha !== a2.blendDstAlpha) return false;
        return true;
    }

    public static sort(a1: Material, a2: Material) {
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

        if (a1.blend !== a2.blend) {
            return Number(a1.blend) - Number(a2.blend);
        }
        if (a1.blendOpRGB !== a2.blendOpRGB) {
            return a1.blendOpRGB - a2.blendOpRGB;
        }
        if (a1.blendOpAlpha !== a2.blendOpAlpha) {
            return a1.blendOpAlpha - a2.blendOpAlpha;
        }
        if (a1.blendSrcRGB !== a2.blendSrcRGB) {
            return a1.blendSrcRGB - a2.blendSrcRGB;
        }
        if (a1.blendDstRGB !== a2.blendDstRGB) {
            return a1.blendDstRGB - a2.blendDstRGB;
        }
        if (a1.blendSrcAlpha !== a2.blendSrcAlpha) {
            return a1.blendSrcAlpha - a2.blendSrcAlpha;
        }
        if (a1.blendDstAlpha !== a2.blendDstAlpha) {
            return a1.blendDstAlpha - a2.blendDstAlpha;
        }
        return 0;
    }

    public color: common.Color = common.Color.create();
    public texturePath: string;
    public blend = true;
    public blendSrcRGB = BlendFactor.SRC_ALPHA;
    public blendDstRGB = BlendFactor.ONE_MINUS_SRC_ALPHA;
    public blendSrcAlpha = BlendFactor.SRC_ALPHA;
    public blendDstAlpha = BlendFactor.ONE_MINUS_SRC_ALPHA;
    public blendOpRGB = BlendOp.ADD;
    public blendOpAlpha = BlendOp.ADD;

    private _id: number;
    public constructor() {
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
        this.blend = info.blend || true;
        this.blendSrcRGB = info.blendSrcRGB || BlendFactor.SRC_ALPHA;
        this.blendDstRGB = info.blendDstRGB || BlendFactor.ONE;
        this.blendSrcAlpha = info.blendSrcAlpha || BlendFactor.SRC_ALPHA;
        this.blendDstAlpha = info.blendDstAlpha || BlendFactor.ONE;
        this.blendOpRGB = info.blendOpRGB || BlendOp.ADD;
        this.blendOpAlpha = info.blendOpAlpha || BlendOp.ADD;
    }
}