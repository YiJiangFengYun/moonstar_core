"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
var common = require("../common");
var Module = /** @class */ (function () {
    function Module(player) {
        this.player = player;
        this._id = common.gainID();
    }
    Object.defineProperty(Module.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Module.prototype.init = function (info) {
    };
    Module.prototype.ready = function () {
    };
    Module.prototype.update = function (dt) {
    };
    Module.prototype.postUpdate = function () {
    };
    Module.prototype.reset = function () {
    };
    return Module;
}());
exports.Module = Module;
