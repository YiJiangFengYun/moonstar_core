import * as common from "../common";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";

export interface ParticleWithSubPlayer extends particleMod.Particle {
    subPLayerIndex?: number;
}

export class ModSubPlayerSimple extends Module {
    public static NAME = "subplayer_simple";

    public idlePlayerIndexs: number[] = [];
    public idlePlayerIndexCount: number = 0;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.name = ModSubPlayerSimple.NAME;
        player.on(particleMod.EVENT_CREATED_PARTICLE, this._onCreateParticle, this);
        player.on(particleMod.EVENT_DESTROYED_PARTICLE, this._onDestroyedParticle, this);
    }

    public init(info: any) {
        super.init(info);
    }

    public ready() {
        super.ready();
        let player = this.player;
        let subPlayerCount = player.playerCount;
        let idlePlayerIndexs = this.idlePlayerIndexs;
        idlePlayerIndexs.length = subPlayerCount;
        for (let i = 0; i < subPlayerCount; ++i) {
            idlePlayerIndexs[i] = i + 1;
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

    private _onCreateParticle(particle: ParticleWithSubPlayer) {
        let index = this._getIdlePlayer();
        if (index) {
            particle.subPLayerIndex = index;
            let subPlayer = this.player.players[index - 1];
            common.Vector.copy(subPlayer.origin, particle.pos);
            subPlayer.play();
        }
        
    }

    private _onDestroyedParticle(particle: ParticleWithSubPlayer) {
        let index = particle.subPLayerIndex;
        if (index) {
            this._freePlayer(index);
            particle.subPLayerIndex = 0;
            let subPlayer = this.player.players[index - 1];
            subPlayer.stop();
        }
    }
}