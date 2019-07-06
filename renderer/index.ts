import * as core from "../core";
import { context } from "./context";

export function init(canvas: HTMLCanvasElement) {
    return Promise.resolve()
    .then(() => {
        return core.init();
    })
    .then(() => {
        return context.init(canvas);
    });
}

export * from "./context";
export * from "./material";
export * from "./particle_system";
export * from "./renderer";