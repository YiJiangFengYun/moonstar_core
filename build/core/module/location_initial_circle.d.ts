import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModLocationInitialCircle extends Module {
    static NAME: string;
    radius: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
