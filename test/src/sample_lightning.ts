//Lightning need modules:
// 1. Spawn intermittency
// 2. Location initial line segment
// 3. Sprite connected (render module) with fixed head and tail node.
// 4. Sort line segment
// 5. Life time
// 6. Life time initial
// 7. Width initial
// options:
// *. SubUV initial random
import * as core from "../../core";

export const name = "sample_lightning";

export const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 10,
        modules: [
            {
                name: "life_time",
            },
            {
                name: "life_time_initial",
                life: 0.05,
            },
            {
                name: "spawn_intermittency",
                duration: 30,
                period: 0.05,
                durationPerPeriod: 0.01,
                rate: 1000,
            },
            {
                name: "width_initial",
                width: 50,
            },
            {
                name: "location_initial_line_segment",
                source: [-200, 0],
                target: [200, 0],
                bias: 10,
            },
            {
                name: "sort_line_segment",
                source: [-200, 0],
                target: [200, 0],
            },
            {
                name: "sprite_connected",
                texturePath: "./res/lightning.png",
                head: [-200, 0],
                tail: [200, 0],
                ribbon: true,
            },
        ]
    }],
}