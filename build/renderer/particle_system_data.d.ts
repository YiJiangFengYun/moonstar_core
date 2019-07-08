import * as glMatrix from "gl-matrix";
import * as core from "../core";
import { RenderData } from "./render_data";
export declare class ParticleSystemData {
    psCore: core.ParticleSystem;
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    modelViewMatrix: glMatrix.mat4;
    renderData: RenderData;
    init(info: core.ParticleSystemInfo): void;
    private _initBuffers;
}
