"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//class Material with members: color, texture path, and blend.
var Material = /** @class */ (function () {
    function Material() {
        this.srcColorBlendFactor = BlendFactor.SRC_ALPHA;
        this.dstColorBlendFactor = BlendFactor.ONE_MINUS_SRC_ALPHA;
        this.colorBlendOp = BlendOp.ADD;
        this.srcAlphaBlendFactor = BlendFactor.SRC_ALPHA;
        this.dstAlphaBlendFactor = BlendFactor.DST_ALPHA;
        this.alphaBlendOp = BlendOp.ADD;
    }
    return Material;
}());
exports.Material = Material;
