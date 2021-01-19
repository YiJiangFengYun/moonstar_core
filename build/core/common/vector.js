"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VECTOR4_ZERO_ONE = exports.ByteLengthVector4 = exports.Vector4 = exports.VECTOR_ZERO = exports.VECTOR_ONE = exports.ByteLengthVector = exports.Vector = void 0;
var glMatrix = require("gl-matrix");
exports.Vector = glMatrix.vec2;
exports.ByteLengthVector = 2 * 4;
exports.VECTOR_ONE = exports.Vector.fromValues(1, 1);
exports.VECTOR_ZERO = exports.Vector.fromValues(0, 0);
exports.Vector4 = glMatrix.vec4;
exports.ByteLengthVector4 = 4 * 4;
exports.VECTOR4_ZERO_ONE = exports.Vector4.fromValues(0, 0, 1, 1);
//# sourceMappingURL=vector.js.map