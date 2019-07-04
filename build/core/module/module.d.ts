import * as common from "../common";
import * as material from "../material";
import * as particle from "../particle";
import * as render from "../render";
export interface IModule {
    init(): void;
    update(dt: number): void;
}
export interface IEmitter extends common.EventEmitter {
    particles: particle.Particle[];
    particleCount: number;
    modules: IModule[];
    maxParticleCount: number;
    origin: common.Vector;
    rotation: common.Vector;
    useLocalSpace: boolean;
}
export declare type ModuleType = {
    NAME: string;
};
export declare class Module implements IModule {
    name: string;
    owner: IEmitter;
    constructor(owner: IEmitter);
    init(): void;
    update(dt: number): void;
}
export interface ModRender {
    material: material.Material;
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number;
        lastIndexCount: number;
    }): void;
}
