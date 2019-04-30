import { ModSprite } from "./sprite";
import { ModSpawn } from "./spawn";
import { ModInitialSize } from "./initial_size";
import { ModInitialVelocity } from "./Initial_velocity";
import { ModLifeTime } from "./life_time";
import { ModColorOverLife } from "./color_over_life";
export declare var moduleGroup: {
    sprite: ({
        module: typeof ModSprite;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModSpawn;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModInitialSize;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModLifeTime;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModInitialVelocity;
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
        module: typeof ModInitialSize;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModLifeTime;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModInitialVelocity;
        required: boolean;
        default: boolean;
    } | {
        module: typeof ModColorOverLife;
        required: boolean;
        default: boolean;
    })[];
};
