"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("../core");
var glMatrix = require("gl-matrix");
var context_1 = require("./context");
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.particleSystems = [];
        this.renderData = {
            projectionMatrix: core.Matrix.create(),
            projectionMatrix4x4: glMatrix.mat4.create(),
            clearColor: core.Color.create(),
        };
    }
    Renderer.prototype.init = function (info) {
        var renderData = this.renderData;
        var projectionMatrix = renderData.projectionMatrix;
        var projectionMatrix4x4 = renderData.projectionMatrix4x4;
        glMatrix.mat4.identity(projectionMatrix4x4);
        glMatrix.mat3.fromScaling(projectionMatrix, [1 / info.width || 1, 1 / info.height || 1]);
        glMatrix.mat4.fromScaling(projectionMatrix4x4, [1 / (info.width || 1), 1 / (info.height || 1), 1 / (info.depth || 1)]);
        var infoClearColor = info.clearColor;
        glMatrix.vec4.copy(renderData.clearColor, [infoClearColor.r, infoClearColor.g, infoClearColor.b, infoClearColor.a]);
    };
    Renderer.prototype.addParticleSystem = function (ps) {
        var index = this.particleSystems.indexOf(ps);
        if (index < 0) {
            ps._setRenderData(this.renderData);
            this.particleSystems.push(ps);
        }
    };
    Renderer.prototype.removeParticleSystem = function (ps) {
        var index = this.particleSystems.indexOf(ps);
        if (index >= 0) {
            ps._setRenderData(null);
            this.particleSystems.splice(index, 1);
        }
    };
    Renderer.prototype.update = function (dt) {
        this.particleSystems.forEach(function (ps) {
            ps.update(dt);
        });
    };
    Renderer.prototype.render = function () {
        var gl = context_1.context.gl;
        var renderData = this.renderData;
        var clearColor = renderData.clearColor;
        gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        // gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        // gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this.particleSystems.forEach(function (ps) {
            ps.render();
        });
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map