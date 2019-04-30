import { Module, IEmitter } from "./module";
import { Particle } from "../particle/particle";
export interface ParticleSpecial extends Particle {
    time?: number;
    life?: number;
    color?: number;
}
export declare class ModColorOverLife extends Module {
    static NAME: string;
    beginColor: number;
    endColor: number;
    constructor(owner: IEmitter);
    init(): void;
    update(): void;
}
