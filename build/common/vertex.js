"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttrName;
(function (AttrName) {
    AttrName["POSITION"] = "pos";
    AttrName["UV0"] = "uv0";
    AttrName["COLOR"] = "color";
})(AttrName = exports.AttrName || (exports.AttrName = {}));
var AttrFormat;
(function (AttrFormat) {
    AttrFormat[AttrFormat["UNDEFINED"] = 0] = "UNDEFINED";
    AttrFormat[AttrFormat["FLOAT32"] = 1] = "FLOAT32";
    AttrFormat[AttrFormat["UINT32"] = 2] = "UINT32";
    AttrFormat[AttrFormat["UINT8"] = 3] = "UINT8";
})(AttrFormat = exports.AttrFormat || (exports.AttrFormat = {}));
exports.ATTR_FORMAT_SIZES = [
    0,
    4,
    4,
    1,
];
exports.INDEX_SIZE = 4;
//# sourceMappingURL=vertex.js.map