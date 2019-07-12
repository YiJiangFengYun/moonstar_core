"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("../core");
var glMatrix = require("gl-matrix");
var context_1 = require("./context");
var util_shader_1 = require("./util_shader");
var render_data_1 = require("./render_data");
var emitterBoundsOutline;
(function (emitterBoundsOutline) {
    var shader = {
        vert: "\nprecision lowp float;\nattribute vec2 aVertexPosition;\nuniform mat4 uProjectionMatrix;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uEmitterModelMatrix;\nuniform vec2 uSize;\nvoid main() {\n    vec2 scale = uSize / 2.0;\n    vec2 pos = scale * aVertexPosition;\n    gl_Position = uProjectionMatrix * uModelViewMatrix * uEmitterModelMatrix * vec4(pos, 1.0, 1.0);\n}\n        ",
        frag: "\nprecision lowp float;\nuniform vec4 uColor;\nvoid main() {\n    gl_FragColor = uColor;\n}\n        ",
    };
    var vertexBuffer = null;
    var shaderProgram = null;
    var color = core.Color.fromValues(1, 0, 0, 1);
    var emitterModelMatrixHelper = glMatrix.mat4.create();
    var locations = {};
    function init() {
        // Initialize vertex buffer.
        var buffer = new Float32Array([
            -1, 1,
            1, 1,
            1, -1,
            -1, -1,
        ]);
        var gl = context_1.context.gl;
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.DYNAMIC_DRAW);
        // Initialize shader program
        shaderProgram = util_shader_1.initShaderProgram(shader);
        // Initialize locations.
        locations.aVertexPos = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        locations.uProjectionMatrix = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
        locations.uModelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
        locations.uEmitterModelMatrix = gl.getUniformLocation(shaderProgram, "uEmitterModelMatrix");
        locations.uSize = gl.getUniformLocation(shaderProgram, "uSize");
        locations.uColor = gl.getUniformLocation(shaderProgram, "uColor");
    }
    emitterBoundsOutline.init = init;
    function render(cmd, modelViewMatrix, size) {
        var gl = context_1.context.gl;
        var rData = render_data_1.renderData;
        var emitterModelMatrix = emitterModelMatrixHelper;
        glMatrix.mat4.fromScaling(emitterModelMatrix, [cmd.scaleEmitter[0], cmd.scaleEmitter[1], 1]);
        glMatrix.mat4.rotateZ(emitterModelMatrix, emitterModelMatrix, cmd.rotationEmitter);
        glMatrix.mat4.translate(emitterModelMatrix, emitterModelMatrix, [cmd.translationEmitter[0], cmd.translationEmitter[1], 0]);
        var loc = locations;
        //Tell WebGL vertex info and assembly info.
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // Position
        gl.vertexAttribPointer(loc.aVertexPos, 2, gl.FLOAT, false, 8, 0);
        gl.enableVertexAttribArray(loc.aVertexPos);
        //Use program
        gl.useProgram(shaderProgram);
        // Set the shader uniforms
        gl.uniformMatrix4fv(loc.uProjectionMatrix, false, rData.projectionMatrix4x4);
        gl.uniformMatrix4fv(loc.uModelViewMatrix, false, modelViewMatrix);
        gl.uniformMatrix4fv(loc.uEmitterModelMatrix, false, emitterModelMatrix);
        gl.uniform2fv(loc.uSize, size);
        gl.uniform4fv(loc.uColor, color);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ZERO);
        gl.lineWidth(2.0);
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
    }
    emitterBoundsOutline.render = render;
})(emitterBoundsOutline = exports.emitterBoundsOutline || (exports.emitterBoundsOutline = {}));
//# sourceMappingURL=emitter_bounds_outline.js.map