import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModLocationInitialCircleBorder extends Module {
    public static NAME = "location_initial_circle_border";
    public radius: number = 0;

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModLocationInitialCircleBorder.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.radius = info.radius || 0;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        let r = this.radius;
        let randomAngle = Math.random() * 2 * Math.PI;
        let pos = this.player.position;
        if (particle.pos) {
            common.Vector.set(
                particle.pos, 
                pos[0] + Math.cos(randomAngle) * r, 
                pos[1] + Math.sin(randomAngle) * r,
            );
        } else {
            particle.pos = common.Vector.fromValues(
                pos[0] + Math.cos(randomAngle) * r, 
                pos[1] + Math.sin(randomAngle) * r,
            );
        }
    }
}