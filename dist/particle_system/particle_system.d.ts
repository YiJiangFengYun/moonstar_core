import * as common from "../common";
import * as emitter from "../emitter";
import * as render from "../render";
export declare type ParticleSystemInfo = {
    /**
     * Bounds local
     * First two value is minX and minY
     * Last two value is maxX and MaxY
     */
    bounds?: [number, number, number, number];
    emitters: (emitter.EmitterInfo & {
        count?: number;
    })[];
};
/**
 * Note: All emitters should be created when the ParticleSystem init.
 * If a emitter play latter, you should stop the emitter, and then play it.
 */
export declare class ParticleSystem extends common.Player {
    drawData: render.DrawData;
    emitters: emitter.Emitter[];
    emitterCount: number;
    bounds: common.Bounds;
    position: common.Vector;
    private _id;
    constructor();
    readonly id: number;
    init(info: ParticleSystemInfo): void;
    /**
     *
     * @param dt Passed time (s)
     */
    update(dt: number): void;
    render(): void;
    protected _reset(): void;
}
