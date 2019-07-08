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
var module_1 = require("./module");
var spawn_1 = require("./spawn");
var ModVelocityConstant = /** @class */ (function (_super) {
    __extends(ModVelocityConstant, _super);
    function ModVelocityConstant(owner) {
        var _this = _super.call(this, owner) || this;
        _this.velocity = common.Vector.create();
        _this.name = ModVelocityConstant.NAME;
        owner.on(spawn_1.EVENT_CREATE_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModVelocityConstant.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var vel = this.velocity;
        vel[0] = info.x;
        vel[1] = info.y;
    };
    ModVelocityConstant.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        var owner = this.owner;
        var particles = owner.particles;
        var particleCount = owner.particleCount;
        for (var i = 0; i < particleCount; ++i) {
            var particle_1 = particles[i];
            var vel = particle_1.velocity;
            var pos = particle_1.pos;
            pos[0] = pos[0] + vel[0] * dt;
            pos[1] = pos[1] + vel[1] * dt;
        }
    };
    ModVelocityConstant.prototype._onCreateParticle = function (particle) {
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, this.velocity);
        }
        else {
            particle.velocity = common.Vector.clone(this.velocity);
        }
    };
    ModVelocityConstant.NAME = "velocity_constant";
    return ModVelocityConstant;
}(module_1.Module));
exports.ModVelocityConstant = ModVelocityConstant;
//# sourceMappingURL=velocity_constant.js.map