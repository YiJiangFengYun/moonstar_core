import * as core from "../core";
import * as glMatrix from "gl-matrix";
export declare namespace emitterBoundsOutline {
    function init(): void;
    function render(cmd: core.DrawCmd, modelViewMatrix: glMatrix.mat4, size: core.Vector): void;
}
