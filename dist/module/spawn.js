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
exports.EVENT_CREATE_PARTICLE = "create_particle";
var ModSpawn = /** @class */ (function (_super) {
    __extends(ModSpawn, _super);
    function ModSpawn(owner) {
        var _this = _super.call(this, owner) || this;
        _this._remainTime = 0;
        _this.name = ModSpawn.NAME;
        return _this;
    }
    ModSpawn.prototype.init = function () {
        this._remainTime = 0;
    };
    ModSpawn.prototype.update = function (dt) {
        if (this.interval) {
            var interval = this.interval;
            dt = this._remainTime + dt;
            var pCount = Math.floor(dt / interval);
            this._remainTime = dt % interval;
            while (pCount > 0) {
                this._createParticle();
                --pCount;
            }
        }
    };
    ModSpawn.prototype._createParticle = function () {
        var particle = {};
        var emitter = this.owner;
        if (emitter.particleCount < emitter.maxParticleCount) {
            emitter.particles[emitter.particleCount++] = particle;
        }
        emitter.emit(exports.EVENT_CREATE_PARTICLE, particle);
        return particle;
    };
    ModSpawn.NAME = "Spawn";
    return ModSpawn;
}(module_1.Module));
exports.ModSpawn = ModSpawn;
