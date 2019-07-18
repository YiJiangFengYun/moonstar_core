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
var module_1 = require("./module");
var ModLifeTime = /** @class */ (function (_super) {
    __extends(ModLifeTime, _super);
    function ModLifeTime(player) {
        var _this = _super.call(this, player) || this;
        _this.name = ModLifeTime.NAME;
        return _this;
    }
    ModLifeTime.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
    };
    ModLifeTime.prototype.update = function (dt) {
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        for (var i = particleCount - 1; i >= 0; --i) {
            var particle = particles[i];
            particle.time = particle.time + dt;
            if (particle.time >= particle.lifeTime) {
                particle.life = 1;
                player.deleteParticle(particle);
            }
            else {
                particle.life = particle.time / particle.lifeTime;
            }
        }
        if (!player.completed && player.checkComplete()) {
            player.complete();
        }
    };
    ModLifeTime.NAME = "life_time";
    return ModLifeTime;
}(module_1.Module));
exports.ModLifeTime = ModLifeTime;
