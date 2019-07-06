import * as core from "../core";
import { context } from "./context";
import { ParticleSystemData } from "./particle_system_data";

export const shaderLibs: { vert: string; frag: string }[] = [];

shaderLibs[core.MaterialType.UNDEFINED] = null;
shaderLibs[core.MaterialType.SPRITE] = {
    vert: `
    attribute vec2 aVertexPosition;
    attribute vec2 aVertexUV;
    attribute vec4 aVertexColor;

    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uEmitterModelMatrix;

    varying lowp vec2 vUV;
    varying lowp vec4 vColor;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * uEmitterModelMatrix * vec4(aVertexPosition, 1.0, 1.0);
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

export function getGLTypeFromValueFormat(valueFormat: core.ValueFormat, gl: WebGLRenderingContext): number {
    let map = [];
    map[core.ValueFormat.UNDEFINED] = 0;
    map[core.ValueFormat.FLOAT32] = gl.FLOAT;
    map[core.ValueFormat.UINT32] = gl.UNSIGNED_INT;
    map[core.ValueFormat.UINT8] = gl.BYTE;
    return map[valueFormat];
}
/**
 * A material class is for a material state of a emiter of the core 
 */
export class Material {
    public matCore: core.Material;
    public shaderProgram: WebGLProgram;
    public particleSystemData: ParticleSystemData;
    public locations: {
        aVertexPos?: number;
        avertexUV?: number;
        aVertexColor?: number;
        uProjectionMatrix?: WebGLUniformLocation;
        uModelViewMatrix?: WebGLUniformLocation;
        uEmitterModelMatrix?: WebGLUniformLocation;
    } = {};

    public constructor() {

    }

    public init(materialCore: core.Material, particleSystemData: ParticleSystemData) {
        this.particleSystemData = particleSystemData;
        this.matCore = materialCore;
        let gl = context.gl;
        switch (materialCore.type) {
            case core.MaterialType.SPRITE:
                let shaderProgram = this.shaderProgram = this._initShaderProgram(shaderLibs[materialCore.type]);
                let locations = this.locations;
                locations.aVertexPos = gl.getAttribLocation(shaderProgram, "aVertexPosition");
                locations.avertexUV = gl.getAttribLocation(shaderProgram, "aVertexUV");
                locations.aVertexColor = gl.getAttribLocation(shaderProgram, "aVertexColor");
                locations.uProjectionMatrix = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
                locations.uModelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
                locations.uEmitterModelMatrix = gl.getUniformLocation(shaderProgram, "uEmitterModelMatrix");
                break;
        
            default:
                break;
        }
    }

    public render(emitterMatrix: core.Matrix, indexOffset: number, indexCount: number) {
        let gl = context.gl;
        let psData = this.particleSystemData;
        let modelViewMatrix = psData.modelViewMatrix;
        let locations = this.locations;
        let materialCore = this.matCore;
        let drawData = psData.psCore.drawData;
        let vFSizes = core.valueFormatSizes;
        switch (materialCore.type) {
            case core.MaterialType.SPRITE: {
                //Tell WebGL vertex info and assembly info.
                gl.bindBuffer(gl.ARRAY_BUFFER, psData.vertexBuffer);
                let offset = 0;
                let vertexInfo = drawData.vertexInfo;
                // Position
                gl.vertexAttribPointer(
                    locations.aVertexPos,
                    vertexInfo[0].count,
                    getGLTypeFromValueFormat(vertexInfo[0].format, gl),
                    false,
                    drawData.vtxSize,
                    offset
                );
                offset += vFSizes[vertexInfo[0].format] * vertexInfo[0].count;
                gl.enableVertexAttribArray(locations.aVertexPos);
                // UV
                gl.vertexAttribPointer(
                    locations.avertexUV,
                    vertexInfo[1].count,
                    getGLTypeFromValueFormat(vertexInfo[1].format, gl),
                    false,
                    drawData.vtxSize,
                    offset
                );
                offset += vFSizes[vertexInfo[1].format] * vertexInfo[1].count;
                gl.enableVertexAttribArray(locations.avertexUV);
                // Color
                gl.vertexAttribPointer(
                    locations.aVertexColor,
                    vertexInfo[2].count,
                    getGLTypeFromValueFormat(vertexInfo[2].format, gl),
                    true,
                    drawData.vtxSize,
                    offset
                );
                gl.enableVertexAttribArray(locations.aVertexColor);
                break;
            }
            default: {

            }
        }
        
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