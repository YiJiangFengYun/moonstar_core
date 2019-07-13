"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("loglevel");
var context_1 = require("./context");
function initShaderProgram(src) {
    var gl = context_1.context.gl;
    var vertexShader = loadShader(gl.VERTEX_SHADER, src.vert);
    if (!vertexShader)
        return null;
    var fragmentShader = loadShader(gl.FRAGMENT_SHADER, src.frag);
    if (!fragmentShader)
        return null;
    // Create the shader program
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    // If creating the shader program failed, return null
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        log.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    return shaderProgram;
}
exports.initShaderProgram = initShaderProgram;
//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(type, source) {
    var gl = context_1.context.gl;
    var shader = gl.createShader(type);
    // Send the source to the shader object
    gl.shaderSource(shader, source);
    // Compile the shader program
    gl.compileShader(shader);
    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        log.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
exports.loadShader = loadShader;
//# sourceMappingURL=util_shader.js.map