import * as particle from "../particle";
import * as common from "../common";
import { Module, IEmitter } from "./module";

export const EVENT_CREATE_PARTICLE = "create_particle";

export class ModSpawn extends Module {
    public static NAME = "spawn";
    public interval: number; //Unit(ms), from (1 / rate) * 1000;
    private _remainTime: number = 0;
    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModSpawn.NAME;
    }

    public init(info: any) {
        super.init(info);
        this._remainTime = 0;
        this.interval = info.rate > 0 ? 1 / info.rate : Number.MAX_VALUE;
    }

    public update(dt: number) {
        if (this.interval) {
            let interval = this.interval;
            dt = this._remainTime + dt;
            let pCount = Math.floor(dt / interval);
            this._remainTime = dt % interval;
            while (pCount > 0) {
                this._createParticle();
                --pCount;
            }
        }
    }

    private _createParticle(){
        let particle: particle.Particle;
        let emitter = this.owner;
        if (emitter.particleCount < emitter.maxParticleCount) {
            particle = emitter.particles[emitter.particleCount];
            if (! particle) emitter.particles[emitter.particleCount] = 
                particle = { pos: common.Vector.create()};
            ++emitter.particleCount;
            common.Vector.set(particle.pos, 0, 0);
            emitter.emit(EVENT_CREATE_PARTICLE, particle);
        }
    }
}