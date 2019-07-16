"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("../core");
var glMatrix = require("gl-matrix");
exports.renderData = {
    projectionMatrix: core.Matrix.create(),
    projectionMatrix4x4: glMatrix.mat4.create(),
    clearColor: core.Color.create(),
    viewBounds: core.Bounds.create(),
};
//# sourceMappingURL=render_data.js.map