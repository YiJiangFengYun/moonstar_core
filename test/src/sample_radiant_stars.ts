import * as core from "../../core";

export const name = "sample_radiant_stars";

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
                rBegin: 1,
                gBegin: 1,
                bBegin: 1,
                aBegin: 1,
                rEnd: 1,
                gEnd: 1,
                bEnd: 1,
                aEnd: 0,
            }
        ]
    }],
}