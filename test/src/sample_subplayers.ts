import * as core from "../../core";

export const name = "sample_subplayers";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [
        {
            name: "root",
            maxParticleCount: 5,
            modules: [
                {
                    name: "life_time",
                    life: 3,
                },
                {
                    name: "sprite",
                    texturePath: "./res/star.png",
                },
                {
                    name: "spawn",
                    rate: 1,
                    duration: 3
                },
                {
                    name: "size_initial",
                    width: 32,
                    height: 32,
                },
                {
                    name: "location_initial_circle",
                    radius: 1,
                },
                {
                    name: "orientation_initial_radiation",
                    effectRotation: true,
                },
                {
                    name: "velocity_constant",
                    x: 100,
                    y: 0,
                },
                {
                    name: "color_over_life",
                    beginColorR: 1,
                    beginColorG: 1,
                    beginColorB: 1,
                    beginColorA: 1,
                    endColorR: 1,
                    endColorG: 1,
                    endColorB: 1,
                    endColorA: 1,
                },
                {
                    name: "subplayer_simple",
                }
            ]
        },
        {
            name: "sub",
            maxParticleCount: 1000,
            parent: "root",
            modules: [
                {
                    name: "life_time",
                    life: 10,
                },
                {
                    name: "sprite",
                    texturePath: "./res/star2.png",
                },
                {
                    name: "spawn",
                    rate: 100,
                    duration: 3
                },
                {
                    name: "size_initial",
                    width: 32,
                    height: 32,
                },
                {
                    name: "location_initial_circle",
                    radius: 1,
                },
                {
                    name: "orientation_initial_radiation",
                    effectRotation: true,
                },
                {
                    name: "velocity_constant",
                    x: 100,
                    y: 0,
                },
                {
                    name: "color_over_life",
                    beginColorR: 1,
                    beginColorG: 1,
                    beginColorB: 1,
                    beginColorA: 1,
                    endColorR: 1,
                    endColorG: 1,
                    endColorB: 1,
                    endColorA: 0,
                }
            ],
            count: 10,
        }
    ],
}