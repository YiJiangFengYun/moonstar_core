"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = {
    gl: null,
    init: function () {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            if (!document) {
                return Promise.reject(new Error("Unable to initialize WebGL, the document is invalid."));
            }
            var canvas = document.querySelector("#glCanvas");
            if (!canvas) {
                return Promise.reject(new Error("Unable to initialize WebGL, \n                the canvas with id " + "#glCanvas" + " is invalid."));
            }
            // Initialize the GL context
            var gl = canvas.getContext("webgl");
            // Only continue if WebGL is available and working
            if (gl === null) {
                return Promise.reject("Unable to initialize WebGL. Your browser or machine may not support it.");
            }
            _this.gl = gl;
            return Promise.resolve();
        });
    }
};
//# sourceMappingURL=context.js.map