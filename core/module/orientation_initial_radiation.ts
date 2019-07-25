import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModOrientationInitialRadiation extends Module {
    public static NAME = "orientation_initial_radiation";

    public effectRotation: boolean;
    public vecHelper = common.Vector.create();

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.effectRotation = info.effectRotation || false;
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        let vecHelper = this.vecHelper;
        let origin = this.player.position;
        common.Vector.sub(vecHelper, particle.pos, origin);
        let angle: number;
        if (vecHelper[0]) {
            angle = Math.atan(vecHelper[1] / vecHelper[0]);
            if (vecHelper[0] < 0) {
                angle += Math.PI;
            }
        } else {
            if (vecHelper[1] > 0) {
                angle = Math.PI / 2;
            } else if (vecHelper[1] < 0) {
                angle = - Math.PI / 2;
            } else {
                angle = 0;
            }
        }
        particle.orientation = angle;
        if (this.effectRotation) {
            particle.rotation = angle;
        }
    }
}