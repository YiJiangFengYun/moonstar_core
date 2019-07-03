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
var DEFAULT_MAX_PARTICLE_COUNT = 100;
var Emitter = /** @class */ (function (_super) {
    __extends(Emitter, _super);
    function Emitter(maxParticleCount) {
        var _this = _super.call(this) || this;
        _this.particles = [];
        _this.particleCount = 0;
        _this.modules = [];
        _this.origin = { x: 0, y: 0 };
        _this.rotation = { x: 0, y: 0 };
        _this._maxParticleCount = DEFAULT_MAX_PARTICLE_COUNT;
        _this._maxParticleCount = maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
        return _this;
    }
    Object.defineProperty(Emitter.prototype, "maxParticleCount", {
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
    Emitter.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        if (this.isPlay) {
            this.modules.forEach(function (mod) {
                mod.update(dt);
            });
        }
    };
    return Emitter;
}(common.Player));
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map