import { Module, IEmitter } from "./module";
import { Particle } from "../particle/particle";
import { Vector } from "../common/vector";
export interface ParticleWithVelocity extends Particle {
    velocity?: Vector;
}
export declare class ModInitialVelocity extends Module {
    static NAME: string;
    velocity: Vector;
    constructor(owner: IEmitter);
    init(): void;
    private _onCreateParticle;
}
