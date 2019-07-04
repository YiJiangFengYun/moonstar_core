"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WHITE = {
    r: 1,
    g: 1,
    b: 1,
    a: 1,
};
exports.BLACK = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
};
exports.ZERO = {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
};
function copyColor(src, tgt) {
    tgt.r = src.r;
    tgt.g = src.g;
    tgt.b = src.b;
    tgt.a = src.a;
}
exports.copyColor = copyColor;
