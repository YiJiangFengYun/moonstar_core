import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModVelocityOverLife extends Module {
    static NAME: string;
    velocityBegin: common.Vector;
    velocityEnd: common.Vector;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    update(): void;
    private _onCreateParticle;
}
