import * as core from "../core";
import { context } from "./context";

export const shaderLibs: { vert: string; frag: string }[] = [];

shaderLibs[core.MaterialType.UNDEFINED] = null;
shaderLibs[core.MaterialType.SPRITE] = {
    vert: `
    attribute vec3 aVertexPosition;
    attribute vec2 aVertexUV;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uEmitterModelMatrix;

    varying lowp vec2 vUV;
    varying lowp vec4 vColor;
    void main() {
      gl_Position = uModelViewMatrix * uEmitterModelMatrix * aVertexPosition;
      vUV = aVertexUV;
      vColor = aVertexColor;
    }
    `,
    frag: `
    varying lowp vec2 vUV;
    varying lowp vec4 vColor;

    uniform sampler2D uSampler;

    void main() {
        gl_FragColor = vColor * texture2D(uSampler, vUV);
    }
    `,
}

/**
 * A material class is for a material state of a emiter of the core 
 */
export class Material {
    public matCore: core.Material;
    public shaderProgram: WebGLProgram;
    public locations: {
        aVertexPos?: number;
        avertexUV?: number;
        aVertexColor?: number;
        uModelViewMatrix?: WebGLUniformLocation;
        uEmitterModelMatrix?: WebGLUniformLocation;
    } = {};

    public constructor() {

    }

    public init(matCore: core.Material) {
        let gl = context.gl;
        this.matCore = matCore;
        let shaderProgram = this.shaderProgram = this._initShaderProgram(shaderLibs[matCore.type]);
        let locations = this.locations;
        locations.aVertexPos = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        locations.avertexUV = gl.getAttribLocation(shaderProgram, "aVertexUV");
        locations.aVertexColor = gl.getAttribLocation(shaderProgram, "aVertexColor");
        locations.uModelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
        locations.uEmitterModelMatrix = gl.getUniformLocation(shaderProgram, "uEmitterModelMatrix");
    }

    private _initShaderProgram(src: {
        vert: string; frag: string 
    }) {
        let gl = context.gl;
        const vertexShader = this._loadShader(gl.VERTEX_SHADER, src.vert);
        const fragmentShader = this._loadShader(gl.FRAGMENT_SHADER, src.frag);

        // Create the shader program

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
    }

    //
    // creates a shader of the given type, uploads the source and
    // compiles it.
    //
    private _loadShader(type: number, source: string) {
        let gl = context.gl;
        const shader = gl.createShader(type);

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
    }
}