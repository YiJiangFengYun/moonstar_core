import * as common from "../common";
import * as material from "../material";
import * as particle from "../particle";
import * as render from "../render";
export interface IModule {
    init(info: any): void;
    update(dt: number): void;
}
export interface IEmitter extends common.EventEmitter {
    particles: particle.Particle[];
    particleCount: number;
    modules: IModule[];
    maxParticleCount: number;
    origin: common.Vector;
    /**
     * rotation (Radian)
     */
    rotation: number;
    useLocalSpace: boolean;
    time: number;
}
export declare type ModuleType = {
    NAME: string;
};
export declare class Module implements IModule {
    name: string;
    owner: IEmitter;
    private _id;
    constructor(owner: IEmitter);
    readonly id: number;
    init(info: any): void;
    update(dt: number): void;
}
export interface ModRender {
    material: material.Material;
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    getMaxVtxCount(): number;
    getMaxIdxCount(): number;
    fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number;
        lastIndexCount: number;
    }): void;
}
