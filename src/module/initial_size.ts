import { Module, IEmitter } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";
import { Particle } from "../particle/particle";

export class ModInitialSize extends Module {
    public static NAME = "initial_size";
    public size: number = 0;

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