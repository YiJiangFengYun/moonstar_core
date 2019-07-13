import * as core from "../../core";

export const name = "sample_life_random";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 10000,
        modules: [
            {
                name: "life_time_random",
                lifeMin: 0,
                lifeMax: 10,
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
                colorBegin: [0, 1, 0, 1],
                colorEnd: [1, 0, 0, 0],
            }
        ]
    }],
}