import * as emitterPlayer from "../emitter_player";
import * as modulePart from "../module_part";
import { Module } from "./module";
export declare class ModSubPlayerAfterDestroy extends Module {
    static NAME: string;
    subPlayer: modulePart.SubPlayerManager;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    ready(): void;
    reset(): void;
    private _onDestroyedParticle;
    private _onSubPlayerComplete;
}
