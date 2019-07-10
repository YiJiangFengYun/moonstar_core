"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("../core");
var glMatrix = require("gl-matrix");
var log = require("loglevel");
var context_1 = require("./context");
var texture_1 = require("./texture");
var render_data_1 = require("./render_data");
exports.shaderLibs = [];
exports.shaderLibs[core.MaterialType.UNDEFINED] = null;
exports.shaderLibs[core.MaterialType.SPRITE] = {
    vert: "\n    precision lowp float;\n    attribute vec2 aVertexPosition;\n    attribute vec2 aVertexUV;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uProjectionMatrix;\n    uniform mat4 uModelViewMatrix;\n    uniform mat4 uEmitterModelMatrix;\n\n    varying vec2 vUV;\n    varying vec4 vColor;\n    void main() {\n      gl_Position = uProjectionMatrix * uModelViewMatrix * uEmitterModelMatrix * vec4(aVertexPosition, 1.0, 1.0);\n      vUV = aVertexUV;\n      vColor = aVertexColor;\n    }\n    ",
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
    }
    Material.prototype.init = function (materialCore, particleSystemData) {
        this.particleSystemData = particleSystemData;
        this.matCore = materialCore;
        this.shaderProgram = this._initShaderProgram(exports.shaderLibs[materialCore.type]);
    };
    Material.prototype.render = function (cmd) {
    };
    Material.prototype._initShaderProgram = function (src) {
        var gl = context_1.context.gl;
        var vertexShader = this._loadShader(gl.VERTEX_SHADER, src.vert);
        var fragmentShader = this._loadShader(gl.FRAGMENT_SHADER, src.frag);
        // Create the shader program
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        // If creating the shader program failed, alert
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    };
    //
    // creates a shader of the given type, uploads the source and
    // compiles it.
    //
    Material.prototype._loadShader = function (type, source) {
        var gl = context_1.context.gl;
        var shader = gl.createShader(type);
        // Send the source to the shader object
        gl.shaderSource(shader, source);
        // Compile the shader program
        gl.compileShader(shader);
        // See if it compiled successfully
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    return Material;
}());
exports.Material = Material;
/**
 * A material class is for a material state of a emiter of the core
 */
var SpriteMaterial = /** @class */ (function (_super) {
    __extends(SpriteMaterial, _super);
    function SpriteMaterial() {
        var _this = _super.call(this) || this;
        _this.texture = new texture_1.Texture();
        _this.locations = {};
        _this._emitterModelMatrixHelper = glMatrix.mat4.create();
        return _this;
    }
    SpriteMaterial.prototype.init = function (materialCore, particleSystemData) {
        _super.prototype.init.call(this, materialCore, particleSystemData);
        var gl = context_1.context.gl;
        var locations = this.locations;
        var shaderProgram = this.shaderProgram;
        locations.aVertexPos = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        locations.avertexUV = gl.getAttribLocation(shaderProgram, "aVertexUV");
        locations.aVertexColor = gl.getAttribLocation(shaderProgram, "aVertexColor");
        locations.uProjectionMatrix = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
        locations.uModelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
        locations.uEmitterModelMatrix = gl.getUniformLocation(shaderProgram, "uEmitterModelMatrix");
        locations.uColor = gl.getUniformLocation(shaderProgram, "uColor");
        locations.uSampler = gl.getUniformLocation(shaderProgram, "uSampler");
        this.texture.init({
            url: materialCore.texturePath
        });
    };
    SpriteMaterial.prototype.render = function (cmd) {
        _super.prototype.render.call(this, cmd);
        var gl = context_1.context.gl;
        var rData = render_data_1.renderData;
        var psData = this.particleSystemData;
        var modelViewMatrix = psData.modelViewMatrix;
        var emitterModelMatrix = this._emitterModelMatrixHelper;
        glMatrix.mat4.fromScaling(emitterModelMatrix, [cmd.scaleEmitter[0], cmd.scaleEmitter[1], 1]);
        glMatrix.mat4.rotateZ(emitterModelMatrix, emitterModelMatrix, cmd.rotationEmitter);
        glMatrix.mat4.translate(emitterModelMatrix, emitterModelMatrix, [cmd.translationEmitter[0], cmd.translationEmitter[1], 0]);
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
        gl.uniformMatrix4fv(locations.uEmitterModelMatrix, false, emitterModelMatrix);
        gl.uniform4fv(locations.uColor, materialCore.color);
        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture.glTexture);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(locations.uSampler, 0);
        gl.enable(gl.BLEND);
        gl.blendEquation(getGLBlendEquation(materialCore.blendOp, gl));
        gl.blendFunc(getGLBlendFactor(materialCore.srcBlendFactor, gl), getGLBlendFactor(materialCore.dstBlendFactor, gl));
        gl.drawElements(gl.TRIANGLES, cmd.indexCount, gl.UNSIGNED_SHORT, cmd.indexOffset * core.indexSize);
    };
    return SpriteMaterial;
}(Material));
exports.SpriteMaterial = SpriteMaterial;
var materials = [];
materials[core.MaterialType.UNDEFINED] = null;
materials[core.MaterialType.SPRITE] = SpriteMaterial;
function createMaterial(materialCore, particleSystemData) {
    var materialClass = materials[materialCore.type];
    if (materialClass) {
        var mat = new materialClass();
        mat.init(materialCore, particleSystemData);
        return mat;
    }
    else {
        log.error("The material type (" + materialCore.type + ") of the creating material is invalid.");
        return null;
    }
}
exports.createMaterial = createMaterial;
//# sourceMappingURL=material.js.map