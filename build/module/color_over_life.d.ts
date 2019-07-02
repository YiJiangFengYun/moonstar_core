import { Module, IEmitter } from "./module";
import { Particle } from "../particle/particle";
import { Color } from "../common/color";
export interface ParticleSpecial extends Particle {
    time?: number;
    life?: number;
}
export declare class ModColorOverLife extends Module {
    static NAME: string;
    beginColor: Color;
    endColor: Color;
    constructor(owner: IEmitter);
    init(): void;
    update(): void;
}
