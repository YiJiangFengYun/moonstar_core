/// <reference types="gl-matrix" />
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModOrientationInitialRadiation extends Module {
    static NAME: string;
    effectRotation: boolean;
    vecHelper: import("gl-matrix").vec2;
    constructor(owner: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    private _onCreateParticle;
}
