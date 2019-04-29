import { VertexFormat } from "../common/vertex";
import { EventEmitter } from "../common/event_emitter";
import { Material } from "../material/material";
import { Particle } from "../particle/particle";
import { Vector } from "../common/vector";

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
    delay: number;
    duration: number;
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

    fillVtxBuffer(buffer: ArrayBuffer, offset: number, vtxFormat: VertexFormat, vtxSize: number): void;

    fillIdxBuffer(buffer: ArrayBuffer, offset: number, idxOffset: number, idxSize: number): void;
}