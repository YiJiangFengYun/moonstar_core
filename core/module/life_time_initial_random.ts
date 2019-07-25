import * as emitterPlayer from "../emitter_player"
import { Module } from "./module";
import { ParticleWithLifeTime } from "./life_time";

export class ModLifeTimeInitialRandom extends Module {
    public static NAME = "life_time_initial_random";
    public lifeMin: number; //Uint(s)
    public lifeMax: number; //Unit(s)

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.lifeMin = info.lifeMin || 0;
        this.lifeMax = info.lifeMax || Number.MAX_VALUE;
    }

    private _onCreateParticle(particle: ParticleWithLifeTime) {
        particle.lifeTime = this.lifeMin + (this.lifeMax - this.lifeMin) * Math.random();
        particle.time = 0;
        particle.life = 0;
    }
}