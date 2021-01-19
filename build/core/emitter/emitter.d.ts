import * as module from "../module";
import * as emitter_player from "../emitter_player";
import * as psData from "../ps_data";
export interface EmitterInfo extends emitter_player.EmitterPlayerInfo {
    name?: string;
    parent?: string;
    modules?: ({
        name: string;
    } | any)[];
}
export declare class Emitter {
    name: string;
    player: emitter_player.EmitterPlayer;
    modules: module.Module[];
    mapModules: {
        [name: string]: module.Module;
    };
    renderModule: module.ModRender;
    private _id;
    constructor(psData: psData.PSData);
    get id(): number;
    init(info: EmitterInfo): void;
    ready(): void;
    update(dt: number): void;
    play(): void;
    stop(): void;
    reset(): void;
    getModule<T>(type: {
        prototype: T;
    }): T;
}
