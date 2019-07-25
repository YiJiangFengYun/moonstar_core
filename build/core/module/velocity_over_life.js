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
var ModVelocityOverLife = /** @class */ (function (_super) {
    __extends(ModVelocityOverLife, _super);
    function ModVelocityOverLife(player) {
        var _this = _super.call(this, player) || this;
        _this.velocityBegin = common.Vector.create();
        _this.velocityEnd = common.Vector.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModVelocityOverLife.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var velBegin = this.velocityBegin;
        var velEnd = this.velocityEnd;
        var velBeginConfig = info.velocityBegin || common.VECTOR_ZERO;
        var velEndConfig = info.velocityEnd || common.VECTOR_ZERO;
        velBegin[0] = velBeginConfig[0] || 0;
        velBegin[1] = velBeginConfig[1] || 0;
        velEnd[0] = velEndConfig[0] || 0;
        velEnd[1] = velEndConfig[1] || 0;
    };
    ModVelocityOverLife.prototype.update = function () {
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        var velocityBegin = this.velocityBegin;
        var velocityEnd = this.velocityEnd;
        for (var i = 0; i < particleCount; ++i) {
            var particle = particles[i];
            var velocity = particle.velocity;
            var life = particle.life;
            velocity[0] = velocityBegin[0] + (velocityEnd[0] - velocityBegin[0]) * life;
            velocity[1] = velocityBegin[1] + (velocityEnd[1] - velocityBegin[1]) * life;
        }
    };
    ModVelocityOverLife.prototype._onCreateParticle = function (particle) {
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, this.velocityBegin);
        }
        else {
            particle.velocity = common.Vector.clone(this.velocityBegin);
        }
    };
    ModVelocityOverLife.NAME = "velocity_over_life";
    return ModVelocityOverLife;
}(module_1.Module));
exports.ModVelocityOverLife = ModVelocityOverLife;
//# sourceMappingURL=velocity_over_life.js.map