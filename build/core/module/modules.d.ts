import * as emitterPlayer from "../emitter_player";
import { Module, ModuleStatic } from "./module";
export declare const mapModules: {
    [name: string]: typeof Module;
};
export declare const arrModules: (typeof Module)[];
export declare function registerModule(modType: typeof Module & ModuleStatic): void;
export declare function createModule(name: string, player: emitterPlayer.EmitterPlayer): Module;
export declare const renderModules: string[];
