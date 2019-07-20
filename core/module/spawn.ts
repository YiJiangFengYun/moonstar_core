import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModSpawn extends Module {
    public static NAME = "spawn";
    public interval: number; //Unit(ms), from (1 / rate) * 1000;
    public duration: number;
    public delay: number;

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
        this.delay = info.delay || 0;
        this._time = 0;

    }

    public reset() {
        super.reset();
        this._time = 0;
        this._remainTime = 0;
    }

    public update(dt: number) {
        let delay = this.delay;
        let time = this._time;
        if (time >= delay) {

            let player = this.player;
            if (!player.emitted) {
                player.startEmit();
            }

            if (player.emitComplete) return;

            let dt2 = Math.min(dt, this.duration + delay - time);
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
            
            if (player.emitted && ! player.emitComplete && dt2 <= 0) {
                player.endEmit();
            }
        }
        this._time += dt;
    }
}