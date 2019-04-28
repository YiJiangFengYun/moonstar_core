import { Particle2D, Particle3D } from "../particle/particle";
import { Material } from "../material/material";

const DEFAULT_MAX_PARTICLE_COUNT = 100;

export interface Emitter {
    material: Material;
    maxParticleCount: number;
    update(dt: number): void;
}

export class Emitter2D implements Emitter {
    public material: Material;
    public particles: Particle2D[] = [];

    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;
    public constructor(material?: Material, maxParticleCount?: number) {
        this.material = material;
        this._maxParticleCount = maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
    }

    public get maxParticleCount() {
        return this._maxParticleCount;
    }

    public set maxParticleCount(value: number) {
        value = value || DEFAULT_MAX_PARTICLE_COUNT;
        this.particles.length = value;
        this._maxParticleCount = value;
    }

    public update(dt: number) {

    }
}

export class Emitter3D implements Emitter {
    public material: Material;
    public particles: Particle3D[] = [];

    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;
    public constructor(material?: Material, maxParticleCount?: number) {
        this.material = material;
        this._maxParticleCount = maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
    }

    public get maxParticleCount() {
        return this._maxParticleCount;
    }

    public set maxParticleCount(value: number) {
        value = value || DEFAULT_MAX_PARTICLE_COUNT;
        this.particles.length = value;
        this._maxParticleCount = value;
    }

    public update(dt: number) {
        
    }
}