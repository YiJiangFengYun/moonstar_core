"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialNormal = exports.Material = exports.getGLBlendFactor = exports.getGLBlendEquation = exports.getGLTypeFromValueFormat = exports.shaderLibs = void 0;
var core = require("../core");
var context_1 = require("./context");
var texture_1 = require("./texture");
var render_data_1 = require("./render_data");
var stat_1 = require("./stat");
var util_shader_1 = require("./util_shader");
exports.shaderLibs = [];
var normalShader = {
    vert: "\n    precision lowp float;\n    attribute vec2 aVertexPosition;\n    attribute vec2 aVertexUV;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uProjectionMatrix;\n    uniform mat4 uModelViewMatrix;\n\n    varying vec2 vUV;\n    varying vec4 vColor;\n    void main() {\n      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0, 1.0);\n      vUV = aVertexUV;\n      vColor = aVertexColor;\n    }\n    ",
    frag: "\n    precision lowp float;\n    varying vec2 vUV;\n    varying vec4 vColor;\n\n    uniform vec4 uColor;\n\n    uniform sampler2D uSampler;\n\n    void main() {\n        gl_FragColor = uColor * vColor * texture2D(uSampler, vUV);\n    }\n    ",
};
function getGLTypeFromValueFormat(valueFormat, gl) {
    var map = [];
    map[core.ValueFormat.UNDEFINED] = 0;
    map[core.ValueFormat.FLOAT32] = gl.FLOAT;
    map[core.ValueFormat.UINT32] = gl.UNSIGNED_INT;
    map[core.ValueFormat.UINT8] = gl.UNSIGNED_BYTE;
    return map[valueFormat];
}
exports.getGLTypeFromValueFormat = getGLTypeFromValueFormat;
function getGLBlendEquation(blendOp, gl) {
    switch (blendOp) {
        case core.BlendOp.ADD: {
            return gl.FUNC_ADD;
        }
        default: {
            return gl.FUNC_ADD;
        }
    }
}
exports.getGLBlendEquation = getGLBlendEquation;
function getGLBlendFactor(factor, gl) {
    var name = core.BlendFactor[factor];
    return gl[name];
}
exports.getGLBlendFactor = getGLBlendFactor;
var Material = /** @class */ (function () {
    function Material() {
        this._stats = stat_1.stats;
    }
    Material.prototype.init = function (materialCore, particleSystemData) {
        this.particleSystemData = particleSystemData;
        this.matCore = materialCore;
        this.shaderProgram = util_shader_1.initShaderProgram(normalShader);
        if (this.shaderProgram) {
            this.inited = true;
        }
        else {
            this.inited = false;
        }
    };
    Material.prototype.render = function (cmd) {
    };
    return Material;
}());
exports.Material = Material;
var MaterialNormal = /** @class */ (function (_super) {
    __extends(MaterialNormal, _super);
    function MaterialNormal() {
        var _this = _super.call(this) || this;
        _this.texture = new texture_1.Texture();
        _this.locations = {};
        return _this;
    }
    MaterialNormal.prototype.init = function (materialCore, particleSystemData) {
        _super.prototype.init.call(this, materialCore, particleSystemData);
        var gl = context_1.context.gl;
        var locations = this.locations;
        var shaderProgram = this.shaderProgram;
        if (shaderProgram) {
            locations.aVertexPos = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            locations.avertexUV = gl.getAttribLocation(shaderProgram, "aVertexUV");
            locations.aVertexColor = gl.getAttribLocation(shaderProgram, "aVertexColor");
            locations.uProjectionMatrix = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
            locations.uModelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
            locations.uColor = gl.getUniformLocation(shaderProgram, "uColor");
            locations.uSampler = gl.getUniformLocation(shaderProgram, "uSampler");
        }
        if (typeof materialCore.textureNumberOrPath === "string")
            this.texture.init({
                url: String(materialCore.textureNumberOrPath)
            });
    };
    MaterialNormal.prototype.render = function (cmd) {
        _super.prototype.render.call(this, cmd);
        if (!this.inited) {
            console.warn("The material was not initialized successfully, so it can't be used for render.");
            return;
        }
        var gl = context_1.context.gl;
        var rData = render_data_1.renderData;
        var psData = this.particleSystemData;
        var modelViewMatrix = cmd.matrixModel;
        var locations = this.locations;
        var materialCore = this.matCore;
        var drawData = psData.psCore.drawData;
        var vFSizes = core.valueFormatSizes;
        //Tell WebGL vertex info and assembly info.
        gl.bindBuffer(gl.ARRAY_BUFFER, psData.vertexBuffer);
        var offset = cmd.vertexBufferByteOffset;
        var vertexInfo = drawData.vertexInfo;
        // Position
        gl.vertexAttribPointer(locations.aVertexPos, vertexInfo[0].count, getGLTypeFromValueFormat(vertexInfo[0].format, gl), false, drawData.vtxSize, offset);
        offset += vFSizes[vertexInfo[0].format] * vertexInfo[0].count;
        gl.enableVertexAttribArray(locations.aVertexPos);
        // UV
        gl.vertexAttribPointer(locations.avertexUV, vertexInfo[1].count, getGLTypeFromValueFormat(vertexInfo[1].format, gl), false, drawData.vtxSize, offset);
        offset += vFSizes[vertexInfo[1].format] * vertexInfo[1].count;
        gl.enableVertexAttribArray(locations.avertexUV);
        // Color
        gl.vertexAttribPointer(locations.aVertexColor, vertexInfo[2].count, getGLTypeFromValueFormat(vertexInfo[2].format, gl), true, drawData.vtxSize, offset);
        gl.enableVertexAttribArray(locations.aVertexColor);
        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, psData.indexBuffer);
        //Use program
        gl.useProgram(this.shaderProgram);
        // Set the shader uniforms
        gl.uniformMatrix4fv(locations.uProjectionMatrix, false, rData.projectionMatrix4x4);
        gl.uniformMatrix4fv(locations.uModelViewMatrix, false, modelViewMatrix);
        gl.uniform4fv(locations.uColor, materialCore.color);
        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture.glTexture);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(locations.uSampler, 0);
        if (materialCore.blend) {
            gl.enable(gl.BLEND);
            gl.blendEquationSeparate(getGLBlendEquation(materialCore.blendOpRGB, gl), getGLBlendEquation(materialCore.blendOpAlpha, gl));
            gl.blendFuncSeparate(getGLBlendFactor(materialCore.blendSrcRGB, gl), getGLBlendFactor(materialCore.blendDstRGB, gl), getGLBlendFactor(materialCore.blendSrcAlpha, gl), getGLBlendFactor(materialCore.blendDstAlpha, gl));
        }
        else {
            gl.disable(gl.BLEND);
        }
        gl.drawElements(gl.TRIANGLES, cmd.indexCount, gl.UNSIGNED_SHORT, cmd.indexOffset * core.indexSize);
        this._stats.addDrawCall();
    };
    return MaterialNormal;
}(Material));
exports.MaterialNormal = MaterialNormal;
//# sourceMappingURL=material.js.map