import { EventEmitter } from "../common/event_emitter";
import { Material } from "../material/material";
import { Particle } from "../particle/particle";
import { Vector } from "../common/vector";
import { DrawData } from "../render/draw_data";

export interface IModule {
    init(): void;
    update(dt: number): void;
}

export interface IEmitter extends EventEmitter {
    material: Material;
    particles: Particle[];
    particleCount: number;
    modules: IModule[];
    maxParticleCount: number;
    origin: Vector;
    rotation: Vector;
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

    public init(): void {

    }

    public update(dt: number):void {

    }

    
}

export interface ModRender {

    getTotalVtxCount(): number;

    getTotalIdxCount(): number;

    fillBuffers(drawData: DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number; //used as idxValueOffset
    }): void;
}