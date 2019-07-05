import * as common from "../common";
import * as emitter from "../emitter";
import * as render from "../render";
export interface ParticleSystemInfo {
    emitters: {
        maxParticleCount?: number;
    }[];
}
/**
 * Note: All emitters should be created when the ParticleSystem init.
 * If a emitter play latter, you should stop the emitter, and then play it.
 */
export declare class ParticleSystem extends common.Player {
    drawData: render.DrawData;
    emitters: emitter.Emitter[];
    emitterCount: number;
    private _id;
    constructor();
    readonly id: number;
    init(info: ParticleSystemInfo): void;
    update(dt: number): void;
    render(): void;
}
