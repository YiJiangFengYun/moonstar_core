"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = {
    gl: null,
    init: function (canvas) {
        var _this = this;
        return Promise.resolve()
            .then(function () {
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