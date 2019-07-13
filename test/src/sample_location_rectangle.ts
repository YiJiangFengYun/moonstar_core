import * as core from "../../core";

export const name = "sample_location_rectangle";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 10000,
        modules: [
            {
                name: "life_time",
                life: 10,
            },
            {
                name: "sprite",
                texturePath: "./res/star.png",
            },
            {
                name: "spawn",
                rate: 500,
                duration: 3
            },
            {
                name: "size_initial",
                width: 32,
                height: 32,
            },
            {
                name: "location_initial_rectangle",
                width: 100,
                height: 100,
            },
            {
                name: "velocity",
            },
            {
                name: "velocity_initial",
                velocity: [50, 0],
            },
            {
                name: "color_over_life",
                colorBegin: [1, 1, 1, 1],
                colorEnd: [1, 1, 1, 0],
            }
        ]
    }],
}