/// <reference types="gl-matrix" />
import { Module, IEmitter } from "./module";
export declare class ModOrientationInitialRadiation extends Module {
    static NAME: string;
    effectRotation: boolean;
    vecHelper: import("gl-matrix").vec2;
    constructor(owner: IEmitter);
    init(info: any): void;
    private _onCreateParticle;
}
