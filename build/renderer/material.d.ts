import * as core from "../core";
import { ParticleSystemData } from "./particle_system_data";
import { Texture } from "./texture";
export declare const shaderLibs: {
    vert: string;
    frag: string;
}[];
export declare function getGLTypeFromValueFormat(valueFormat: core.ValueFormat, gl: WebGLRenderingContext): number;
export declare function getGLBlendEquation(blendOp: core.BlendOp, gl: WebGLRenderingContext): number;
export declare function getGLBlendFactor(factor: core.BlendFactor, gl: WebGLRenderingContext): number;
export declare class Material {
    inited: boolean;
    matCore: core.Material;
    shaderProgram: WebGLProgram;
    particleSystemData: ParticleSystemData;
    init(materialCore: core.Material, particleSystemData: ParticleSystemData): void;
    render(cmd: core.DrawCmd): void;
    private _initShaderProgram;
    private _loadShader;
}
/**
 * A material class is for a material state of a emiter of the core
 */
export declare class SpriteMaterial extends Material {
    texture: Texture;
    locations: {
        aVertexPos?: number;
        avertexUV?: number;
        aVertexColor?: number;
        uProjectionMatrix?: WebGLUniformLocation;
        uModelViewMatrix?: WebGLUniformLocation;
        uEmitterModelMatrix?: WebGLUniformLocation;
        uColor?: WebGLUniformLocation;
        uSampler?: WebGLUniformLocation;
    };
    private _emitterModelMatrixHelper;
    constructor();
    init(materialCore: core.Material, particleSystemData: ParticleSystemData): void;
    render(cmd: core.DrawCmd): void;
}
export declare function createMaterial(materialCore: core.Material, particleSystemData: ParticleSystemData): Material;
