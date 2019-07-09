"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sprite_1 = require("./sprite");
var spawn_1 = require("./spawn");
var size_initial_1 = require("./size_initial");
var velocity_constant_1 = require("./velocity_constant");
var life_time_1 = require("./life_time");
var color_over_life_1 = require("./color_over_life");
var location_initial_circle_1 = require("./location_initial_circle");
var orientation_initial_radiation_1 = require("./orientation_initial_radiation");
var subuv_spritesheet_simple_1 = require("./subuv_spritesheet_simple");
exports.mapModules = {};
// Render modules
exports.mapModules[sprite_1.ModSprite.NAME] = sprite_1.ModSprite;
// Spawn modules
exports.mapModules[spawn_1.ModSpawn.NAME] = spawn_1.ModSpawn;
// Initial modules.
exports.mapModules[size_initial_1.ModSizeInitial.NAME] = size_initial_1.ModSizeInitial;
exports.mapModules[location_initial_circle_1.ModLocationInitialCircle.NAME] = location_initial_circle_1.ModLocationInitialCircle;
exports.mapModules[orientation_initial_radiation_1.ModOrientationInitialRadiation.NAME] = orientation_initial_radiation_1.ModOrientationInitialRadiation;
// Constant modules.
exports.mapModules[velocity_constant_1.ModVelocityConstant.NAME] = velocity_constant_1.ModVelocityConstant;
// Life time modules
exports.mapModules[life_time_1.ModLifeTime.NAME] = life_time_1.ModLifeTime;
// Over Life modules
exports.mapModules[color_over_life_1.ModColorOverLife.NAME] = color_over_life_1.ModColorOverLife;
//Sub UV modules
exports.mapModules[subuv_spritesheet_simple_1.ModSubUVSpriteSheetSimple.NAME] = subuv_spritesheet_simple_1.ModSubUVSpriteSheetSimple;
exports.moduleGroup = {
    sprite: [
        { module: sprite_1.ModSprite, required: true, default: true },
        { module: spawn_1.ModSpawn, required: true, default: true },
        { module: size_initial_1.ModSizeInitial, required: false, default: true },
        { module: location_initial_circle_1.ModLocationInitialCircle, required: false, default: false },
        { module: life_time_1.ModLifeTime, required: false, default: true },
        { module: velocity_constant_1.ModVelocityConstant, required: false, default: true },
        { module: color_over_life_1.ModColorOverLife, required: false, default: true },
    ],
    trail: [
        // { module: ModTrail, required: true, default: true },
        { module: spawn_1.ModSpawn, required: true, default: true },
        { module: size_initial_1.ModSizeInitial, required: false, default: true },
        { module: location_initial_circle_1.ModLocationInitialCircle, required: false, default: true },
        { module: life_time_1.ModLifeTime, required: false, default: true },
        { module: velocity_constant_1.ModVelocityConstant, required: false, default: true },
        { module: color_over_life_1.ModColorOverLife, required: false, default: true },
    ]
};
exports.renderModules = [];
exports.renderModules.push(sprite_1.ModSprite);
//# sourceMappingURL=modules.js.map