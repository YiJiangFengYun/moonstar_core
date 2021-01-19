"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterPlayer = void 0;
var common = require("../common");
var particleMod = require("../particle");
var psDataMod = require("../ps_data");
var events = require("./events");
var DEFAULT_MAX_PARTICLE_COUNT = 100;
var EmitterPlayer = /** @class */ (function (_super) {
    __extends(EmitterPlayer, _super);
    function EmitterPlayer(psData) {
        var _this = _super.call(this) || this;
        _this.particles = [];
        _this.particleCount = 0;
        _this._particleSeq = 0;
        _this.players = [];
        _this.playerCount = 0;
        _this.bounds = common.Bounds.create();
        _this.globalBounds = common.Bounds.create();
        _this._position = common.Vector.create();
        _this._rotation = 0;
        _this._maxParticleCount = DEFAULT_MAX_PARTICLE_COUNT;
        _this._globalPositionHelper = common.Vector.create();
        _this._id = common.gainID();
        _this.psData = psData;
        _this.psData.on(psDataMod.EVENT_CHANGE_POSITION, _this._onPSDataChangePos, _this);
        _this._updateGlobalPosition();
        return _this;
    }
    Object.defineProperty(EmitterPlayer.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    EmitterPlayer.prototype.init = function (info, root) {
        this.root = root;
        this._maxParticleCount = info.maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
        this._prepareParticles();
        var boundsInfo = info.bounds;
        if (boundsInfo)
            common.Bounds.set(this.bounds, boundsInfo[0], boundsInfo[1], boundsInfo[2], boundsInfo[3]);
        this._reset();
        this._updateGlobalBounds();
    };
    Object.defineProperty(EmitterPlayer.prototype, "maxParticleCount", {
        get: function () {
            return this._maxParticleCount;
        },
        enumerable: false,
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
            this.emit(events.EVENT_START_EMITT, this);
        }
    };
    EmitterPlayer.prototype.endEmit = function () {
        if (!this.emitComplete) {
            this.emitComplete = true;
            this.emit(events.EVENT_END_EMITT, this);
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
            this.emit(events.EVENT_COMPLETE, this);
        }
    };
    Object.defineProperty(EmitterPlayer.prototype, "position", {
        get: function () {
            var psData = this.psData;
            if (psData.useLocalSpace) {
                // If use local space, the position of the emitter is relative to the particle system.
                return this._globalPositionHelper;
            }
            else {
                // If not use local space, the position of the emitter is global, but the _position
                // of the root emiiter is relative to the particle system.
                if (this.root) {
                    return this._globalPositionHelper;
                }
                else {
                    return this._position;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmitterPlayer.prototype, "rotation", {
        get: function () {
            var psData = this.psData;
            if (psData.useLocalSpace) {
                // If use local space, the rotation of the emitter is relative to the particle system.
                // return 0 + this._rotation;
                return this._rotation;
            }
            else {
                // If not use local space, the position of the emitter is global, but the _rotation of the
                // the root emitter is relative to the particle system.
                if (this.root) {
                    // Now the particle system don't own its rotation.
                    // return 0 + this._rotation;
                    return this._rotation;
                }
                else {
                    return this._rotation;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    EmitterPlayer.prototype.setPosition = function (value) {
        common.Vector.copy(this._position, value);
        this._updateGlobalBounds();
        this.emit(events.EVENT_CHANGE_POSITION, this);
    };
    EmitterPlayer.prototype.createParticle = function (pos) {
        var particle;
        if (this.particleCount < this.maxParticleCount) {
            particle = this.particles[this.particleCount];
            if (!particle) {
                particle = particleMod.createParticle(++this._particleSeq);
                this.particles[this.particleCount] = particle;
            }
            else {
                particle.seq = ++this._particleSeq;
            }
            ++this.particleCount;
            if (particle.pos) {
                common.Vector.copy(particle.pos, pos || this.position);
                // common.Vector.set(particle.pos, 0, 0);
            }
            else {
                particle.pos = common.Vector.clone(pos || this.position);
                // particle.pos = common.Vector.fromValues(0, 0);
            }
            this.emit(events.EVENT_CREATED_PARTICLE, particle);
        }
        return particle;
    };
    EmitterPlayer.prototype.deleteParticle = function (particle) {
        var particles = this.particles;
        var index = particles.indexOf(particle);
        if (index >= 0) {
            var end = --this.particleCount;
            var endParticle = particles[end];
            particles[end] = particles[index];
            particles[index] = endParticle;
            this.emit(events.EVENT_DESTROYED_PARTICLE, particle);
            return true;
        }
        else {
            console.error("Can't find the particle from the particles for delete the particle.");
            return false;
        }
    };
    EmitterPlayer.prototype._reset = function () {
        _super.prototype._reset.call(this);
        this.emitted = false;
        this.emitComplete = false;
        this.completed = false;
        this.particleCount = 0;
        this._particleSeq = 0;
        var playerCount = this.playerCount;
        var players = this.players;
        for (var i = 0; i < playerCount; ++i) {
            players[i].reset();
        }
        this.emit(events.EVENT_RESET, this);
    };
    EmitterPlayer.prototype._prepareParticles = function () {
        var particleCount = this._maxParticleCount;
        var particles = this.particles;
        particles.length = particleCount;
        for (var i = 0; i < particleCount; ++i) {
            if (!particles[i])
                particles[i] = particleMod.createParticle(0);
        }
    };
    EmitterPlayer.prototype._updateGlobalBounds = function () {
        var psData = this.psData;
        var pos;
        if (psData.useLocalSpace || this.root) {
            pos = this._globalPositionHelper;
        }
        else {
            pos = this.position;
        }
        common.Bounds.translate(this.globalBounds, this.bounds, pos);
    };
    EmitterPlayer.prototype._updateGlobalPosition = function () {
        var psData = this.psData;
        if (psData.useLocalSpace || this.root) {
            common.Vector.transformMat2d(this._globalPositionHelper, this._position, psData.matrix);
            this._updateGlobalBounds();
        }
    };
    EmitterPlayer.prototype._onPSDataChangePos = function () {
        this._updateGlobalPosition();
    };
    return EmitterPlayer;
}(common.Player));
exports.EmitterPlayer = EmitterPlayer;
