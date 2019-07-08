import * as glMatrix from "gl-matrix";
import * as core from "../core";
export declare class ParticleSystemData {
    psCore: core.ParticleSystem;
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    modelViewMatrix: glMatrix.mat4;
    init(info: core.ParticleSystemInfo): void;
    private _initBuffers;
}
