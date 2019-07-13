import * as core from "../core";
import * as glMatrix from "gl-matrix";
import { context } from "./context";
import { initShaderProgram } from "./util_shader";
import { renderData } from "./render_data";

export namespace emitterBoundsOutline {
    const shader = {
        vert: `
precision lowp float;
attribute vec2 aVertexPosition;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uEmitterModelMatrix;
uniform vec2 uSize;
void main() {
    vec2 scale = uSize / 2.0;
    vec2 pos = scale * aVertexPosition;
    gl_Position = uProjectionMatrix * uModelViewMatrix * uEmitterModelMatrix * vec4(pos, 1.0, 1.0);
}
        `,
        frag: `
precision lowp float;
uniform vec4 uColor;
void main() {
    gl_FragColor = uColor;
}
        `,
    }

    var vertexBuffer: WebGLBuffer = null;
    var shaderProgram: WebGLProgram = null;
    var color: core.Color = core.Color.fromValues(1, 0, 0, 1);

    var emitterModelMatrixHelper: glMatrix.mat4 = glMatrix.mat4.create();

    var locations: {
        aVertexPos?: number;
        uProjectionMatrix?: WebGLUniformLocation;
        uModelViewMatrix?: WebGLUniformLocation;
        uEmitterModelMatrix?: WebGLUniformLocation;
        uSize?: WebGLUniformLocation;
        uColor?: WebGLUniformLocation;
    } = {};

    export function init() {
        // Initialize vertex buffer.
        const buffer: Float32Array = new Float32Array([
            -1, 1,
            1, 1,
            1, -1,
            -1, -1,
        ]);
        let gl = context.gl;
        vertexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);


        gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.DYNAMIC_DRAW);

        // Initialize shader program
        shaderProgram = initShaderProgram(shader);

        // Initialize locations.
        locations.aVertexPos = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        locations.uProjectionMatrix = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
        locations.uModelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
        locations.uEmitterModelMatrix = gl.getUniformLocation(shaderProgram, "uEmitterModelMatrix");
        locations.uSize = gl.getUniformLocation(shaderProgram, "uSize");
        locations.uColor = gl.getUniformLocation(shaderProgram, "uColor");

    }

    export function render(cmd: core.DrawCmd, modelViewMatrix: glMatrix.mat4, size: core.Vector) {
        let gl = context.gl;
        let rData = renderData;
        let emitterModelMatrix = emitterModelMatrixHelper;
        glMatrix.mat4.fromScaling(emitterModelMatrix, [cmd.scaleEmitter[0], cmd.scaleEmitter[1], 1]);
        glMatrix.mat4.rotateZ(emitterModelMatrix, emitterModelMatrix, cmd.rotationEmitter);
        glMatrix.mat4.translate(emitterModelMatrix, emitterModelMatrix, [cmd.translationEmitter[0], cmd.translationEmitter[1], 0]);
        let loc = locations;

        //Tell WebGL vertex info and assembly info.
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // Position
        gl.vertexAttribPointer(
            loc.aVertexPos,
            2,
            gl.FLOAT,
            false,
            8,
            0
        );
        gl.enableVertexAttribArray(loc.aVertexPos);

        //Use program
        gl.useProgram(shaderProgram);

        // Set the shader uniforms
        gl.uniformMatrix4fv(
            loc.uProjectionMatrix,
            false,
            rData.projectionMatrix4x4
        );
        gl.uniformMatrix4fv(
            loc.uModelViewMatrix,
            false,
            modelViewMatrix
        );
        gl.uniformMatrix4fv(
            loc.uEmitterModelMatrix,
            false,
            emitterModelMatrix
        );

        gl.uniform2fv(
            loc.uSize,
            size,
        );

        gl.uniform4fv(
            loc.uColor,
            color,
        );

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ZERO);

        gl.lineWidth(2.0);
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
    }
}