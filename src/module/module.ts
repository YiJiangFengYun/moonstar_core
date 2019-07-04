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
    rotation: common.Vector;
    useLocalSpace: boolean;
}

export type ModuleType = {
    NAME: string;
}

export class Module implements IModule {
    public name: string;
    public owner: IEmitter;
    public constructor(owner: IEmitter) {
        this.owner = owner;
    }

    public init(info: any): void {

    }

    public update(dt: number):void {

    }

    
}

export interface ModRender {
    material: material.Material;

    getTotalVtxCount(): number;

    getTotalIdxCount(): number;

    fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number; //used as idxValueOffset
        lastIndexCount: number; // used as index offset of cmd.
    }): void;
}