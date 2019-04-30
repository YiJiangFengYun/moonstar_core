"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function copyVector(src, target) {
    target.x = src.x;
    target.y = src.y;
    target.z = src.z;
}
exports.copyVector = copyVector;
function cloneVector(src) {
    var newVector = {};
    copyVector(src, newVector);
    return newVector;
}
exports.cloneVector = cloneVector;
