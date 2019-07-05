"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("../core");
var context_1 = require("./context");
exports.shaderLibs = [];
exports.shaderLibs[core.MaterialType.UNDEFINED] = null;
exports.shaderLibs[core.MaterialType.SPRITE] = {
    vert: "\n    attribute vec3 aVertexPosition;\n    attribute vec2 aVertexUV;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uModelViewMatrix;\n    uniform mat4 uEmitterModelMatrix;\n\n    varying lowp vec2 vUV;\n    varying lowp vec4 vColor;\n    void main() {\n      gl_Position = uModelViewMatrix * uEmitterModelMatrix * aVertexPosition;\n      vUV = aVertexUV;\n      vColor = aVertexColor;\n    }\n    ",
    frag: "\n    varying lowp vec2 vUV;\n    varying lowp vec4 vColor;\n\n    uniform sampler2D uSampler;\n\n    void main() {\n        gl_FragColor = vColor * texture2D(uSampler, vUV);\n    }\n    ",
};
/**
 * A material class is for a material state of a emiter of the core
 */
var Material = /** @class */ (function () {
    function Material() {
        this.locations = {};
    }
    Material.prototype.init = function (matCore) {
        var gl = context_1.context.gl;
        this.matCore = matCore;
        var shaderProgram = this.shaderProgram = this._initShaderProgram(exports.shaderLibs[matCore.type]);
        var locations = this.locations;
        locations.aVertexPos = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        locations.avertexUV = gl.getAttribLocation(shaderProgram, "aVertexUV");
        locations.aVertexColor = gl.getAttribLocation(shaderProgram, "aVertexColor");
        locations.uModelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
        locations.uEmitterModelMatrix = gl.getUniformLocation(shaderProgram, "uEmitterModelMatrix");
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
//# sourceMappingURL=material.js.map