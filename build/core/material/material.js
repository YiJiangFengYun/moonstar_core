"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
})(BlendFactor = exports.BlendFactor || (exports.BlendFactor = {}));
;
var BlendOp;
(function (BlendOp) {
    BlendOp[BlendOp["ADD"] = 0] = "ADD";
})(BlendOp = exports.BlendOp || (exports.BlendOp = {}));
;
var MaterialType;
(function (MaterialType) {
    MaterialType[MaterialType["UNDEFINED"] = 0] = "UNDEFINED";
    MaterialType[MaterialType["SPRITE"] = 1] = "SPRITE";
})(MaterialType = exports.MaterialType || (exports.MaterialType = {}));
//class Material with members: color, texture path, and blend.
var Material = /** @class */ (function () {
    function Material(type) {
        this.color = common.Color.create();
        this.srcBlendFactor = BlendFactor.SRC_ALPHA;
        this.dstBlendFactor = BlendFactor.ONE_MINUS_SRC_ALPHA;
        this.blendOp = BlendOp.ADD;
        this.type = type;
        this._id = common.gainID();
        this.color.set(common.COLOR_WHITE);
    }
    Object.defineProperty(Material.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.init = function (info) {
        this.color[0] = info.r || 1;
        this.color[1] = info.g || 1;
        this.color[2] = info.b || 1;
        this.color[3] = info.a || 1;
        this.texturePath = info.texturePath;
        this.srcBlendFactor = info.srcBlendFactor || BlendFactor.SRC_ALPHA;
        this.dstBlendFactor = info.dstBlendFactor || BlendFactor.ONE;
        this.blendOp = info.blendOp || BlendOp.ADD;
    };
    return Material;
}());
exports.Material = Material;
//# sourceMappingURL=material.js.map