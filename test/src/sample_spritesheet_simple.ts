import * as core from "../../core";

export const name = "sample_spritesheet_simple";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 1,
        modules: [
            {
                name: "life_time",
                life: 100000000,
            },
            {
                name: "sprite",
                texturePath: "./res/spritesheet.png",
                useSubUV: true,
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

// export const psInfo: core.ParticleSystemInfo = {
//     emitters: [{
//         maxParticleCount: 10000,
//         root: true,
//         modules: [
//             {
//                 name: "life_time",
//                 life: 10,
//             },
//             {
//                 name: "sprite",
//                 texturePath: "./res/spritesheet.png",
//                 useSubUV: true,
//             },
//             {
//                 name: "spawn",
//                 rate: 100,
//                 duration: 3
//             },
//             {
//                 name: "size_initial",
//                 width: 240,
//                 height: 160,
//             },
//             {
//                 name: "location_initial_circle",
//                 radius: 1,
//             },
//             {
//                 name: "orientation_initial_radiation",
//                 effectRotation: true,
//             },
//             {
//                 name: "velocity_constant",
//                 x: 100,
//                 y: 0,
//             },
//             {
//                 name: "color_over_life",
//                 beginColorR: 1,
//                 beginColorG: 1,
//                 beginColorB: 1,
//                 beginColorA: 1,
//                 endColorR: 1,
//                 endColorG: 1,
//                 endColorB: 1,
//                 endColorA: 0,
//             },
//             {
//                 name: "subuv_spritesheet_simple",
//                 uvSize: [0.333, 0.5],
//                 frameRate: 3,
//             }
//         ]
//     }],
// }