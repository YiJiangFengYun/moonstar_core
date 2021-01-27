"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = exports.BlendOp = exports.BlendFactor = void 0;
var common = require("../common");
var BlendFactor;
(function (BlendFactor) {
    BlendFactor[BlendFactor["ZERO"] = 0] = "ZERO";
    BlendFactor[BlendFactor["ONE"] = 1] = "ONE";
    BlendFactor[BlendFactor["SRC_COLOR"] = 2] = "SRC_COLOR";
    BlendFactor[BlendFactor["ONE_MINUS_SRC_COLOR"] = 3] = "ONE_MINUS_SRC_COLOR";
    BlendFactor[BlendFactor["DST_COLOR"] = 4] = "DST_COLOR";
    BlendFactor[BlendFactor["ONE_MINUS_DST_COLOR"] = 5] = "ONE_MINUS_DST_COLOR";
    BlendFactor[BlendFactor["SRC_ALPHA"] = 6] = "SRC_ALPHA";
    BlendFactor[BlendFactor["ONE_MINUS_SRC_ALPHA"] = 7] = "ONE_MINUS_SRC_ALPHA";
    BlendFactor[BlendFactor["DST_ALPHA"] = 8] = "DST_ALPHA";
    BlendFactor[BlendFactor["ONE_MINUS_DST_ALPHA"] = 9] = "ONE_MINUS_DST_ALPHA";
    BlendFactor[BlendFactor["CONSTANT_COLOR"] = 10] = "CONSTANT_COLOR";
    BlendFactor[BlendFactor["ONE_MINUS_CONSTANT_COLOR"] = 11] = "ONE_MINUS_CONSTANT_COLOR";
    BlendFactor[BlendFactor["CONSTANT_ALPHA"] = 12] = "CONSTANT_ALPHA";
    BlendFactor[BlendFactor["ONE_MINUS_CONSTANT_ALPHA"] = 13] = "ONE_MINUS_CONSTANT_ALPHA";
    BlendFactor[BlendFactor["SRC_ALPHA_SATURATE"] = 14] = "SRC_ALPHA_SATURATE";
})(BlendFactor = exports.BlendFactor || (exports.BlendFactor = {}));
;
var BlendOp;
(function (BlendOp) {
    BlendOp[BlendOp["ADD"] = 0] = "ADD";
})(BlendOp = exports.BlendOp || (exports.BlendOp = {}));
;
//class Material with members: color, texture path, and blend.
var Material = /** @class */ (function () {
    function Material() {
        this.type = 0;
        this.color = common.Color.create();
        this.blend = true;
        this.blendSrcRGB = BlendFactor.SRC_ALPHA;
        this.blendDstRGB = BlendFactor.ONE_MINUS_SRC_ALPHA;
        this.blendSrcAlpha = BlendFactor.SRC_ALPHA;
        this.blendDstAlpha = BlendFactor.ONE_MINUS_SRC_ALPHA;
        this.blendOpRGB = BlendOp.ADD;
        this.blendOpAlpha = BlendOp.ADD;
        this._id = common.gainID();
        common.Vector4.copy(this.color, common.COLOR_WHITE);
    }
    Material.equal = function (a1, a2) {
        if (a1.type !== a2.type)
            return false;
        if (common.Color.equals(a1.color, a2.color) === false)
            return false;
        if (a1.textureNumberOrPath !== a2.textureNumberOrPath)
            return false;
        if (a1.blend !== a2.blend)
            return false;
        if (a1.blendOpRGB !== a2.blendOpRGB)
            return false;
        if (a1.blendOpAlpha !== a2.blendOpAlpha)
            return false;
        if (a1.blendSrcRGB !== a2.blendSrcRGB)
            return false;
        if (a1.blendDstRGB !== a2.blendDstRGB)
            return false;
        if (a1.blendSrcAlpha !== a2.blendSrcAlpha)
            return false;
        if (a1.blendDstAlpha !== a2.blendDstAlpha)
            return false;
        return true;
    };
    Material.sort = function (a1, a2) {
        if (a1.type !== a2.type) {
            return a1.type - a2.type;
        }
        var sqrLen1 = common.Color.sqrLen(a1.color);
        var sqrLen2 = common.Color.sqrLen(a2.color);
        if (sqrLen1 !== sqrLen2) {
            return sqrLen1 - sqrLen2;
        }
        var texBoolNum1 = Number(Boolean(a1.textureNumberOrPath));
        var texBoolNum2 = Number(Boolean(a2.textureNumberOrPath));
        if (texBoolNum1 !== texBoolNum2) {
            return texBoolNum1 - texBoolNum2;
        }
        if (a1.textureNumberOrPath > a2.textureNumberOrPath) {
            return 1;
        }
        else if (a1.textureNumberOrPath < a2.textureNumberOrPath) {
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
    };
    Object.defineProperty(Material.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Material.prototype.init = function (info) {
        this.type = info.type || 0;
        this.color[0] = info.r || 1;
        this.color[1] = info.g || 1;
        this.color[2] = info.b || 1;
        this.color[3] = info.a || 1;
        this.textureNumberOrPath = info.texturePath || info.textureNumber || info.textureNumberOrPath;
        this.blend = info.blend || true;
        this.blendSrcRGB = info.blendSrcRGB || BlendFactor.SRC_ALPHA;
        this.blendDstRGB = info.blendDstRGB || BlendFactor.ONE;
        this.blendSrcAlpha = info.blendSrcAlpha || BlendFactor.SRC_ALPHA;
        this.blendDstAlpha = info.blendDstAlpha || BlendFactor.ONE;
        this.blendOpRGB = info.blendOpRGB || BlendOp.ADD;
        this.blendOpAlpha = info.blendOpAlpha || BlendOp.ADD;
    };
    return Material;
}());
exports.Material = Material;
