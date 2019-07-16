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
            // {
            //     name: "sprite",
            //     texturePath: "./res/star.png",
            // },
            {
                name: "ribbon",
                texturePath: "./res/star.png",
            },
            {
                name: "spawn",
                rate: 10,
                duration: 60
            },
            {
                name: "width_initial",
                width: 32,
            },
            // {
            //     name: "size_initial",
            //     width: 32,
            //     height: 32,
            // },
            {
                name: "velocity",
            },
            {
                name: "velocity_initial_random",
                velocityMin: [100, 0],
                velocityMax: [100, 100],
            },
            {
                name: "color_over_life",
                colorBegin: [1, 1, 1, 1],
                colorEnd: [1, 1, 1, 0],
            }
        ]
    }],
}