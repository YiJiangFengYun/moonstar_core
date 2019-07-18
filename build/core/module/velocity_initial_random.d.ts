import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModVelocityInitialRandom extends Module {
    static NAME: string;
    velocityMin: common.Vector;
    velocityMax: common.Vector;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
