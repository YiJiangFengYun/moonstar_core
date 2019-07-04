import { Module } from "./module";
import { ModSprite } from "./sprite";
import { ModSpawn } from "./spawn";
import { ModSizeConstant } from "./size_constant";
import { ModVelocityConstant } from "./velocity_constant";
import { ModLifeTime } from "./life_time";
import { ModColorOverLife } from "./color_over_life";
export declare const mapModules: {
    [name: string]: typeof Module;
};
export declare const moduleGroup: {
    sprite: ({
        module: typeof ModSprite;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModSpawn;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModSizeConstant;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModLifeTime;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModVelocityConstant;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModColorOverLife;
        required: boolean;
        default: boolean;
    })[];
    trail: ({
        module: typeof ModSpawn;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModSizeConstant;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModLifeTime;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModVelocityConstant;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModColorOverLife;
        required: boolean;
        default: boolean;
    })[];
};
export declare const renderModules: typeof Module[];
