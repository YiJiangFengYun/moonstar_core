"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModRotationInitialRandom = void 0;
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModRotationInitialRandom = /** @class */ (function (_super) {
    __extends(ModRotationInitialRandom, _super);
    function ModRotationInitialRandom(player) {
        var _this = _super.call(this, player) || this;
        _this.valueMin = 0; //(radian)
        _this.valueMax = 0;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModRotationInitialRandom.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.valueMin = info.valueMin || 0;
        this.valueMax = info.valueMax || 0;
    };
    ModRotationInitialRandom.prototype._onCreateParticle = function (particle) {
        particle.rotationVel = this.valueMin + (this.valueMax - this.valueMin) * Math.random();
    };
    ModRotationInitialRandom.NAME = "rotation_initial_random";
    return ModRotationInitialRandom;
}(module_1.Module));
exports.ModRotationInitialRandom = ModRotationInitialRandom;
