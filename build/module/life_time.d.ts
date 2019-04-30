import { IEmitter, Module } from "./module";
import { Particle } from "../particle/particle";
export interface ParticleWithLifeTime extends Particle {
    time?: number;
    life?: number;
}
export declare class ModLifeTime extends Module {
    static NAME: string;
    life: number;
    constructor(owner: IEmitter);
    init(): void;
    update(dt: number): void;
    private _deleteParticle;
    private _onCreateParticle;
}
