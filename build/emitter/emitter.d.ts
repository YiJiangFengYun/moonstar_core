import { Material } from "../material/material";
import { Module, ModRender, IEmitter } from "../module/module";
import { Player } from "../common/player";
import { Particle } from "../particle/particle";
import { Vector } from "../common/vector";
export declare class Emitter extends Player implements IEmitter {
    material: Material;
    particles: Particle[];
    particleCount: number;
    modules: Module[];
    renderModule: ModRender;
    origin: Vector;
    rotation: Vector;
    useLocalSpace: boolean;
    private _maxParticleCount;
    constructor(maxParticleCount?: number, material?: Material);
    maxParticleCount: number;
    update(dt: number): void;
}
