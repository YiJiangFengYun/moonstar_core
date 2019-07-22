import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModLocationInitialRectangle extends Module {
    public static NAME = "location_initial_rectangle";
    public width: number = 0;
    public height: number = 0;

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.width = info.width || 0;
        this.height = info.height || 0;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        let width = this.width;
        let height = this.height;
        let pos = this.player.position;
        let x = pos[0] + Math.random() * width - width / 2;
        let y = pos[1] + Math.random() * height - height / 2;
        if (particle.pos) {
            common.Vector.set(particle.pos, x, y);
        } else {
            particle.pos = common.Vector.fromValues(x, y);
        }
    }
}