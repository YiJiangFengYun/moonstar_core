import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSpawnMoving extends Module {
    static NAME: string;
    interval: number;
    private _lastEmitterPos;
    private _remainDis;
    private _vecHelper;
    private _vecHelper2;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    reset(): void;
    update(dt: number): void;
}
