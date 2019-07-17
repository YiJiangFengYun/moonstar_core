import { Module } from "./module";
import { ModSprite } from "./sprite";
import { ModSpawn } from "./spawn";
import { ModSizeInitial } from "./size_initial";
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
import { ModLifeTimeInitialRandom } from "./life_time_initial_random";
import { ModVelocityInitialRandom } from "./velocity_initial_random";
import { ModVelocity } from "./velocity";
import { ModVelocityInitial } from "./velocity_initial";
import { ModRotation } from "./rotation";
import { ModRotationInitial } from "./rotation_initial";
import { ModRotationInitialRandom } from "./rotation_initial_random";
import { ModWidthInitial } from "./width_inital";
import { ModSpawnMoving } from "./spawn_moving";
import { ModRibbon } from "./ribbon";
import { ModLifeTimeInitial } from "./life_time_initial";
import { ModVelocityOverLife } from "./velocity_over_life";

export const mapModules: { [name: string]: typeof Module } = {};

// Render modules
mapModules[ModSprite.NAME] = ModSprite;
mapModules[ModRibbon.NAME] = ModRibbon;

// Spawn modules
mapModules[ModSpawn.NAME] = ModSpawn;
mapModules[ModSpawnMoving.NAME] = ModSpawnMoving;

// Velocity module
mapModules[ModVelocity.NAME] = ModVelocity;

// Rotation module
mapModules[ModRotation.NAME] = ModRotation;

// Initial modules.
mapModules[ModSizeInitial.NAME] = ModSizeInitial;
mapModules[ModLocationInitialCircle.NAME] = ModLocationInitialCircle;
mapModules[ModLocationInitialCircleBorder.NAME] = ModLocationInitialCircleBorder;
mapModules[ModLocationInitialRectangle.NAME] = ModLocationInitialRectangle;
mapModules[ModOrientationInitialRadiation.NAME] = ModOrientationInitialRadiation;
mapModules[ModSizeInitialRandom.NAME] = ModSizeInitialRandom;
mapModules[ModColorInitial.NAME] = ModColorInitial;
mapModules[ModColorInitialRandom.NAME] = ModColorInitialRandom;
mapModules[ModVelocityInitial.NAME] = ModVelocityInitial;
mapModules[ModVelocityInitialRandom.NAME] = ModVelocityInitialRandom;
mapModules[ModRotationInitial.NAME] = ModRotationInitial;
mapModules[ModRotationInitialRandom.NAME] = ModRotationInitialRandom;
mapModules[ModWidthInitial.NAME] = ModWidthInitial;
mapModules[ModLifeTimeInitial.NAME] = ModLifeTimeInitial;
mapModules[ModLifeTimeInitialRandom.NAME] = ModLifeTimeInitialRandom;

// Life time modules
mapModules[ModLifeTime.NAME] = ModLifeTime;

// Over Life modules
mapModules[ModColorOverLife.NAME] = ModColorOverLife;
mapModules[ModSizeOverLife.NAME] = ModSizeOverLife;
mapModules[ModVelocityOverLife.NAME] = ModVelocityOverLife;

//Sub UV modules
mapModules[ModSubUVSpriteSheetSimple.NAME] = ModSubUVSpriteSheetSimple;

//Sub player modules
mapModules[ModSubPlayerSimple.NAME] = ModSubPlayerSimple;

export const moduleGroup = {
    sprite: [
        { module: ModSprite, required: true, default: true },
        { module: ModSpawn, required: true, default: true },
        { module: ModVelocity, required: false, default: true },
        { module: ModSizeInitial, required: false, default: true },
        { module: ModLocationInitialCircle, required: false, default: false},
        { module: ModLifeTime, required: false, default: true },
        { module: ModColorOverLife, required: false, default: true },
    ],
    ribbon: [
        { module: ModRibbon, required: true, default: true },
        { module: ModSpawnMoving, required: true, default: true },
        { module: ModSpawn, required: false, default: false },
        { module: ModWidthInitial, required: true, default: true },
        { module: ModLifeTime, required: true, default: true },
        { module: ModVelocity, required: false, default: false },
        { module: ModColorOverLife, required: false, default: true },
    ]
}

export const renderModules: typeof Module[] = [];

renderModules.length = 2;
renderModules[0] = ModSprite;
renderModules[1] = ModRibbon;