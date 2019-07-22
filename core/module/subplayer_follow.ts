import * as log from "loglevel";
import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import * as modulePart from "../module_part";
import { Module } from "./module";

export class ModSubPlayerFollow extends Module {
    public static NAME = "subplayer_follow";

    public subPlayer: modulePart.SubPlayerManager;

    public mapUsedSubPlayers: { [particleID: number]: emitterPlayer.EmitterPlayer };
    public mapUsedParticles: { [subPlayerID: number]: particleMod.Particle };

    public constructor(player: emitterPlayer.EmitterPlayer) {
        super(player);
        this.subPlayer = modulePart.createModulePart(modulePart.SubPlayerManager, player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, this._onCreatedParticle, this);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, this._onDestroyedParticle, this);
    }

    public init(info: any) {
        super.init(info);
        this.subPlayer.init(info);
    }

    public ready() {
        super.ready();
        this.subPlayer.ready();
        this.mapUsedSubPlayers = {};
        this.mapUsedParticles = {};
    }

    public reset() {
        super.reset();
        this.subPlayer.reset();
        this.mapUsedSubPlayers = {};
        this.mapUsedParticles = {};
    }

    public update(dt: number) {
        super.update(dt);
        let subplayerManager = this.subPlayer;
        let usedPlayers = subplayerManager.usedPlayerIndexs;
        let usedPlayerCount = subplayerManager.usedPlayerIndexCount;
        let subPlayers = this.player.players;
        let mapUsedParticles = this.mapUsedParticles;
        for (let i = 0; i < usedPlayerCount; ++i) {
            let index = usedPlayers[i];
            let player = subPlayers[index];
            let particle = mapUsedParticles[player.id];
            player.setPosition(particle.pos);
        }
    }
    

    private _onCreatedParticle(particle: particleMod.Particle) {
        let index = this.subPlayer.usePlayer();
        if (typeof index === "number") {
            let subPlayer = this.player.players[index];
            subPlayer.on(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.setPosition(particle.pos);
            subPlayer.play();
            if (this.mapUsedSubPlayers[particle.id]) {
                log.error(`Repeatly allocate a subplayer to the same particle.`);
            }
            this.mapUsedSubPlayers[particle.id] = subPlayer;
            this.mapUsedParticles[subPlayer.id] = particle;
        }
    }

    private _onDestroyedParticle(particle: particleMod.Particle) {
        let player = this.mapUsedSubPlayers[particle.id];
        if (player) {
            player.endEmit();
        }
    }

    private _onSubPlayerComplete(player: emitterPlayer.EmitterPlayer) {
        let players = this.player.players;
        let index = players.indexOf(player);
        if (index >= 0) {
            let subPlayer = players[index];
            subPlayer.off(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.stop();
            this.subPlayer.freePlayer(index);
            let particle = this.mapUsedParticles[player.id];
            this.mapUsedSubPlayers[particle.id] = null;
            this.mapUsedParticles[player.id] = null;
        }
    }
}