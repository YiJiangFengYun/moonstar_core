import * as log from "loglevel";
import * as emitterPlayer from "../emitter_player";
import { ModulePart } from "./module_part";

export class SubPlayerManager implements ModulePart {
    public player: emitterPlayer.EmitterPlayer;
    public idlePlayerIndexs: number[] = [];
    public idlePlayerIndexCount: number = 0;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        this.player = player;
    }

    public init(info: any) {
    }

    public ready() {
        this._prepareAllPlayer();
    }

    public reset() {
        let player = this.player;
        let subPlayerCount = player.playerCount;
        let subPlayers = player.players;
        for (let i = 0; i < subPlayerCount; ++i) {
            subPlayers[i].stop();
        }
        this._prepareAllPlayer();
    }

    public getIdlePlayer() {
        let idleCount = this.idlePlayerIndexCount;
        if (idleCount) {
            idleCount -= 1;
            let idleIndexs = this.idlePlayerIndexs;
            let index = idleIndexs[idleCount];
            this.idlePlayerIndexCount = idleCount;
            let player = this.player.players[index];
            if (player.isPlay) {
                log.warn(`Subplayer manager: the player allocated is not idle, it is playing.`);
            }
            return index;
        } else {
            return null;
        }
    }

    public freePlayer(index: number) {
        let player = this.player.players[index];
        if (player.isPlay) {
            log.warn(`Subplayer manager: the player deallocated is still playing.`);
        }
        this.idlePlayerIndexs[this.idlePlayerIndexCount++] = index;
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
}