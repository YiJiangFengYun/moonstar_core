import { VertexFormat } from "../common/vertex";
import { Material } from "../material/material";
import { Particle } from "../particle/particle";
import { Vector } from "../common/vector";

export interface IModule {
    init(): void;
    update(dt: number): void;
}

export interface IEmitter {
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

export class Module implements IModule {
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