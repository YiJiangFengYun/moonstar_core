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
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModLifeTimeRandom = /** @class */ (function (_super) {
    __extends(ModLifeTimeRandom, _super);
    function ModLifeTimeRandom(player) {
        var _this = _super.call(this, player) || this;
        _this.name = ModLifeTimeRandom.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModLifeTimeRandom.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.lifeMin = info.lifeMin || 0;
        this.lifeMax = info.lifeMax || Number.MAX_VALUE;
    };
    ModLifeTimeRandom.prototype.update = function (dt) {
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        for (var i = particleCount - 1; i >= 0; --i) {
            var particle = particles[i];
            particle.time = (particle.time || 0) + dt;
            if (particle.time >= particle.life) {
                player.particleCount = particleCount = this._deleteParticle(particle, particles, particleCount);
            }
        }
        if (!player.completed && player.checkComplete()) {
            player.complete();
        }
    };
    ModLifeTimeRandom.prototype._deleteParticle = function (particle, particles, particleCount) {
        var index = particles.indexOf(particle);
        if (index >= 0) {
            var end = --particleCount;
            var endParticle = particles[end];
            particles[end] = particles[index];
            particles[index] = endParticle;
            this.player.emit(emitterPlayer.EVENT_DESTROYED_PARTICLE, particle);
        }
        else {
            log.error("Can't find the particle from the particles for delete the particle.");
        }
        return particleCount;
    };
    ModLifeTimeRandom.prototype._onCreateParticle = function (particle) {
        particle.life = this.lifeMin + (this.lifeMax - this.lifeMin) * Math.random();
        particle.time = 0;
    };
    ModLifeTimeRandom.NAME = "life_time_random";
    return ModLifeTimeRandom;
}(module_1.Module));
exports.ModLifeTimeRandom = ModLifeTimeRandom;
