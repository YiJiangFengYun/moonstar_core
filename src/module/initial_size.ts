import * as common from "../common";
import * as particle from "../particle";
import { Module, IEmitter } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";

export class ModInitialSize extends Module {
    public static NAME = "initial_size";
    public size: common.Vector = {};

    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModInitialSize.NAME;
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init() {
    }

    private _onCreateParticle(particle: particle.Particle) {
        particle.size = this.size;
    }
}