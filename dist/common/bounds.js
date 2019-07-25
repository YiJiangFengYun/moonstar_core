"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glMatrix = require("gl-matrix");
var Bounds;
(function (Bounds) {
    function create() {
        return glMatrix.vec4.create();
    }
    Bounds.create = create;
    function clone(target) {
        return glMatrix.vec4.clone(target);
    }
    Bounds.clone = clone;
    function fromValues(minX, minY, maxX, maxY) {
        return glMatrix.vec4.fromValues(minX, minY, maxX, maxY);
    }
    Bounds.fromValues = fromValues;
    function copy(out, target) {
        return glMatrix.vec4.copy(out, target);
    }
    Bounds.copy = copy;
    function set(out, minX, minY, maxX, maxY) {
        return glMatrix.vec4.set(out, minX, minY, maxX, maxY);
    }
    Bounds.set = set;
    function intersecting(a, b) {
        if (a[0] > b[2] || a[2] < b[0])
            return false;
        if (a[1] > b[3] || a[3] < b[1])
            return false;
        return true;
    }
    Bounds.intersecting = intersecting;
    function translate(out, target, value) {
        out[0] = target[0] + value[0];
        out[2] = target[2] + value[0];
        out[1] = target[1] + value[1];
        out[3] = target[3] + value[1];
    }
    Bounds.translate = translate;
    function isEmpty(target) {
        return target[0] === target[2] || target[1] === target[3];
    }
    Bounds.isEmpty = isEmpty;
    function union(out, bound1, bound2) {
        var minX = Math.min(bound1[0], bound2[0]);
        var minY = Math.min(bound1[1], bound2[1]);
        var maxX = Math.max(bound1[2], bound2[2]);
        var maxY = Math.max(bound1[3], bound2[3]);
        set(out, minX, minY, maxX, maxY);
    }
    Bounds.union = union;
})(Bounds = exports.Bounds || (exports.Bounds = {}));
exports.BOUNDS_EMPTY = glMatrix.vec4.fromValues(0, 0, 0, 0);
