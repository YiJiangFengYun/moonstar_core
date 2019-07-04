import * as common from "../common";
import * as particle from "../particle";
import { Module, IEmitter } from "./module";
export interface ParticleSpecial extends particle.Particle {
    time?: number;
    life?: number;
}
export declare class ModColorOverLife extends Module {
    static NAME: string;
    beginColor: common.Color;
    endColor: common.Color;
    constructor(owner: IEmitter);
    init(info: any): void;
    update(): void;
}
