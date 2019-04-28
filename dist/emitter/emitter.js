"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_MAX_PARTICLE_COUNT = 100;
var Emitter2D = /** @class */ (function () {
    function Emitter2D(material, maxParticleCount) {
        this.particles = [];
        this._maxParticleCount = DEFAULT_MAX_PARTICLE_COUNT;
        this.material = material;
        this._maxParticleCount = maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
    }
    Object.defineProperty(Emitter2D.prototype, "maxParticleCount", {
        get: function () {
            return this._maxParticleCount;
        },
        set: function (value) {
            value = value || DEFAULT_MAX_PARTICLE_COUNT;
            this.particles.length = value;
            this._maxParticleCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Emitter2D.prototype.update = function (dt) {
    };
    return Emitter2D;
}());
exports.Emitter2D = Emitter2D;
var Emitter3D = /** @class */ (function () {
    function Emitter3D(material, maxParticleCount) {
        this.particles = [];
        this._maxParticleCount = DEFAULT_MAX_PARTICLE_COUNT;
        this.material = material;
        this._maxParticleCount = maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
    }
    Object.defineProperty(Emitter3D.prototype, "maxParticleCount", {
        get: function () {
            return this._maxParticleCount;
        },
        set: function (value) {
            value = value || DEFAULT_MAX_PARTICLE_COUNT;
            this.particles.length = value;
            this._maxParticleCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Emitter3D.prototype.update = function (dt) {
    };
    return Emitter3D;
}());
exports.Emitter3D = Emitter3D;
