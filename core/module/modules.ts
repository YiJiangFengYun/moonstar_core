import * as emitterPlayer from "../emitter_player";
import { Module, ModuleStatic } from "./module";
import { ModSprite } from "./sprite";
import { ModSpawn } from "./spawn";
import { ModSizeInitial } from "./size_initial";
import { ModLifeTime } from "./life_time";
import { ModColorOverLife } from "./color_over_life";
import { ModLocationInitialCircle } from "./location_initial_circle";
import { ModOrientationInitialRadiation } from "./orientation_initial_radiation";
import { ModSubUVSpriteSheetSimple } from "./subuv_spritesheet_simple";
import { ModSubPlayerAfterDestroy } from "./subplayer_after_destroy";
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
import { ModVelocityInitialVary } from "./velocity_initial_vary";
import { ModSpawnIntermittency } from "./spawn_intermittency";
import { ModLocationInitialLineSegment } from "./location_initial_line_segment";
import { ModSortLineSegment } from "./sort_line_segment";
import { ModSpriteConnected } from "./sprite_connected";
import { ModSubPlayerFollow } from "./subplayer_follow";

export const mapModules: { [name: string]: typeof Module } = {};
export const arrModules: (typeof Module)[] = [];

export function registerModule(modType: typeof Module & ModuleStatic) {
    mapModules[modType.NAME] = modType;
    arrModules.push(modType);
}

export function createModule(name: string, player: emitterPlayer.EmitterPlayer) {
    let mod = mapModules[name];
    if (! mod) throw new Error(`The module ${name} is invalid.`);
    let index = arrModules.indexOf(mod);
    let instance = new mod(player);
    instance.name = name;
    instance.typeID = index + 1;
    return instance;
}

// Render modules
registerModule(ModSprite);
registerModule(ModRibbon);
registerModule(ModSpriteConnected);

// Spawn modules
registerModule(ModSpawn);
registerModule(ModSpawnMoving);
registerModule(ModSpawnIntermittency);

// Velocity module
registerModule(ModVelocity);

// Rotation module
registerModule(ModRotation);

// Initial modules.
registerModule(ModSizeInitial);
registerModule(ModLocationInitialCircle);
registerModule(ModLocationInitialCircleBorder);
registerModule(ModLocationInitialRectangle);
registerModule(ModLocationInitialLineSegment);
registerModule(ModOrientationInitialRadiation);
registerModule(ModSizeInitialRandom);
registerModule(ModColorInitial);
registerModule(ModColorInitialRandom);
registerModule(ModVelocityInitial);
registerModule(ModVelocityInitialRandom);
registerModule(ModVelocityInitialVary);
registerModule(ModRotationInitial);
registerModule(ModRotationInitialRandom);
registerModule(ModWidthInitial);
registerModule(ModLifeTimeInitial);
registerModule(ModLifeTimeInitialRandom);

// Life time modules
registerModule(ModLifeTime);

// Over Life modules
registerModule(ModColorOverLife);
registerModule(ModSizeOverLife);
registerModule(ModVelocityOverLife);

//Sub UV modules
registerModule(ModSubUVSpriteSheetSimple);

//Sub player modules
registerModule(ModSubPlayerAfterDestroy);
registerModule(ModSubPlayerFollow);

//Sort modules
registerModule(ModSortLineSegment);

// export const moduleGroup = {
//     sprite: [
//         { module: ModSprite, required: true, default: true },
//         { module: ModSpawn, required: true, default: true },
//         { module: ModVelocity, required: false, default: true },
//         { module: ModSizeInitial, required: false, default: true },
//         { module: ModLocationInitialCircle, required: false, default: false},
//         { module: ModLifeTime, required: false, default: true },
//         { module: ModColorOverLife, required: false, default: true },
//     ],
//     ribbon: [
//         { module: ModRibbon, required: true, default: true },
//         { module: ModSpawnMoving, required: true, default: true },
//         { module: ModSpawn, required: false, default: false },
//         { module: ModWidthInitial, required: true, default: true },
//         { module: ModLifeTime, required: true, default: true },
//         { module: ModVelocity, required: false, default: false },
//         { module: ModColorOverLife, required: false, default: true },
//     ]
// }

export const renderModules: string[] = [];

renderModules.length = 3;
renderModules[0] = ModSprite.NAME;
renderModules[1] = ModRibbon.NAME;
renderModules[2] = ModSpriteConnected.NAME;
