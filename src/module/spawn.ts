import { Module, IEmitter } from "./module";
import { Particle } from "../particle/particle";

export class ModSpawn extends Module {
    public interval: number; //Unit(ms), from (1 / rate) * 1000;
    private _remainTime: number = 0;
    public constructor(owner: IEmitter) {
        super(owner);
    }

    public init() {
        this._remainTime = 0;
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

    private _createParticle(): Particle {
        let particle: Particle = {pos: {}};
        let emitter = this.owner;
        if (emitter.particleCount < emitter.maxParticleCount) {
            emitter.particles[emitter.particleCount++] = particle;
        }
        return particle;
    }
}