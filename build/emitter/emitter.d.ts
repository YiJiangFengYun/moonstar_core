import { Particle2D, Particle3D } from "../particle/particle";
import { Material } from "../material/material";
export interface Emitter {
    material: Material;
    maxParticleCount: number;
    update(dt: number): void;
}
export declare class Emitter2D implements Emitter {
    material: Material;
    particles: Particle2D[];
    private _maxParticleCount;
    constructor(material?: Material, maxParticleCount?: number);
    maxParticleCount: number;
    update(dt: number): void;
}
export declare class Emitter3D implements Emitter {
    material: Material;
    particles: Particle3D[];
    private _maxParticleCount;
    constructor(material?: Material, maxParticleCount?: number);
    maxParticleCount: number;
    update(dt: number): void;
}
