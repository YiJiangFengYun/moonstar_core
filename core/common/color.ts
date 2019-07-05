import * as glMatrix from "gl-matrix";

export type Color = glMatrix.vec4;
export const Color = glMatrix.vec4;

export const WHITE: Color = glMatrix.vec4.fromValues(1, 1, 1, 1);

export const BLACK: Color = glMatrix.vec4.fromValues(0, 0, 0, 1);

export const ZERO: Color = glMatrix.vec4.fromValues(0, 0, 0, 0);
