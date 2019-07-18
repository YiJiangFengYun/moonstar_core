import * as core from "../../core";

export const name = "sample_subplayers";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [
        {
            name: "root",
            maxParticleCount: 5,
            bounds: [-16, -16, 16, 16],
            modules: [
                {
                    name: "life_time",
                },
                {
                    name: "life_time_initial",
                    life: 10,
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
                    name: "velocity",
                },
                {
                    name: "velocity_initial",
                    velocity: [50, 0],
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
            bounds: [-10, -10, 10, 10],
            modules: [
                {
                    name: "life_time",
                },
                {
                    name: "life_time_initial",
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
                    name: "velocity",
                },
                {
                    name: "velocity_initial",
                    velocity: [100, 0],
                },
                {
                    name: "color_over_life",
                    colorBegin: [1, 1, 1, 1],
                    colorEnd: [1, 1, 1, 0],
                },
            ],
            count: 3,
        }
    ],
}