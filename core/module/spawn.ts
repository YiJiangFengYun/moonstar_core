import * as particleMod from "../particle";
import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModSpawn extends Module {
    public static NAME = "spawn";
    public interval: number; //Unit(ms), from (1 / rate) * 1000;
    public duration: number;
    
    private _time: number = 0;
    private _remainTime: number = 0;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSpawn.NAME;
    }

    public init(info: any) {
        super.init(info);
        this._remainTime = 0;
        this.interval = info.rate > 0 ? 1 / info.rate : Number.MAX_VALUE;
        this.duration = info.duration > 0 ? info.duration : Number.MAX_VALUE;
        this._time = 0;
    }

    public update(dt: number) {
        let dt2 = Math.min(dt, this.duration - this._time);
        if (this.interval && dt2 > 0) {
            let interval = this.interval;
            dt2 = this._remainTime + dt2;
            let pCount = Math.ceil(dt2 / interval);
            this._remainTime = (dt2 - interval) % interval;
            while (pCount > 0) {
                this._createParticle();
                --pCount;
            }
        }
        this._time += dt;
    }

    private _createParticle(){
        let particle: particleMod.Particle;
        let emitter = this.player;
        if (emitter.particleCount < emitter.maxParticleCount) {
            particle = emitter.particles[emitter.particleCount];
            if (! particle) emitter.particles[emitter.particleCount] = 
                particle = { pos: common.Vector.create()};
            ++emitter.particleCount;
            common.Vector.set(particle.pos, 0, 0);
            emitter.emit(particleMod.EVENT_CREATED_PARTICLE, particle);
        }
    }
}