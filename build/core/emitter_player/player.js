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
var events_1 = require("./events");
var DEFAULT_MAX_PARTICLE_COUNT = 100;
var EmitterPlayer = /** @class */ (function (_super) {
    __extends(EmitterPlayer, _super);
    function EmitterPlayer() {
        var _this = _super.call(this) || this;
        _this.particles = [];
        _this.particleCount = 0;
        _this.players = [];
        _this.playerCount = 0;
        _this.origin = common.Vector.create();
        _this.rotation = 0;
        _this._maxParticleCount = DEFAULT_MAX_PARTICLE_COUNT;
        return _this;
    }
    EmitterPlayer.prototype.init = function (info) {
        this.maxParticleCount = info.maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
        this._reset();
    };
    Object.defineProperty(EmitterPlayer.prototype, "maxParticleCount", {
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
    EmitterPlayer.prototype.stop = function () {
        _super.prototype.stop.call(this);
    };
    EmitterPlayer.prototype.addPlayer = function (player) {
        this.players[this.playerCount++] = player;
    };
    EmitterPlayer.prototype.startEmit = function () {
        if (!this.emitted) {
            this.emitted = true;
            this.emitComplete = false;
            this.completed = false;
            this.emit(events_1.EVENT_START_EMITT, this);
        }
    };
    EmitterPlayer.prototype.endEmit = function () {
        if (this.emitComplete) {
            this.emitComplete = true;
            this.emit(events_1.EVENT_END_EMITT, this);
        }
    };
    EmitterPlayer.prototype.checkComplete = function () {
        if (this.emitted && this.emitComplete && this.particleCount <= 0)
            return true;
        return false;
    };
    EmitterPlayer.prototype.complete = function () {
        if (!this.completed) {
            this.completed = true;
            this.emit(events_1.EVENT_COMPLETE, this);
        }
    };
    EmitterPlayer.prototype._reset = function () {
        _super.prototype._reset.call(this);
        this.emitted = false;
        this.emitComplete = false;
        this.completed = false;
        this.particleCount = 0;
    };
    return EmitterPlayer;
}(common.Player));
exports.EmitterPlayer = EmitterPlayer;
//# sourceMappingURL=player.js.map