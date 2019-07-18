import * as core from "../core";
export declare class ParticleSystemData {
    psCore: core.ParticleSystem;
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    init(info: core.ParticleSystemInfo): void;
    changePos(pos: core.Vector): void;
    refreshBuffers(): void;
    private _initBuffers;
    private _refreshBuffers;
}
