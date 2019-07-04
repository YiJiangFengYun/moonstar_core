"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sprite_1 = require("./sprite");
var spawn_1 = require("./spawn");
var initial_size_1 = require("./initial_size");
var Initial_velocity_1 = require("./Initial_velocity");
var life_time_1 = require("./life_time");
var color_over_life_1 = require("./color_over_life");
exports.mapModules = {};
// Render modules
exports.mapModules[sprite_1.ModSprite.NAME] = sprite_1.ModSprite;
// Spawn modules
exports.mapModules[spawn_1.ModSpawn.NAME] = spawn_1.ModSpawn;
// Initialize modules.
exports.mapModules[initial_size_1.ModInitialSize.NAME] = initial_size_1.ModInitialSize;
exports.mapModules[Initial_velocity_1.ModInitialVelocity.NAME] = Initial_velocity_1.ModInitialVelocity;
// Life time modules
exports.mapModules[life_time_1.ModLifeTime.NAME] = life_time_1.ModLifeTime;
// Over Life modules
exports.mapModules[color_over_life_1.ModColorOverLife.NAME] = color_over_life_1.ModColorOverLife;
exports.moduleGroup = {
    sprite: [
        { module: sprite_1.ModSprite, required: true, default: true },
        { module: spawn_1.ModSpawn, required: true, default: true },
        { module: initial_size_1.ModInitialSize, required: false, default: true },
        { module: life_time_1.ModLifeTime, required: false, default: true },
        { module: Initial_velocity_1.ModInitialVelocity, required: false, default: true },
        { module: color_over_life_1.ModColorOverLife, required: false, default: true },
    ],
    trail: [
        // { module: ModTrail, required: true, default: true },
        { module: spawn_1.ModSpawn, required: true, default: true },
        { module: initial_size_1.ModInitialSize, required: false, default: true },
        { module: life_time_1.ModLifeTime, required: false, default: true },
        { module: Initial_velocity_1.ModInitialVelocity, required: false, default: true },
        { module: color_over_life_1.ModColorOverLife, required: false, default: true },
    ]
};
exports.renderModules = [];
exports.renderModules.push(sprite_1.ModSprite);
//# sourceMappingURL=modules.js.map