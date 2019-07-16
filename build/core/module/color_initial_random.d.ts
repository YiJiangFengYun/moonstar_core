import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModColorInitialRandom extends Module {
    static NAME: string;
    colorMin: common.Color;
    colorMax: common.Color;
    channelSame: boolean;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
