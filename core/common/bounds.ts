import * as glMatrix from "gl-matrix";
import { Vector } from "./vector";

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

    export function translate(out: Bounds, target: Bounds, value: Vector) {
        out[0] = target[0] + value[0];
        out[2] = target[2] + value[0];
        out[1] = target[1] + value[1];
        out[3] = target[3] + value[1];
    }

    export function isEmpty(target: Bounds) {
        return target[0] === target[2] || target[1] === target[3];
    }

    export function union(out: Bounds, bound1: Bounds, bound2: Bounds) {
        let minX = Math.min(bound1[0], bound2[0]);
        let minY = Math.min(bound1[1], bound2[1]);
        let maxX = Math.max(bound1[2], bound2[2]);
        let maxY = Math.max(bound1[3], bound2[3]);
        set(out, minX, minY, maxX, maxY);
    }
}

export const BOUNDS_EMPTY = glMatrix.vec4.fromValues(0, 0, 0, 0);