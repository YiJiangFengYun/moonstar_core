import * as core from "../../core";

export const name = "sample_size_initial_random";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 10000,
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
                rate: 100,
                duration: 3
            },
            {
                name: "size_initial_random",
                sizeMin: [16, 16],
                sizeMax: [48, 48],
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
            }
        ]
    }],
}