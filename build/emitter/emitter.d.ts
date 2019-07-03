import * as common from "../common";
import * as material from "../material";
import * as module from "../module";
import * as particle from "../particle";
export declare class Emitter extends common.Player implements module.IEmitter {
    material: material.Material;
    particles: particle.Particle[];
    particleCount: number;
    modules: module.Module[];
    renderModule: module.ModRender;
    origin: common.Vector;
    rotation: common.Vector;
    useLocalSpace: boolean;
    private _maxParticleCount;
    constructor(maxParticleCount?: number, mtr?: material.Material);
    maxParticleCount: number;
    update(dt: number): void;
}
