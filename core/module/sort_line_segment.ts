import * as common from "../common";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModSortLineSegment extends Module {
    public static NAME = "sort_line_segment";
    public source: common.Vector = common.Vector.create();
    public target: common.Vector = common.Vector.create();

    private _vector: common.Vector = common.Vector.create();

    private _changed: boolean;

    private _vecHelper1: common.Vector = common.Vector.create();
    private _vecHelper2: common.Vector = common.Vector.create();
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSortLineSegment.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onChangeParticle, this);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, this._onChangeParticle, this);
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

        let vector = this._vector;
        common.Vector.sub(vector, target, source);
        common.Vector.normalize(vector, vector);
    }

    public update(dt: number) {
        super.update(dt);

        if (this._changed) {
            //Resort particles
            let player = this.player;
            let particleCount = player.particleCount;
            let particles = player.particles;
            let source = this.source;
            let vector = this._vector;
            let aVector = this._vecHelper1;
            let bVector = this._vecHelper2;
            player.particles = particles.slice(0, particleCount).sort((a, b) => {
                let Vector = common.Vector;
                Vector.sub(aVector, a.pos, source);
                Vector.sub(bVector, b.pos, source);
                let aDot = Vector.dot(aVector, vector);
                let bDot = Vector.dot(bVector, vector);
                return aDot - bDot;
            }).concat(particles.slice(particleCount));
            this._changed = false;
        }
    }

    private _onChangeParticle() {
        this._changed = true;
    }
}