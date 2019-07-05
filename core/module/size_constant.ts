import * as common from "../common";
import * as particle from "../particle";
import { Module, IEmitter } from "./module";
import { EVENT_CREATE_PARTICLE } from "./spawn";

export class ModSizeConstant extends Module {
    public static NAME = "initial_size";
    public size: common.Vector = common.Vector.create();

    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModSizeConstant.NAME;
        owner.on(EVENT_CREATE_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let size = this.size;
        size[0] = info.width || 0;
        size[1] = info.height || 0;
    }

    private _onCreateParticle(particle: particle.Particle) {
        if (particle.size) {
            common.Vector.copy(particle.size, this.size);
        } else {
            particle.size = common.Vector.clone(this.size);
        }
    }
}