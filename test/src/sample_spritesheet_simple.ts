import * as core from "../../core";

export const name = "sample_spritesheet_simple";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 1,
        modules: [
            {
                name: "life_time",
            },
            {
                name: "life_time_initial",
                life: 100000000,
            },
            {
                name: "sprite",
                texturePath: "./res/spritesheet.png",
            },
            {
                name: "spawn",
                rate: 1,
                duration: 0
            },
            {
                name: "size_initial",
                width: 240,
                height: 160,
            },
            {
                name: "subuv_spritesheet_simple",
                uvSize: [0.333, 0.5],
                frameRate: 3,
            }
        ]
    }],
}