import * as eventemitter from "eventemitter3";
import * as common from "../common";
import { EVENT_CHANGE_POSITION } from "./events";

export class PSData extends eventemitter.EventEmitter {
    /**
     * If this is true, the space of all emitters and particles is relative to the particle system.
     * If this is false, the space of all emitters and particles is global, but the space of all root
     * emitter is base on the particle system.
     * 
     */
    public useLocalSpace: boolean;
    public bounds: common.Bounds = common.Bounds.create();
    public position: common.Vector = common.Vector.create();
    public globalBounds: common.Bounds = common.Bounds.create();
    public matrix: common.Matrix = common.Matrix.create();
    public matrix4x4: common.Matrix4x4 = common.Matrix4x4.create();
    public constructor() {
        super();
    }

    public init(info: any) {
        this.useLocalSpace = info.useLocalSpace;
        let boundsInfo = info.bounds;
        if (boundsInfo) common.Bounds.set(this.bounds, boundsInfo[0], boundsInfo[1], boundsInfo[2], boundsInfo[3]);
    }

    public setPosition(value: common.Vector | number[]) {
        common.Vector.copy(this.position, value);
        common.Bounds.translate(this.globalBounds, this.bounds, this.position);
        common.Matrix.fromTranslation(this.matrix, this.position);
        common.Matrix4x4.fromTranslation(this.matrix4x4, [value[0], value[1], 0]);
        this.emit(EVENT_CHANGE_POSITION);
    }
}