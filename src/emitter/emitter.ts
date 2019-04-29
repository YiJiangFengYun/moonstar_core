import { Material } from "../material/material";
import { Module, ModRender, IEmitter } from "../module/module";
import { Player } from "../common/player";
import { Particle } from "../particle/particle";
import { Vector } from "../common/vector";

const DEFAULT_MAX_PARTICLE_COUNT = 100;

export class Emitter extends Player implements IEmitter {
    public material: Material;
    public particles: Particle[] = [];
    public particleCount: number = 0;
    public modules: Module[] = [];
    public renderModule: ModRender;
    public delay: number = 0;
    public duration: number = 0;
    public origin: Vector = {};
    public rotation: Vector = {};
    public useLocalSpace: boolean;

    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;
    public constructor(maxParticleCount?: number, material?: Material) {
        super();
        this.material = material || new Material();
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
        super.update(dt);
        if (this.isPlay) {
            this.modules.forEach(module => {
                module.update(dt);
            });
        }
    }
}