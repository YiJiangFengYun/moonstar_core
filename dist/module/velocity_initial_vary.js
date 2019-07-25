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
var ModVelocityInitialVary = /** @class */ (function (_super) {
    __extends(ModVelocityInitialVary, _super);
    function ModVelocityInitialVary(player) {
        var _this = _super.call(this, player) || this;
        _this.velocityBegin = common.Vector.create();
        _this.velocityEnd = common.Vector.create();
        _this.period = Number.MAX_VALUE;
        _this._velocityHelper = common.Vector.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModVelocityInitialVary.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var velBegin = this.velocityBegin;
        var velEnd = this.velocityEnd;
        var velBeginConfig = info.velocityBegin || common.VECTOR_ZERO;
        var velEndConfig = info.velocityEnd || common.VECTOR_ZERO;
        velBegin[0] = velBeginConfig[0] || 0;
        velBegin[1] = velBeginConfig[1] || 0;
        velEnd[0] = velEndConfig[0] || 0;
        velEnd[1] = velEndConfig[1] || 0;
        this.period = info.period || Number.MAX_VALUE;
        this.trigSmooth = info.trigSmooth || false;
    };
    ModVelocityInitialVary.prototype._onCreateParticle = function (particle) {
        var player = this.player;
        var time = player.time;
        var period = this.period;
        var prog = (time % period) / period;
        var velocityBegin = this.velocityBegin;
        var velocityEnd = this.velocityEnd;
        var velocity = this._velocityHelper;
        if (this.trigSmooth) {
            prog = Math.sin(prog * 2 * Math.PI);
            prog = (prog + 1) / 2;
        }
        else {
            if (prog < 0.5) {
                prog = prog * 2;
            }
            else {
                prog = 2 - prog * 2;
            }
        }
        velocity[0] = velocityBegin[0] + (velocityEnd[0] - velocityBegin[0]) * prog;
        velocity[1] = velocityBegin[1] + (velocityEnd[1] - velocityBegin[1]) * prog;
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, velocity);
        }
        else {
            particle.velocity = common.Vector.clone(velocity);
        }
    };
    ModVelocityInitialVary.NAME = "velocity_initial_vary";
    return ModVelocityInitialVary;
}(module_1.Module));
exports.ModVelocityInitialVary = ModVelocityInitialVary;
