import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSpawn extends Module {
    static NAME: string;
    interval: number;
    duration: number;
    delay: number;
    private _time;
    private _remainTime;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    reset(): void;
    update(dt: number): void;
}
