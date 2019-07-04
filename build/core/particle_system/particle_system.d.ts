import * as common from "../common";
import * as emitter from "../emitter";
import * as render from "../render";
export interface ParticleSystemInfo {
    emitters: {
        maxParticleCount?: number;
    }[];
}
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
