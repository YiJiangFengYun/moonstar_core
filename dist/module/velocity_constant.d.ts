import * as common from "../common";
import * as particle from "../particle";
import { Module, IEmitter } from "./module";
export interface ParticleWithVelocity extends particle.Particle {
    velocity?: common.Vector;
}
export declare class ModVelocityConstant extends Module {
    static NAME: string;
    velocity: common.Vector;
    private _vecHelper;
    constructor(owner: IEmitter);
    init(info: any): void;
    update(dt: number): void;
    private _onCreateParticle;
}
