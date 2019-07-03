import { Module, IEmitter } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";
import { Particle } from "../particle/particle";
import { Vector } from "../common/vector";

export class ModInitialSize extends Module {
    public static NAME = "initial_size";
    public size: Vector = {};

    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModInitialSize.NAME;
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init() {
    }

    private _onCreateParticle(particle: Particle) {
        particle.size = this.size;
    }
}