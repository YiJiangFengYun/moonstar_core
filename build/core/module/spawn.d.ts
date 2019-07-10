import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSpawn extends Module {
    static NAME: string;
    interval: number;
    duration: number;
    private _remainTime;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(dt: number): void;
    private _createParticle;
}
