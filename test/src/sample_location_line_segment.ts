import * as core from "../../core";

export const name = "sample_location_line_segment";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 10000,
        modules: [
            {
                name: "life_time",
            },
            {
                name: "life_time_initial",
                life: 5,
            },
            {
                name: "sprite",
                texturePath: "./res/star2.png",
            },
            {
                name: "spawn_intermittency",
                duration: 30,
                period: 5,
                durationPerPeriod: 0.01,
                rate: 1000,
            },
            {
                name: "size_initial",
                width: 10,
                height: 10,
            },
            {
                name: "location_initial_line_segment",
                source: [-100, 0],
                target: [100, 0],
                bias: 10,
            },
            {
                name: "color_initial_random",
                colorMin: [0, 0, 0, 1],
                colorMax: [1, 1, 1, 1],
            }
        ]
    }],
}