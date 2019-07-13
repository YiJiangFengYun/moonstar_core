import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModLocationInitialRectangle extends Module {
    static NAME: string;
    width: number;
    height: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
