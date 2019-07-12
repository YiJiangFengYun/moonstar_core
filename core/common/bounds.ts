import * as glMatrix from "gl-matrix";

export type Bounds = glMatrix.vec4;

export namespace Bounds {
    export function create(): Bounds {
        return glMatrix.vec4.create();
    }

    export function clone(target: Bounds): Bounds {
        return glMatrix.vec4.clone(target);
    }

    export function fromValues(minX: number, minY: number, maxX: number, maxY: number) {
        return glMatrix.vec4.fromValues(minX, minY, maxX, maxY);
    }

    export function copy(out: Bounds, target: Bounds) {
        return glMatrix.vec4.copy(out, target);
    }

    export function set(out: Bounds, minX: number, minY: number, maxX: number, maxY: number) {
        return glMatrix.vec4.set(out, minX, minY, maxX, maxY);
    }

    export function intersecting(a: Bounds, b: Bounds) {
        if (a[0] > b[2] || a[2] < b[0]) return false;
        if (a[1] > b[3] || a[3] < b[1]) return false;
        return true;
    }
}