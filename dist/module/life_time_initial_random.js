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
exports.ModLifeTimeInitialRandom = void 0;
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModLifeTimeInitialRandom = /** @class */ (function (_super) {
    __extends(ModLifeTimeInitialRandom, _super);
    function ModLifeTimeInitialRandom(player) {
        var _this = _super.call(this, player) || this;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModLifeTimeInitialRandom.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.lifeMin = info.lifeMin || 0;
        this.lifeMax = info.lifeMax || Number.MAX_VALUE;
    };
    ModLifeTimeInitialRandom.prototype._onCreateParticle = function (particle) {
        particle.lifeTime = this.lifeMin + (this.lifeMax - this.lifeMin) * Math.random();
        particle.time = 0;
        particle.life = 0;
    };
    ModLifeTimeInitialRandom.NAME = "life_time_initial_random";
    return ModLifeTimeInitialRandom;
}(module_1.Module));
exports.ModLifeTimeInitialRandom = ModLifeTimeInitialRandom;
