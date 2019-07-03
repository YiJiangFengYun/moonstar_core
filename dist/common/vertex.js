"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttrName;
(function (AttrName) {
    AttrName["POSITION"] = "pos";
    AttrName["UV0"] = "uv0";
    AttrName["COLOR"] = "color";
})(AttrName = exports.AttrName || (exports.AttrName = {}));
var ValueFormat;
(function (ValueFormat) {
    ValueFormat[ValueFormat["UNDEFINED"] = 0] = "UNDEFINED";
    ValueFormat[ValueFormat["FLOAT32"] = 1] = "FLOAT32";
    ValueFormat[ValueFormat["UINT32"] = 2] = "UINT32";
    ValueFormat[ValueFormat["UINT8"] = 3] = "UINT8";
})(ValueFormat = exports.ValueFormat || (exports.ValueFormat = {}));
exports.valueFormatSizes = [
    0,
    4,
    4,
    1,
];
exports.indexSize = 4;
