import { Module } from "./module";
import { ModSprite } from "./sprite";
import { ModSpawn } from "./spawn";
import { ModSizeInitial } from "./size_initial";
import { ModVelocityConstant } from "./velocity_constant";
import { ModLifeTime } from "./life_time";
import { ModColorOverLife } from "./color_over_life";
import { ModLocationInitialCircle } from "./location_initial_circle";

export const mapModules: { [name: string]: typeof Module } = {};

// Render modules
mapModules[ModSprite.NAME] = ModSprite;

// Spawn modules
mapModules[ModSpawn.NAME] = ModSpawn;

// Initial modules.
mapModules[ModSizeInitial.NAME] = ModSizeInitial;
mapModules[ModLocationInitialCircle.NAME] = ModLocationInitialCircle;

// Constant modules.
mapModules[ModVelocityConstant.NAME] = ModVelocityConstant;

// Life time modules
mapModules[ModLifeTime.NAME] = ModLifeTime;

// Over Life modules
mapModules[ModColorOverLife.NAME] = ModColorOverLife;

export const moduleGroup = {
    sprite: [
        { module: ModSprite, required: true, default: true },
        { module: ModSpawn, required: true, default: true },
        { module: ModSizeInitial, required: false, default: true },
        { module: ModLocationInitialCircle, required: false, default: false},
        { module: ModLifeTime, required: false, default: true },
        { module: ModVelocityConstant, required: false, default: true },
        { module: ModColorOverLife, required: false, default: true },
    ],
    trail: [
        // { module: ModTrail, required: true, default: true },
        { module: ModSpawn, required: true, default: true },
        { module: ModSizeInitial, required: false, default: true },
        { module: ModLocationInitialCircle, required: false, default: true},
        { module: ModLifeTime, required: false, default: true },
        { module: ModVelocityConstant, required: false, default: true },
        { module: ModColorOverLife, required: false, default: true },
    ]
}

export const renderModules: typeof Module[] = [];

renderModules.push(ModSprite);