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
var common = require("../common");
var module = require("../module");
var DEFAULT_MAX_PARTICLE_COUNT = 100;
var Emitter = /** @class */ (function (_super) {
    __extends(Emitter, _super);
    function Emitter() {
        var _this = _super.call(this) || this;
        _this.particles = [];
        _this.particleCount = 0;
        _this.modules = [];
        _this.origin = { x: 0, y: 0 };
        _this.rotation = { x: 0, y: 0 };
        _this._maxParticleCount = DEFAULT_MAX_PARTICLE_COUNT;
        _this._id = common.gainID();
        return _this;
    }
    Object.defineProperty(Emitter.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Emitter.prototype.init = function (info) {
        this.maxParticleCount = info.maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
        var modules = this.modules;
        var newModCount = info.modules ? info.modules.length : 0;
        modules.length = newModCount;
        for (var i = 0; i < newModCount; ++i) {
            var moduleClass = module.mapModules[info.modules[i].name];
            if (!moduleClass)
                throw new Error("The module " + info.modules[i].name + " is invalid.");
            modules[i] = new moduleClass(this);
            modules[i].init(info.modules[i]);
            if (module.renderModules.indexOf(moduleClass) > 0) {
                if (this.renderModule) {
                    log.warn("There multiple render modules applied to the emitter.");
                }
                this.renderModule = modules[i];
            }
        }
        this.stop();
    };
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
    Emitter.prototype.stop = function () {
        _super.prototype.stop.call(this);
        this.particleCount = 0;
    };
    return Emitter;
}(common.Player));
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map