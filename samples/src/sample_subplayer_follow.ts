import * as core from "../../core";

export const name = "sample_subplayer_follow";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [
        {
            name: "root",
            maxParticleCount: 100,
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
                    rate: 40,
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
                    name: "subplayer_follow",
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
                },
                {
                    name: "life_time_initial",
                    life: 3,
                },
                {
                    name: "ribbon",
                    texturePath: "./res/ribbon.png",
                },
                {
                    name: "spawn",
                    rate: 20,
                },
                {
                    name: "width_initial",
                    width: 5,
                },
                {
                    name: "color_over_life",
                    colorBegin: [1, 1, 1, 1],
                    colorEnd: [1, 1, 0, 0],
                }
            ],
            count: 100,
        }
    ],
}