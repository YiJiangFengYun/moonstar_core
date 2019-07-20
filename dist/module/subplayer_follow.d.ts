import * as particleMod from "../particle";
import * as emitterPlayer from "../emitter_player";
import * as modulePart from "../module_part";
import { Module } from "./module";
export declare class ModSubPlayerFollow extends Module {
    static NAME: string;
    subPlayer: modulePart.SubPlayerManager;
    mapUsedSubPlayers: {
        [particleID: number]: emitterPlayer.EmitterPlayer;
    };
    mapUsedParticles: {
        [subPlayerID: number]: particleMod.Particle;
    };
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    ready(): void;
    reset(): void;
    update(dt: number): void;
    private _onCreatedParticle;
    private _onDestroyedParticle;
    private _onSubPlayerComplete;
}
