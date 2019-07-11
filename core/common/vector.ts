import * as glMatrix from "gl-matrix";

export type Vector = glMatrix.vec2;
export const Vector = glMatrix.vec2;

export const VECTOR_ONE = Vector.fromValues(1, 1);
export const VECTOR_ZERO = Vector.fromValues(0, 0);

export type Vector4 = glMatrix.vec4;
export const Vector4 = glMatrix.vec4;

export const VECTOR4_ZERO_ONE = Vector4.fromValues(0, 0, 1, 1);
