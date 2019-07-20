import * as emitterPlayer from "../emitter_player";
import { ModulePart } from "./module_part";
export declare class SubPlayerManager implements ModulePart {
    player: emitterPlayer.EmitterPlayer;
    idlePlayerIndexs: number[];
    idlePlayerIndexCount: number;
    usedPlayerIndexs: number[];
    usedPlayerIndexCount: number;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    ready(): void;
    reset(): void;
    usePlayer(): number;
    freePlayer(index: number): void;
    private _prepareAllPlayer;
}
