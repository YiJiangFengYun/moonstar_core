import * as eventemitter from "eventemitter3";
import * as common from "../common";
export declare class PSData extends eventemitter.EventEmitter {
    /**
     * If this is true, the space of all emitters and particles is relative to the particle system.
     * If this is false, the space of all emitters and particles is global, but the space of all root
     * emitter is base on the particle system.
     *
     */
    useLocalSpace: boolean;
    bounds: common.Bounds;
    position: common.Vector;
    globalBounds: common.Bounds;
    matrix: common.Matrix;
    matrix4x4: common.Matrix4x4;
    constructor();
    init(info: any): void;
    setPosition(value: common.Vector | number[]): void;
}
