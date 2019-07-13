import * as core from "../../core";

export const name = "sample_circle_border";

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
                rate: 100,
                duration: 3
            },
            {
                name: "size_initial",
                width: 32,
                height: 32,
            },
            {
                name: "location_initial_circle_border",
                radius: 100,
            },
            {
                name: "orientation_initial_radiation",
                effectRotation: true,
            },
            {
                name: "velocity_constant",
                x: 50,
                y: 0,
            },
            {
                name: "color_over_life",
                beginColorR: 1,
                beginColorG: 1,
                beginColorB: 1,
                beginColorA: 1,
                endColorR: 1,
                endColorG: 1,
                endColorB: 1,
                endColorA: 0,
            }
        ]
    }],
}