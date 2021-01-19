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
exports.ModVelocityInitialRandom = void 0;
var common = require("../common");
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModVelocityInitialRandom = /** @class */ (function (_super) {
    __extends(ModVelocityInitialRandom, _super);
    function ModVelocityInitialRandom(player) {
        var _this = _super.call(this, player) || this;
        _this.velocityMin = common.Vector.create();
        _this.velocityMax = common.Vector.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModVelocityInitialRandom.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var velMin = this.velocityMin;
        var velMinConfig = info.velocityMin || common.VECTOR_ZERO;
        var velMax = this.velocityMax;
        var velMaxConfig = info.velocityMax || common.VECTOR_ZERO;
        velMin[0] = velMinConfig[0] || 0;
        velMin[1] = velMinConfig[1] || 0;
        velMax[0] = velMaxConfig[0] || 0;
        velMax[1] = velMaxConfig[1] || 0;
    };
    ModVelocityInitialRandom.prototype._onCreateParticle = function (particle) {
        var velMin = this.velocityMin;
        var velMax = this.velocityMax;
        var r = Math.random();
        var x = Math.max(0, velMin[0] + (velMax[0] - velMin[0]) * r);
        var y = Math.max(0, velMin[1] + (velMax[1] - velMin[1]) * r);
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, [x, y]);
        }
        else {
            particle.velocity = common.Vector.clone([x, y]);
        }
    };
    ModVelocityInitialRandom.NAME = "velocity_initial_random";
    return ModVelocityInitialRandom;
}(module_1.Module));
exports.ModVelocityInitialRandom = ModVelocityInitialRandom;
//# sourceMappingURL=velocity_initial_random.js.map