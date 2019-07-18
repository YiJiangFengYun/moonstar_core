import { Module } from "./module";
import { ModLifeTime } from "./life_time";
export declare const mapModules: {
    [name: string]: typeof Module;
};
export declare const moduleGroup: {
    sprite: {
        module: typeof ModLifeTime;
        required: boolean;
        default: boolean;
    }[];
    ribbon: {
        module: typeof ModLifeTime;
        required: boolean;
        default: boolean;
    }[];
};
export declare const renderModules: typeof Module[];
