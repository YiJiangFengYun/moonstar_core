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
var ModVelocityConstantRandom = /** @class */ (function (_super) {
    __extends(ModVelocityConstantRandom, _super);
    function ModVelocityConstantRandom(player) {
        var _this = _super.call(this, player) || this;
        _this.velocityMin = common.Vector.create();
        _this.velocityMax = common.Vector.create();
        _this._vecHelper = common.Vector.create();
        _this.name = ModVelocityConstantRandom.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModVelocityConstantRandom.prototype.init = function (info) {
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
    ModVelocityConstantRandom.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        for (var i = 0; i < particleCount; ++i) {
            var particle = particles[i];
            var vel = particle.velocity;
            var orientation_1 = particle.orientation || 0;
            var vecHelper = this._vecHelper;
            common.Vector.rotate(vecHelper, vel, common.VECTOR_ZERO, orientation_1);
            var pos = particle.pos;
            pos[0] = pos[0] + vecHelper[0] * dt;
            pos[1] = pos[1] + vecHelper[1] * dt;
        }
    };
    ModVelocityConstantRandom.prototype._onCreateParticle = function (particle) {
        var velMin = this.velocityMin;
        var velMax = this.velocityMax;
        var r = Math.random();
        var x = Math.max(0, velMin[0] + (velMax[0] - velMin[0]) * r);
        var y = Math.max(0, velMin[1] + (velMax[1] - velMin[0]) * r);
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, [x, y]);
        }
        else {
            particle.velocity = common.Vector.clone([x, y]);
        }
    };
    ModVelocityConstantRandom.NAME = "velocity_constant_random";
    return ModVelocityConstantRandom;
}(module_1.Module));
exports.ModVelocityConstantRandom = ModVelocityConstantRandom;
//# sourceMappingURL=velocity_constant_random.js.map