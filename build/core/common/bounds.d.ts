import * as glMatrix from "gl-matrix";
import { Vector } from "./vector";
export declare type Bounds = glMatrix.vec4;
export declare namespace Bounds {
    function create(): Bounds;
    function clone(target: Bounds): Bounds;
    function fromValues(minX: number, minY: number, maxX: number, maxY: number): glMatrix.vec4;
    function copy(out: Bounds, target: Bounds): glMatrix.vec4;
    function set(out: Bounds, minX: number, minY: number, maxX: number, maxY: number): glMatrix.vec4;
    function intersecting(a: Bounds, b: Bounds): boolean;
    function translate(out: Bounds, target: Bounds, value: Vector): void;
    function isEmpty(target: Bounds): boolean;
}
