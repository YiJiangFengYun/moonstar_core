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
var ModRotation = /** @class */ (function (_super) {
    __extends(ModRotation, _super);
    function ModRotation(player) {
        return _super.call(this, player) || this;
    }
    ModRotation.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
    };
    ModRotation.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        for (var i = 0; i < particleCount; ++i) {
            var particle = particles[i];
            var vel = particle.rotationVel || 0;
            var rotation = particle.rotation || 0;
            particle.rotation = rotation + vel * dt;
        }
    };
    ModRotation.NAME = "rotation";
    return ModRotation;
}(module_1.Module));
exports.ModRotation = ModRotation;
//# sourceMappingURL=rotation.js.map