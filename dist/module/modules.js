"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sprite_1 = require("./sprite");
var spawn_1 = require("./spawn");
var size_initial_1 = require("./size_initial");
var life_time_1 = require("./life_time");
var color_over_life_1 = require("./color_over_life");
var location_initial_circle_1 = require("./location_initial_circle");
var orientation_initial_radiation_1 = require("./orientation_initial_radiation");
var subuv_spritesheet_simple_1 = require("./subuv_spritesheet_simple");
var subplayer_after_destroy_1 = require("./subplayer_after_destroy");
var size_initial_random_1 = require("./size_initial_random");
var location_initial_circle_border_1 = require("./location_initial_circle_border");
var location_initial_rectangle_1 = require("./location_initial_rectangle");
var size_over_life_1 = require("./size_over_life");
var color_initial_1 = require("./color_initial");
var color_initial_random_1 = require("./color_initial_random");
var life_time_initial_random_1 = require("./life_time_initial_random");
var velocity_initial_random_1 = require("./velocity_initial_random");
var velocity_1 = require("./velocity");
var velocity_initial_1 = require("./velocity_initial");
var rotation_1 = require("./rotation");
var rotation_initial_1 = require("./rotation_initial");
var rotation_initial_random_1 = require("./rotation_initial_random");
var width_inital_1 = require("./width_inital");
var spawn_moving_1 = require("./spawn_moving");
var ribbon_1 = require("./ribbon");
var life_time_initial_1 = require("./life_time_initial");
var velocity_over_life_1 = require("./velocity_over_life");
var velocity_initial_vary_1 = require("./velocity_initial_vary");
var spawn_intermittency_1 = require("./spawn_intermittency");
var location_initial_line_segment_1 = require("./location_initial_line_segment");
var sort_line_segment_1 = require("./sort_line_segment");
var sprite_connected_1 = require("./sprite_connected");
var subplayer_follow_1 = require("./subplayer_follow");
exports.mapModules = {};
exports.arrModules = [];
function registerModule(modType) {
    var modType2 = modType;
    exports.mapModules[modType2.NAME] = modType;
    exports.arrModules.push(modType);
}
exports.registerModule = registerModule;
function createModule(name, player) {
    var mod = exports.mapModules[name];
    if (!mod)
        throw new Error("The module " + name + " is invalid.");
    var index = exports.arrModules.indexOf(mod);
    var instance = new mod(player);
    instance.name = name;
    instance.typeID = index + 1;
    return instance;
}
exports.createModule = createModule;
// Render modules
registerModule(sprite_1.ModSprite);
registerModule(ribbon_1.ModRibbon);
registerModule(sprite_connected_1.ModSpriteConnected);
// Spawn modules
registerModule(spawn_1.ModSpawn);
registerModule(spawn_moving_1.ModSpawnMoving);
registerModule(spawn_intermittency_1.ModSpawnIntermittency);
// Velocity module
registerModule(velocity_1.ModVelocity);
// Rotation module
registerModule(rotation_1.ModRotation);
// Initial modules.
registerModule(size_initial_1.ModSizeInitial);
registerModule(location_initial_circle_1.ModLocationInitialCircle);
registerModule(location_initial_circle_border_1.ModLocationInitialCircleBorder);
registerModule(location_initial_rectangle_1.ModLocationInitialRectangle);
registerModule(location_initial_line_segment_1.ModLocationInitialLineSegment);
registerModule(orientation_initial_radiation_1.ModOrientationInitialRadiation);
registerModule(size_initial_random_1.ModSizeInitialRandom);
registerModule(color_initial_1.ModColorInitial);
registerModule(color_initial_random_1.ModColorInitialRandom);
registerModule(velocity_initial_1.ModVelocityInitial);
registerModule(velocity_initial_random_1.ModVelocityInitialRandom);
registerModule(velocity_initial_vary_1.ModVelocityInitialVary);
registerModule(rotation_initial_1.ModRotationInitial);
registerModule(rotation_initial_random_1.ModRotationInitialRandom);
registerModule(width_inital_1.ModWidthInitial);
registerModule(life_time_initial_1.ModLifeTimeInitial);
registerModule(life_time_initial_random_1.ModLifeTimeInitialRandom);
// Life time modules
registerModule(life_time_1.ModLifeTime);
// Over Life modules
registerModule(color_over_life_1.ModColorOverLife);
registerModule(size_over_life_1.ModSizeOverLife);
registerModule(velocity_over_life_1.ModVelocityOverLife);
//Sub UV modules
registerModule(subuv_spritesheet_simple_1.ModSubUVSpriteSheetSimple);
//Sub player modules
registerModule(subplayer_after_destroy_1.ModSubPlayerAfterDestroy);
registerModule(subplayer_follow_1.ModSubPlayerFollow);
//Sort modules
registerModule(sort_line_segment_1.ModSortLineSegment);
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
exports.renderModules = [];
exports.renderModules.length = 3;
exports.renderModules[0] = sprite_1.ModSprite.NAME;
exports.renderModules[1] = ribbon_1.ModRibbon.NAME;
exports.renderModules[2] = sprite_connected_1.ModSpriteConnected.NAME;
