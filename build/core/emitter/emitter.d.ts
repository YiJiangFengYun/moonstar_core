import * as common from "../common";
import * as module from "../module";
import * as particle from "../particle";
export interface EmitterInfo {
    maxParticleCount?: number;
    modules?: ({
        name: string;
    } | any)[];
}
export declare class Emitter extends common.Player implements module.IEmitter {
    particles: particle.Particle[];
    particleCount: number;
    modules: module.Module[];
    renderModule: module.ModRender;
    origin: common.Vector;
    rotation: common.Vector;
    useLocalSpace: boolean;
    private _maxParticleCount;
    constructor();
    init(info: EmitterInfo): void;
    maxParticleCount: number;
    update(dt: number): void;
    stop(): void;
}
