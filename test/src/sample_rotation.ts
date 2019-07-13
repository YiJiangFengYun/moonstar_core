import * as core from "../../core";

export const name = "sample_rotation";

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
                radius: 300,
            },
            {
                name: "orientation_initial_radiation",
                effectRotation: true,
            },
            {
                name: "rotation",
            },
            {
                name: "rotation_initial",
                value: 1,
            },
            {
                name: "color_over_life",
                colorBegin: [0, 1, 0, 1],
                colorEnd: [1, 0, 0, 0],
            }
        ]
    }],
}