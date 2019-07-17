import * as core from "../../core";

export const name = "sample_ribbon";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 10000,
        bounds: [0, -50, 400, 50],
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
            // {
            //     name: "sprite",
            //     texturePath: "./res/star2.png",
            // },
            // {
            //     name: "spawn_moving",
            //     interval: 10,
            // },
            {
                name: "spawn",
                rate: 20,
            },
            {
                name: "width_initial",
                width: 5,
            },
            {
                name: "velocity",
            },
            {
                name: "velocity_initial_vary",
                velocityBegin: [100, 20],
                velocityEnd: [100, -20],
                period: 2,
                trigSmooth: true,
            },
            {
                name: "color_over_life",
                colorBegin: [1, 0, 0, 1],
                colorEnd: [1, 1, 0, 0],
            }
        ]
    }],
}