import * as core from "../../core";

export const name = "sample_spawn_intermittency";

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
                texturePath: "./res/star2.png",
            },
            {
                name: "spawn_intermittency",
                delay: 10,
                duration: 30,
                period: 5,
                durationPerPeriod: 0.1,
                rate: 1000,
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
                name: "color_initial_random",
                colorMin: [0, 0, 0, 1],
                colorMax: [1, 1, 1, 1],
            }
        ]
    }],
}