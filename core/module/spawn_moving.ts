import * as emitterPlayer from "../emitter_player";
import * as common from "../common";
import { Module } from "./module";

export class ModSpawnMoving extends Module {
    public static NAME = "spawn_moving";
    
    public interval: number = 0;

    private _lastEmitterPos: common.Vector = common.Vector.create();
    private _remainDis: number;

    private _vecHelper = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSpawnMoving.NAME;
    }

    public init(info: any) {
        super.init(info);
        this.interval = info.interval || 0;

        common.Vector.copy(this._lastEmitterPos, this.player.position);
        this._remainDis = 0;
    }

    public reset() {
        super.reset();
        common.Vector.copy(this._lastEmitterPos, this.player.position);
        this._remainDis = 0;
    }

    public update(dt: number) {
        let player = this.player;
        if (! player.emitted) {
            player.startEmit();
        }
        let interval = this.interval;
        if (interval) {
            let lastPos = this._lastEmitterPos;
            let nowPos = this.player.position;
            let vecHelper = this._vecHelper;
            common.Vector.sub(vecHelper, nowPos, lastPos);
            let dis = common.Vector.length(vecHelper);
            dis += this._remainDis;
            let pCount = Math.ceil(dis / interval);
            this._remainDis = (dis - interval) % interval;
            while (pCount > 0) {
                player.createParticle();
                --pCount;
            }

            common.Vector.copy(lastPos, nowPos);
        }
    }
}