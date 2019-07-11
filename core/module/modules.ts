import { Module } from "./module";
import { ModSprite } from "./sprite";
import { ModSpawn } from "./spawn";
import { ModSizeInitial } from "./size_initial";
import { ModVelocityConstant } from "./velocity_constant";
import { ModLifeTime } from "./life_time";
import { ModColorOverLife } from "./color_over_life";
import { ModLocationInitialCircle } from "./location_initial_circle";
import { ModOrientationInitialRadiation } from "./orientation_initial_radiation";
import { ModSubUVSpriteSheetSimple } from "./subuv_spritesheet_simple";
import { ModSubPlayerSimple } from "./subplayer_simple";
import { ModSizeInitialRandom } from "./size_initial_random";

export const mapModules: { [name: string]: typeof Module } = {};

// Render modules
mapModules[ModSprite.NAME] = ModSprite;

// Spawn modules
mapModules[ModSpawn.NAME] = ModSpawn;

// Initial modules.
mapModules[ModSizeInitial.NAME] = ModSizeInitial;
mapModules[ModLocationInitialCircle.NAME] = ModLocationInitialCircle;
mapModules[ModOrientationInitialRadiation.NAME] = ModOrientationInitialRadiation;
mapModules[ModSizeInitialRandom.NAME] = ModSizeInitialRandom;

// Constant modules.
mapModules[ModVelocityConstant.NAME] = ModVelocityConstant;

// Life time modules
mapModules[ModLifeTime.NAME] = ModLifeTime;

// Over Life modules
mapModules[ModColorOverLife.NAME] = ModColorOverLife;

//Sub UV modules
mapModules[ModSubUVSpriteSheetSimple.NAME] = ModSubUVSpriteSheetSimple;

//Sub player modules
mapModules[ModSubPlayerSimple.NAME] = ModSubPlayerSimple;

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