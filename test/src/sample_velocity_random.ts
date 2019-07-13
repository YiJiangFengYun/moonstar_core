import * as core from "../../core";

export const name = "sample_velocity_random";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 10000,
        modules: [
            {
                name: "life_time",
                life: 3,
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
                name: "velocity_constant_random",
                velocityMin: [0, 0],
                velocityMax: [100, 0],
            },
            {
                name: "color_over_life",
                colorBegin: [0, 1, 0, 1],
                colorEnd: [1, 0, 0, 0],
            }
        ]
    }],
}