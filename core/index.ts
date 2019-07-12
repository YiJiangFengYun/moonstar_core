export function init() {
    return Promise.resolve()
    .then(() => {
        console.info(`
////////////////////////
Moonstar Particle System
////////////////////////
        `);
    })
}

export * from "./common";
export * from "./material";
export * from "./render";
export * from "./particle";
export * from "./module";
export * from "./emitter_player";
export * from "./emitter";
export * from "./particle_system";