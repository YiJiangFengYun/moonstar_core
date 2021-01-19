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
exports.ModVelocity = void 0;
var common = require("../common");
var module_1 = require("./module");
var ModVelocity = /** @class */ (function (_super) {
    __extends(ModVelocity, _super);
    function ModVelocity(player) {
        var _this = _super.call(this, player) || this;
        _this._vecHelper = common.Vector.create();
        return _this;
    }
    ModVelocity.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
    };
    ModVelocity.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        for (var i = 0; i < particleCount; ++i) {
            var particle = particles[i];
            var vel = particle.velocity || common.VECTOR_ZERO;
            var orientation_1 = particle.orientation || 0;
            var vecHelper = this._vecHelper;
            common.Vector.rotate(vecHelper, vel, common.VECTOR_ZERO, orientation_1);
            var pos = particle.pos;
            pos[0] = pos[0] + vecHelper[0] * dt;
            pos[1] = pos[1] + vecHelper[1] * dt;
        }
    };
    ModVelocity.NAME = "velocity";
    return ModVelocity;
}(module_1.Module));
exports.ModVelocity = ModVelocity;
//# sourceMappingURL=velocity.js.map