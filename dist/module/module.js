"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("../common");
var Module = /** @class */ (function () {
    function Module(owner) {
        this.owner = owner;
        this._id = common.gainID();
    }
    Object.defineProperty(Module.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Module.prototype.init = function (info) {
    };
    Module.prototype.update = function (dt) {
    };
    return Module;
}());
exports.Module = Module;
