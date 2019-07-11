import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export class ModSubPlayerSimple extends Module {
    public static NAME = "subplayer_simple";

    public idlePlayerIndexs: number[] = [];
    public idlePlayerIndexCount: number = 0;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSubPlayerSimple.NAME;
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, this._onDestroyedParticle, this);
    }

    public init(info: any) {
        super.init(info);
    }

    public ready() {
        super.ready();
        this._prepareAllPlayer();
    }

    public reset() {
        super.reset();
        let player = this.player;
        let subPlayerCount = player.playerCount;
        let subPlayers = player.players;
        for (let i = 0; i < subPlayerCount; ++i) {
            subPlayers[i].stop();
        }
        this._prepareAllPlayer();
    }

    private _prepareAllPlayer() {
        let player = this.player;
        let subPlayerCount = player.playerCount;
        let idlePlayerIndexs = this.idlePlayerIndexs;
        idlePlayerIndexs.length = subPlayerCount;
        for (let i = 0; i < subPlayerCount; ++i) {
            idlePlayerIndexs[i] = i;
        }
        this.idlePlayerIndexCount = subPlayerCount;
    }

    private _getIdlePlayer() {
        let idleCount = this.idlePlayerIndexCount;
        if (idleCount) {
            idleCount -= 1;
            let idleIndexs = this.idlePlayerIndexs;
            let index = idleIndexs[idleCount];
            this.idlePlayerIndexCount = idleCount;
            return index;
        } else {
            return 0;
        }
    }

    private _freePlayer(index: number) {
        this.idlePlayerIndexs[this.idlePlayerIndexCount++] = index;
    }

    private _onDestroyedParticle(particle: particleMod.Particle) {
        let index = this._getIdlePlayer();
        if (index) {
            let subPlayer = this.player.players[index];
            subPlayer.on(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            common.Vector.copy(subPlayer.origin, particle.pos);
            subPlayer.play();
        }
        
    }

    private _onSubPlayerComplete(player: emitterPlayer.EmitterPlayer) {
        let players = this.player.players;
        let index = players.indexOf(player);
        if (index > 0) {
            this._freePlayer(index);
            let subPlayer = players[index];
            subPlayer.off(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.stop();
        }
    }
}