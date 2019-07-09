import { Module } from "./module";
import { ModSprite } from "./sprite";
import { ModSpawn } from "./spawn";
import { ModSizeInitial } from "./size_initial";
import { ModVelocityConstant } from "./velocity_constant";
import { ModLifeTime } from "./life_time";
import { ModColorOverLife } from "./color_over_life";
import { ModLocationInitialCircle } from "./location_initial_circle";
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
        module: typeof ModSizeInitial;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModLocationInitialCircle;
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
        module: typeof ModSizeInitial;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModLocationInitialCircle;
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
