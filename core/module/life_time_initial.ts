import * as emitterPlayer from "../emitter_player"
import { Module } from "./module";
import { ParticleWithLifeTime } from "./life_time";

export class ModLifeTimeInitial extends Module {
    public static NAME = "life_time_initial";
    public life: number; //Unit(s)

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModLifeTimeInitial.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.life = info.life;
    }

    private _onCreateParticle(particle: ParticleWithLifeTime) {
        particle.lifeTime = this.life;
        particle.time = 0;
        particle.life = 0;
    }
}