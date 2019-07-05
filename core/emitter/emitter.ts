import * as log from "loglevel";
import * as common from "../common";
import * as module from "../module";
import * as particle from "../particle";

const DEFAULT_MAX_PARTICLE_COUNT = 100;

export interface EmitterInfo {
    maxParticleCount?: number;
    modules?: ( {
        name: string;
    } | any)[];
}

export class Emitter extends common.Player implements module.IEmitter {
    public particles: particle.Particle[] = [];
    public particleCount: number = 0;
    public modules: module.Module[] = [];
    public renderModule: module.ModRender;
    public origin: common.Vector = common.Vector.create();
    public rotation: common.Vector = common.Vector.create();
    public useLocalSpace: boolean;

    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;

    private _id: number;
    public constructor() {
        super();
        this._id = common.gainID();
    }

    public get id() {
        return this._id;
    }

    public init(info: EmitterInfo) {
        this.maxParticleCount = info.maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
        let modules = this.modules;
        let newModCount = info.modules ? info.modules.length : 0;
        modules.length = newModCount;
        for (let i = 0; i < newModCount; ++i) {
            let moduleClass = module.mapModules[info.modules[i].name];
            if (! moduleClass) throw new Error(`The module ${info.modules[i].name} is invalid.`);
            modules[i] = new moduleClass(this);
            modules[i].init(info.modules[i]);
            if (module.renderModules.indexOf(moduleClass) > 0) {
                if (this.renderModule) {
                    log.warn(`There multiple render modules applied to the emitter.`);
                }
                this.renderModule = modules[i] as any as module.ModRender;
            }
        }
        this.stop();
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

    public stop() {
        super.stop();
        this.particleCount = 0;
    }
}