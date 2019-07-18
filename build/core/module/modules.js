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
var subplayer_simple_1 = require("./subplayer_simple");
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
exports.mapModules = {};
// Render modules
exports.mapModules[sprite_1.ModSprite.NAME] = sprite_1.ModSprite;
exports.mapModules[ribbon_1.ModRibbon.NAME] = ribbon_1.ModRibbon;
// Spawn modules
exports.mapModules[spawn_1.ModSpawn.NAME] = spawn_1.ModSpawn;
exports.mapModules[spawn_moving_1.ModSpawnMoving.NAME] = spawn_moving_1.ModSpawnMoving;
// Velocity module
exports.mapModules[velocity_1.ModVelocity.NAME] = velocity_1.ModVelocity;
// Rotation module
exports.mapModules[rotation_1.ModRotation.NAME] = rotation_1.ModRotation;
// Initial modules.
exports.mapModules[size_initial_1.ModSizeInitial.NAME] = size_initial_1.ModSizeInitial;
exports.mapModules[location_initial_circle_1.ModLocationInitialCircle.NAME] = location_initial_circle_1.ModLocationInitialCircle;
exports.mapModules[location_initial_circle_border_1.ModLocationInitialCircleBorder.NAME] = location_initial_circle_border_1.ModLocationInitialCircleBorder;
exports.mapModules[location_initial_rectangle_1.ModLocationInitialRectangle.NAME] = location_initial_rectangle_1.ModLocationInitialRectangle;
exports.mapModules[orientation_initial_radiation_1.ModOrientationInitialRadiation.NAME] = orientation_initial_radiation_1.ModOrientationInitialRadiation;
exports.mapModules[size_initial_random_1.ModSizeInitialRandom.NAME] = size_initial_random_1.ModSizeInitialRandom;
exports.mapModules[color_initial_1.ModColorInitial.NAME] = color_initial_1.ModColorInitial;
exports.mapModules[color_initial_random_1.ModColorInitialRandom.NAME] = color_initial_random_1.ModColorInitialRandom;
exports.mapModules[velocity_initial_1.ModVelocityInitial.NAME] = velocity_initial_1.ModVelocityInitial;
exports.mapModules[velocity_initial_random_1.ModVelocityInitialRandom.NAME] = velocity_initial_random_1.ModVelocityInitialRandom;
exports.mapModules[velocity_initial_vary_1.ModVelocityInitialVary.NAME] = velocity_initial_vary_1.ModVelocityInitialVary;
exports.mapModules[rotation_initial_1.ModRotationInitial.NAME] = rotation_initial_1.ModRotationInitial;
exports.mapModules[rotation_initial_random_1.ModRotationInitialRandom.NAME] = rotation_initial_random_1.ModRotationInitialRandom;
exports.mapModules[width_inital_1.ModWidthInitial.NAME] = width_inital_1.ModWidthInitial;
exports.mapModules[life_time_initial_1.ModLifeTimeInitial.NAME] = life_time_initial_1.ModLifeTimeInitial;
exports.mapModules[life_time_initial_random_1.ModLifeTimeInitialRandom.NAME] = life_time_initial_random_1.ModLifeTimeInitialRandom;
// Life time modules
exports.mapModules[life_time_1.ModLifeTime.NAME] = life_time_1.ModLifeTime;
// Over Life modules
exports.mapModules[color_over_life_1.ModColorOverLife.NAME] = color_over_life_1.ModColorOverLife;
exports.mapModules[size_over_life_1.ModSizeOverLife.NAME] = size_over_life_1.ModSizeOverLife;
exports.mapModules[velocity_over_life_1.ModVelocityOverLife.NAME] = velocity_over_life_1.ModVelocityOverLife;
//Sub UV modules
exports.mapModules[subuv_spritesheet_simple_1.ModSubUVSpriteSheetSimple.NAME] = subuv_spritesheet_simple_1.ModSubUVSpriteSheetSimple;
//Sub player modules
exports.mapModules[subplayer_simple_1.ModSubPlayerSimple.NAME] = subplayer_simple_1.ModSubPlayerSimple;
exports.moduleGroup = {
    sprite: [
        { module: sprite_1.ModSprite, required: true, default: true },
        { module: spawn_1.ModSpawn, required: true, default: true },
        { module: velocity_1.ModVelocity, required: false, default: true },
        { module: size_initial_1.ModSizeInitial, required: false, default: true },
        { module: location_initial_circle_1.ModLocationInitialCircle, required: false, default: false },
        { module: life_time_1.ModLifeTime, required: false, default: true },
        { module: color_over_life_1.ModColorOverLife, required: false, default: true },
    ],
    ribbon: [
        { module: ribbon_1.ModRibbon, required: true, default: true },
        { module: spawn_moving_1.ModSpawnMoving, required: true, default: true },
        { module: spawn_1.ModSpawn, required: false, default: false },
        { module: width_inital_1.ModWidthInitial, required: true, default: true },
        { module: life_time_1.ModLifeTime, required: true, default: true },
        { module: velocity_1.ModVelocity, required: false, default: false },
        { module: color_over_life_1.ModColorOverLife, required: false, default: true },
    ]
};
exports.renderModules = [];
exports.renderModules.length = 2;
exports.renderModules[0] = sprite_1.ModSprite;
exports.renderModules[1] = ribbon_1.ModRibbon;
//# sourceMappingURL=modules.js.map