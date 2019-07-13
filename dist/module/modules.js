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
var life_time_random_1 = require("./life_time_random");
var velocity_initial_random_1 = require("./velocity_initial_random");
var velocity_1 = require("./velocity");
var velocity_initial_1 = require("./velocity_initial");
exports.mapModules = {};
// Render modules
exports.mapModules[sprite_1.ModSprite.NAME] = sprite_1.ModSprite;
// Spawn modules
exports.mapModules[spawn_1.ModSpawn.NAME] = spawn_1.ModSpawn;
// Velocity module
exports.mapModules[velocity_1.ModVelocity.NAME] = velocity_1.ModVelocity;
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
// Life time modules
exports.mapModules[life_time_1.ModLifeTime.NAME] = life_time_1.ModLifeTime;
exports.mapModules[life_time_random_1.ModLifeTimeRandom.NAME] = life_time_random_1.ModLifeTimeRandom;
// Over Life modules
exports.mapModules[color_over_life_1.ModColorOverLife.NAME] = color_over_life_1.ModColorOverLife;
exports.mapModules[size_over_life_1.ModSizeOverLife.NAME] = size_over_life_1.ModSizeOverLife;
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
    trail: [
        // { module: ModTrail, required: true, default: true },
        { module: spawn_1.ModSpawn, required: true, default: true },
        { module: size_initial_1.ModSizeInitial, required: false, default: true },
        { module: location_initial_circle_1.ModLocationInitialCircle, required: false, default: true },
        { module: life_time_1.ModLifeTime, required: false, default: true },
        { module: velocity_1.ModVelocity, required: false, default: true },
        { module: color_over_life_1.ModColorOverLife, required: false, default: true },
    ]
};
exports.renderModules = [];
exports.renderModules.push(sprite_1.ModSprite);
