import * as glMatrix from "gl-matrix";

export type Vector = glMatrix.vec2;
export const Vector = glMatrix.vec2;

export const ONE = Vector.fromValues(1, 1);
export const ZERO = Vector.fromValues(0, 0);