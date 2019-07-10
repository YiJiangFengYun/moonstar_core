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
var particleMod = require("../particle");
var common = require("../common");
var module_1 = require("./module");
var ModSpawn = /** @class */ (function (_super) {
    __extends(ModSpawn, _super);
    function ModSpawn(player) {
        var _this = _super.call(this, player) || this;
        _this._remainTime = 0;
        _this.name = ModSpawn.NAME;
        return _this;
    }
    ModSpawn.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this._remainTime = 0;
        this.interval = info.rate > 0 ? 1 / info.rate : Number.MAX_VALUE;
        this.duration = info.duration > 0 ? info.duration : Number.MAX_VALUE;
    };
    ModSpawn.prototype.update = function (dt) {
        dt = Math.min(dt, this.duration - this.player.time);
        if (this.interval && dt > 0) {
            var interval = this.interval;
            dt = this._remainTime + dt;
            var pCount = Math.ceil(dt / interval);
            this._remainTime = dt % interval - interval;
            while (pCount > 0) {
                this._createParticle();
                --pCount;
            }
        }
    };
    ModSpawn.prototype._createParticle = function () {
        var particle;
        var emitter = this.player;
        if (emitter.particleCount < emitter.maxParticleCount) {
            particle = emitter.particles[emitter.particleCount];
            if (!particle)
                emitter.particles[emitter.particleCount] =
                    particle = { pos: common.Vector.create() };
            ++emitter.particleCount;
            common.Vector.set(particle.pos, 0, 0);
            emitter.emit(particleMod.EVENT_CREATED_PARTICLE, particle);
        }
    };
    ModSpawn.NAME = "spawn";
    return ModSpawn;
}(module_1.Module));
exports.ModSpawn = ModSpawn;
