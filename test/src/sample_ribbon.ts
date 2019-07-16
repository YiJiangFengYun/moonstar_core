import * as core from "../../core";

export const name = "sample_ribbon";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 10000,
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
                rate: 5,
                duration: 60
            },
            {
                name: "width_initial",
                width: 32,
            },
            {
                name: "velocity",
            },
            // {
            //     name: "velocity_initial_random",
            //     velocityMin: [100, 0],
            //     velocityMax: [100, 100],
            // },
            {
                name: "velocity_initial",
                velocity: [100, 0],
            },
            {
                name: "color_over_life",
                colorBegin: [1, 0, 0, 1],
                colorEnd: [0, 1, 0, 0],
            }
        ]
    }],
}