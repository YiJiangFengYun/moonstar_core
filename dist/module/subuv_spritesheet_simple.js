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
var ModSubUVSpriteSheetSimple = /** @class */ (function (_super) {
    __extends(ModSubUVSpriteSheetSimple, _super);
    function ModSubUVSpriteSheetSimple(player) {
        var _this = _super.call(this, player) || this;
        /**
         * UV Size of one frame.
         */
        _this.frameUVSize = common.Vector.create();
        _this.name = ModSubUVSpriteSheetSimple.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModSubUVSpriteSheetSimple.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.frameUVSize[0] = info.uvSize[0];
        this.frameUVSize[1] = info.uvSize[1];
        this.frameInterval = info.frameRate > 0 ? 1 / info.frameRate : Number.MAX_VALUE;
        this.times = info.times || 0;
        this._colSize = Math.floor(1 / info.uvSize[0]);
        this._rowSize = Math.floor(1 / info.uvSize[1]);
        this._totalFrames = this._colSize * this._rowSize;
    };
    ModSubUVSpriteSheetSimple.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        var times = this.times;
        var frameInterval = this.frameInterval;
        var totalFrames = this._totalFrames;
        for (var i = 0; i < particleCount; ++i) {
            var particle = particles[i];
            var framePastTime = player.time - particle.startFrameTime;
            var frame = Math.floor(framePastTime / frameInterval);
            var playTimes = Math.floor(frame / totalFrames);
            if (times && playTimes >= times) {
                playTimes = times;
                frame = totalFrames - 1;
            }
            else {
                frame = frame % totalFrames;
            }
            if (particle.currFrame !== frame || particle.currTimes !== playTimes) {
                particle.currFrame = frame;
                particle.currTimes = playTimes;
                this._updateParticleSubUV(particle);
            }
        }
    };
    ModSubUVSpriteSheetSimple.prototype._onCreateParticle = function (particle) {
        particle.currFrame = 0;
        particle.currTimes = 0;
        particle.startFrameTime = this.player.time;
        this._updateParticleSubUV(particle);
    };
    ModSubUVSpriteSheetSimple.prototype._updateParticleSubUV = function (particle) {
        var currFrame = particle.currFrame;
        var frameUVSize = this.frameUVSize;
        var colSize = this._colSize;
        var colIndex = currFrame % colSize;
        var rowIndex = Math.floor(currFrame / colSize);
        var uL = colIndex * frameUVSize[0];
        var vT = rowIndex * frameUVSize[1];
        var uR = uL + frameUVSize[0];
        var vB = vT + frameUVSize[1];
        if (particle.subUV) {
            common.Vector4.copy(particle.subUV, [
                uL,
                vT,
                uR,
                vB,
            ]);
        }
        else {
            particle.subUV = common.Vector4.fromValues(uL, vT, uR, vB);
        }
    };
    ModSubUVSpriteSheetSimple.NAME = "subuv_spritesheet_simple";
    return ModSubUVSpriteSheetSimple;
}(module_1.Module));
exports.ModSubUVSpriteSheetSimple = ModSubUVSpriteSheetSimple;
