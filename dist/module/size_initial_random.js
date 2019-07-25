"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("../common");
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModSizeInitialRandom = /** @class */ (function (_super) {
    __extends(ModSizeInitialRandom, _super);
    function ModSizeInitialRandom(player) {
        var _this = _super.call(this, player) || this;
        _this.sizeMin = common.Vector.create();
        _this.sizeMax = common.Vector.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModSizeInitialRandom.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var sizeMin = this.sizeMin;
        var sizeMax = this.sizeMax;
        var sizeMinConfig = info.sizeMin || common.VECTOR_ZERO;
        var sizeMaxConfig = info.sizeMax || common.VECTOR_ZERO;
        sizeMin[0] = sizeMinConfig[0] || 0;
        sizeMin[1] = sizeMinConfig[1] || 0;
        sizeMax[0] = sizeMaxConfig[0] || 0;
        sizeMax[1] = sizeMaxConfig[1] || 0;
    };
    ModSizeInitialRandom.prototype._onCreateParticle = function (particle) {
        var sizeMin = this.sizeMin;
        var sizeMax = this.sizeMax;
        var r = Math.random();
        var w = Math.max(0, sizeMin[0] + (sizeMax[0] - sizeMin[0]) * r);
        var h = Math.max(0, sizeMin[1] + (sizeMax[1] - sizeMin[0]) * r);
        if (particle.size) {
            common.Vector.set(particle.size, w, h);
        }
        else {
            particle.size = common.Vector.fromValues(w, h);
        }
    };
    ModSizeInitialRandom.NAME = "size_initial_random";
    return ModSizeInitialRandom;
}(module_1.Module));
exports.ModSizeInitialRandom = ModSizeInitialRandom;
