import * as emitterPlayer from "../emitter_player";
import { Module } from "./module";
export declare class ModSubPlayerSimple extends Module {
    static NAME: string;
    idlePlayerIndexs: number[];
    idlePlayerIndexCount: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    ready(): void;
    private _getIdlePlayer;
    private _freePlayer;
    private _onDestroyedParticle;
    private _onSubPlayerComplete;
}
