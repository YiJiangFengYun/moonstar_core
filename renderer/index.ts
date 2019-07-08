import * as core from "../core";
import { renderer, RendererInfo } from "./renderer";

let r = renderer;

export function init(info: RendererInfo) {
    return Promise.resolve()
    .then(() => {
        return core.init();
    })
    .then(() => {
        r.init(info);
        return r;
    });
}

export { ParticleSystem } from "./particle_system";
export { Renderer } from "./renderer";