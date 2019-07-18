import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModVelocityInitialVary extends Module {
    static NAME: string;
    velocityBegin: common.Vector;
    velocityEnd: common.Vector;
    period: number;
    /**
     * Use trigonometric to smooth.
     */
    trigSmooth: boolean;
    private _velocityHelper;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
