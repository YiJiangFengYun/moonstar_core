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
import { ModLocationInitialCircleBorder } from "./location_initial_circle_border";
import { ModLocationInitialRectangle } from "./location_initial_rectangle";
import { ModSizeOverLife } from "./size_over_life";
import { ModColorInitial } from "./color_initial";
import { ModColorInitialRandom } from "./color_initial_random";
import { ModLifeTimeRandom } from "./life_time_random";

export const mapModules: { [name: string]: typeof Module } = {};

// Render modules
mapModules[ModSprite.NAME] = ModSprite;

// Spawn modules
mapModules[ModSpawn.NAME] = ModSpawn;

// Initial modules.
mapModules[ModSizeInitial.NAME] = ModSizeInitial;
mapModules[ModLocationInitialCircle.NAME] = ModLocationInitialCircle;
mapModules[ModLocationInitialCircleBorder.NAME] = ModLocationInitialCircleBorder;
mapModules[ModLocationInitialRectangle.NAME] = ModLocationInitialRectangle;
mapModules[ModOrientationInitialRadiation.NAME] = ModOrientationInitialRadiation;
mapModules[ModSizeInitialRandom.NAME] = ModSizeInitialRandom;
mapModules[ModColorInitial.NAME] = ModColorInitial;
mapModules[ModColorInitialRandom.NAME] = ModColorInitialRandom;

// Constant modules.
mapModules[ModVelocityConstant.NAME] = ModVelocityConstant;

// Life time modules
mapModules[ModLifeTime.NAME] = ModLifeTime;
mapModules[ModLifeTimeRandom.NAME] = ModLifeTimeRandom;

// Over Life modules
mapModules[ModColorOverLife.NAME] = ModColorOverLife;
mapModules[ModSizeOverLife.NAME] = ModSizeOverLife;

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