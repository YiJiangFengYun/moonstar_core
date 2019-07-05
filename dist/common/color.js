"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glMatrix = require("gl-matrix");
exports.Color = glMatrix.vec4;
exports.WHITE = glMatrix.vec4.fromValues(1, 1, 1, 1);
exports.BLACK = glMatrix.vec4.fromValues(0, 0, 0, 1);
exports.ZERO = glMatrix.vec4.fromValues(0, 0, 0, 0);
