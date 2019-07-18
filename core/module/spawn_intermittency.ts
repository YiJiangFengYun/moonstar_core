import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModSpawnIntermittency extends Module {
    public static NAME = "spawn_intermittency";
    public delay: number; // Delay to start perioding and spawning
    public duration: number; // Total duration.
    public period: number; // Period for emitter (player) time, uint is s.
    public durationPerPeriod: number; //Spawn duration per period.
    public interval: number; //Unit(ms), from (1 / rate) * 1000;

    private _time: number = 0;
    private _remainTime: number = 0;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSpawnIntermittency.NAME;
    }

    public init(info: any) {
        super.init(info);
        this.delay = info.delay || 0;
        this.duration = info.duration > 0 ? info.duration : Number.MAX_VALUE;
        let period = info.period > 0 ? info.period : Number.MAX_VALUE;
        this.period = period;
        let durationPerPeriod = info.durationPerPeriod > 0 ? info.durationPerPeriod : Number.MAX_VALUE;
        this.durationPerPeriod = Math.min(durationPerPeriod, period);
        this.interval = info.rate > 0 ? 1 / info.rate : Number.MAX_VALUE;

        this._remainTime = 0;
        this._time = 0;

    }

    public reset() {
        super.reset();
        this._remainTime = 0;
        this._time = 0;
    }

    public update(dt: number) {
        let delay = this.delay;
        let time = this._time;
        if (time > delay) {
            let player = this.player;
            if (!player.emitted) {
                player.startEmit();
            }
            time = time - delay;
            if (time < this.duration) {
                time = time % this.period;
                let dt2 = Math.min(dt, this.durationPerPeriod - time);
                if (dt2 > 0) {
                    let interval = this.interval;
                    dt2 = this._remainTime + dt2;
                    let pCount = Math.ceil(dt2 / interval);
                    this._remainTime = dt2 % interval;
                    if (this._remainTime > 0) this._remainTime -= interval;
                    while (pCount > 0) {
                        player.createParticle();
                        --pCount;
                    }
                }
            } else {
                if (player.emitted && ! player.emitComplete) {
                    this.player.endEmit();
                }
            }
        }
        this._time += dt;
    }
}