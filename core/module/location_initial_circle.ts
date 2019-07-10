import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModLocationInitialCircle extends Module {
    public static NAME = "location_initial_circle";
    public radius: number = 0;

    public constructor(owner: emitterPlayer.EmitterPlayer) {
        super(owner);
        this.name = ModLocationInitialCircle.NAME;
        owner.on(particleMod.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.radius = info.radius || 0;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        let randomR = Math.random() * this.radius;
        let randomAngle = Math.random() * 2 * Math.PI;
        if (particle.pos) {
            common.Vector.set(particle.pos, Math.cos(randomAngle) * randomR, Math.sin(randomAngle) * randomR);
        } else {
            particle.pos = common.Vector.fromValues(Math.cos(randomAngle) * randomR, Math.sin(randomAngle) * randomR);
        }
    }
}