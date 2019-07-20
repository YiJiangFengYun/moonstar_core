import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSpawnIntermittency extends Module {
    static NAME: string;
    delay: number;
    duration: number;
    period: number;
    durationPerPeriod: number;
    interval: number;
    private _time;
    private _remainTime;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    reset(): void;
    update(dt: number): void;
}
