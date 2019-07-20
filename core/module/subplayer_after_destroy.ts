import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import * as modulePart from "../module_part";
import { Module } from "./module";

export class ModSubPlayerAfterDestroy extends Module {
    public static NAME = "subplayer_after_destroy";

    public subPlayer: modulePart.SubPlayerManager;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSubPlayerAfterDestroy.NAME;
        this.subPlayer = modulePart.createModulePart(modulePart.SubPlayerManager, player);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, this._onDestroyedParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.subPlayer.init(info);
    }

    public ready() {
        super.ready();
        this.subPlayer.ready();
    }

    public reset() {
        super.reset();
        this.subPlayer.reset();
    }

    private _onDestroyedParticle(particle: particleMod.Particle) {
        let index = this.subPlayer.usePlayer();
        if (index >= 0) {
            let subPlayer = this.player.players[index];
            subPlayer.on(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.setPosition(particle.pos);
            subPlayer.play();
        }
        
    }

    private _onSubPlayerComplete(player: emitterPlayer.EmitterPlayer) {
        let players = this.player.players;
        let index = players.indexOf(player);
        if (index >= 0) {
            this.subPlayer.freePlayer(index);
            let subPlayer = players[index];
            subPlayer.off(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.stop();
        }
    }
}