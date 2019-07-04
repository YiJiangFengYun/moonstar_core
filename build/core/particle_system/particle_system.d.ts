import * as common from "../common";
import * as emitter from "../emitter";
import * as render from "../render";
export interface ParticleSystem {
    drawData: render.DrawData;
    emitters: emitter.Emitter[];
    update(dt: number): void;
    render(): void;
}
export interface ParticleSystemInfo {
    emitters: {
        maxParticleCount?: number;
    }[];
}
export declare class ParticleSystem extends common.Player implements ParticleSystem {
    drawData: render.DrawData;
    emitters: emitter.Emitter[];
    emitterCount: number;
    constructor();
    init(info: ParticleSystemInfo): void;
}
