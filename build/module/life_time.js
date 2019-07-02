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
var log = require("loglevel");
var module_1 = require("./module");
var spawn_1 = require("./spawn");
var ModLifeTime = /** @class */ (function (_super) {
    __extends(ModLifeTime, _super);
    function ModLifeTime(owner) {
        var _this = _super.call(this, owner) || this;
        _this.name = ModLifeTime.NAME;
        owner.on(spawn_1.EVENT_CREATE_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModLifeTime.prototype.init = function () {
    };
    ModLifeTime.prototype.update = function (dt) {
        var owner = this.owner;
        var particles = owner.particles;
        var particleCount = owner.particleCount;
        for (var i = particleCount - 1; i >= 0; --i) {
            var particle = particles[i];
            particle.time = (particle.time || 0) + dt;
            if (particle.time >= particle.life) {
                owner.particleCount = particleCount = this._deleteParticle(particle, particles, particleCount);
            }
        }
    };
    ModLifeTime.prototype._deleteParticle = function (particle, particles, particleCount) {
        var index = particles.indexOf(particle);
        if (index >= 0) {
            var endParticle = particles[--particleCount];
            particles[index] = endParticle;
        }
        else {
            log.error("Can't find the particle from the particles for delete the particle.");
        }
        return particleCount;
    };
    ModLifeTime.prototype._onCreateParticle = function (particle) {
        particle.life = this.life;
    };
    ModLifeTime.NAME = "life_time";
    return ModLifeTime;
}(module_1.Module));
exports.ModLifeTime = ModLifeTime;
//# sourceMappingURL=life_time.js.map