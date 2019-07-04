import * as particle from "../particle";
import { IEmitter, Module } from "./module";
export interface ParticleWithLifeTime extends particle.Particle {
    time?: number;
    life?: number;
}
export declare class ModLifeTime extends Module {
    static NAME: string;
    life: number;
    constructor(owner: IEmitter);
    init(info: any): void;
    update(dt: number): void;
    private _deleteParticle;
    private _onCreateParticle;
}
