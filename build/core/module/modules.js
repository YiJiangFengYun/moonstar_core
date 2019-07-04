"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sprite_1 = require("./sprite");
var spawn_1 = require("./spawn");
var initial_size_1 = require("./initial_size");
var Initial_velocity_1 = require("./Initial_velocity");
var life_time_1 = require("./life_time");
var color_over_life_1 = require("./color_over_life");
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
//# sourceMappingURL=modules.js.map