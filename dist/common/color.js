"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLOR_ZERO = exports.COLOR_BLACK = exports.COLOR_WHITE = exports.Color = void 0;
var glMatrix = require("gl-matrix");
exports.Color = glMatrix.vec4;
exports.COLOR_WHITE = glMatrix.vec4.fromValues(1, 1, 1, 1);
exports.COLOR_BLACK = glMatrix.vec4.fromValues(0, 0, 0, 1);
exports.COLOR_ZERO = glMatrix.vec4.fromValues(0, 0, 0, 0);
