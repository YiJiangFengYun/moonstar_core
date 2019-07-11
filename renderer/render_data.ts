import * as core from "../core";
import * as glMatrix from "gl-matrix";

export interface RenderData {
    projectionMatrix: core.Matrix;
    projectionMatrix4x4: glMatrix.mat4;
    clearColor: core.Color;
}

export const renderData = {
    projectionMatrix: core.Matrix.create(),
    projectionMatrix4x4: glMatrix.mat4.create(),
    clearColor: core.Color.create(),
};