import * as core from "../core";
import { ParticleSystemData } from "./particle_system_data";
import { Texture } from "./texture";
import { Stats } from "./stat";
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
    protected _stats: Stats;
    constructor();
    init(materialCore: core.Material, particleSystemData: ParticleSystemData): void;
    render(cmd: core.DrawCmd): void;
}
export declare class MaterialNormal extends Material {
    texture: Texture;
    locations: {
        aVertexPos?: number;
        avertexUV?: number;
        aVertexColor?: number;
        uProjectionMatrix?: WebGLUniformLocation;
        uModelViewMatrix?: WebGLUniformLocation;
        uColor?: WebGLUniformLocation;
        uSampler?: WebGLUniformLocation;
    };
    constructor();
    init(materialCore: core.Material, particleSystemData: ParticleSystemData): void;
    render(cmd: core.DrawCmd): void;
}
