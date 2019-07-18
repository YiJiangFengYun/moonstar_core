import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModLocationInitialLineSegment extends Module {
    public static NAME = "location_initial_line_segment";
    public source: common.Vector = common.Vector.create();
    public target: common.Vector = common.Vector.create();
    public bias: number = 0;

    private _vector: common.Vector = common.Vector.create();
    private _vecPerpendicular: common.Vector = common.Vector.create();

    private _vecHelper: common.Vector = common.Vector.create();
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModLocationInitialLineSegment.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        let source = this.source;
        let sourceConfig = info.source || common.VECTOR_ZERO;
        let target = this.target;
        let targetConfig = info.target || common.VECTOR_ZERO;
        source[0] = sourceConfig[0] || 0;
        source[1] = sourceConfig[1] || 0;
        target[0] = targetConfig[0] || 0;
        target[1] = targetConfig[1] || 0;
        this.bias = info.bias || 0;

        let vector = this._vector;
        common.Vector.sub(vector, target, source);
        let vecPerpendicular = this._vecPerpendicular;
        common.Vector.set(vecPerpendicular, - vector[1], vector[0]);
        common.Vector.normalize(vecPerpendicular, vecPerpendicular);
    }

    private _onCreateParticle(particle: particleMod.Particle) {
        let source = this.source;
        let bias = this.bias;
        let r = Math.random();
        let rBias = Math.random() * 2 - 1;
        let vecHelper = this._vecHelper;
        let vector = this._vector;
        let vecPerpendicular = this._vecPerpendicular;
        common.Vector.scaleAndAdd(vecHelper, source, vector, r);
        common.Vector.scaleAndAdd(vecHelper, vecHelper, vecPerpendicular, bias * rBias);
        let pos = this.player.position;
        let x = pos[0] + vecHelper[0];
        let y = pos[1] + vecHelper[1];
        if (particle.pos) {
            common.Vector.set(particle.pos, x, y);
        } else {
            particle.pos = common.Vector.fromValues(x, y);
        }
    }
}