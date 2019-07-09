import * as glMatrix from "gl-matrix";

export type Color = glMatrix.vec4;
export const Color = glMatrix.vec4;

export const COLOR_WHITE: Color = glMatrix.vec4.fromValues(1, 1, 1, 1);

export const COLOR_BLACK: Color = glMatrix.vec4.fromValues(0, 0, 0, 1);

export const COLOR_ZERO: Color = glMatrix.vec4.fromValues(0, 0, 0, 0);
