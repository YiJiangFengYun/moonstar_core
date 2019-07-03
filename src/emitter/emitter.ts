import * as common from "../common";
import * as module from "../module";
import * as particle from "../particle";

const DEFAULT_MAX_PARTICLE_COUNT = 100;

export class Emitter extends common.Player implements module.IEmitter {
    public particles: particle.Particle[] = [];
    public particleCount: number = 0;
    public modules: module.Module[] = [];
    public renderModule: module.ModRender;
    public origin: common.Vector = { x: 0, y: 0 };
    public rotation: common.Vector = { x: 0, y: 0 };
    public useLocalSpace: boolean;

    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;
    public constructor(maxParticleCount?: number) {
        super();
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
            this.modules.forEach(mod => {
                mod.update(dt);
            });
        }
    }
}