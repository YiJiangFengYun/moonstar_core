"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("./context");
var Texture = /** @class */ (function () {
    function Texture() {
        this._createTexture();
    }
    Texture.prototype.init = function (info) {
        this._loadTexture(info.url);
    };
    Texture.prototype._createTexture = function () {
        var gl = context_1.context.gl;
        var texture = this.glTexture;
        if (!texture)
            this.glTexture = texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Initialize the default pixels and size.
        var level = 0;
        var internalFormat = gl.RGBA;
        var width = 1;
        var height = 1;
        var border = 0;
        var srcFormat = gl.RGBA;
        var srcType = gl.UNSIGNED_BYTE;
        var pixel = new Uint8Array([255, 255, 255, 255]); // whilte
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
    };
    Texture.prototype._loadTexture = function (url) {
        if (url) {
            var gl_1 = context_1.context.gl;
            var level_1 = 0;
            var internalFormat_1 = gl_1.RGBA;
            var srcFormat_1 = gl_1.RGBA;
            var srcType_1 = gl_1.UNSIGNED_BYTE;
            var texture_1 = this.glTexture;
            var image_1 = new Image();
            image_1.onload = function () {
                gl_1.bindTexture(gl_1.TEXTURE_2D, texture_1);
                gl_1.texImage2D(gl_1.TEXTURE_2D, level_1, internalFormat_1, srcFormat_1, srcType_1, image_1);
                // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                // Other texture parameters use they default values.
            };
            image_1.src = url;
        }
    };
    return Texture;
}());
exports.Texture = Texture;
//# sourceMappingURL=texture.js.map