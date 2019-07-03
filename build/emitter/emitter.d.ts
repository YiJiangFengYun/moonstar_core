import * as common from "../common";
import * as module from "../module";
import * as particle from "../particle";
export declare class Emitter extends common.Player implements module.IEmitter {
    particles: particle.Particle[];
    particleCount: number;
    modules: module.Module[];
    renderModule: module.ModRender;
    origin: common.Vector;
    rotation: common.Vector;
    useLocalSpace: boolean;
    private _maxParticleCount;
    constructor(maxParticleCount?: number);
    maxParticleCount: number;
    update(dt: number): void;
}
