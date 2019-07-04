import { Module } from "./module";
import { ModSprite } from "./sprite";
import { ModSpawn } from "./spawn";
import { ModInitialSize } from "./initial_size";
import { ModInitialVelocity } from "./Initial_velocity";
import { ModLifeTime } from "./life_time";
import { ModColorOverLife } from "./color_over_life";

export const mapModules: { [name: string]: typeof Module } = {};

// Render modules
mapModules[ModSprite.NAME] = ModSprite;

// Spawn modules
mapModules[ModSpawn.NAME] = ModSpawn;

// Initialize modules.
mapModules[ModInitialSize.NAME] = ModInitialSize;
mapModules[ModInitialVelocity.NAME] = ModInitialVelocity;

// Life time modules
mapModules[ModLifeTime.NAME] = ModLifeTime;

// Over Life modules
mapModules[ModColorOverLife.NAME] = ModColorOverLife;

export const moduleGroup = {
    sprite: [
        { module: ModSprite, required: true, default: true },
        { module: ModSpawn, required: true, default: true },
        { module: ModInitialSize, required: false, default: true },
        { module: ModLifeTime, required: false, default: true },
        { module: ModInitialVelocity, required: false, default: true },
        { module: ModColorOverLife, required: false, default: true },
    ],
    trail: [
        // { module: ModTrail, required: true, default: true },
        { module: ModSpawn, required: true, default: true },
        { module: ModInitialSize, required: false, default: true },
        { module: ModLifeTime, required: false, default: true },
        { module: ModInitialVelocity, required: false, default: true },
        { module: ModColorOverLife, required: false, default: true },
    ]
}

export const renderModules: typeof Module[] = [];

renderModules.push(ModSprite);