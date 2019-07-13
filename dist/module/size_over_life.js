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
var ModSizeOverLife = /** @class */ (function (_super) {
    __extends(ModSizeOverLife, _super);
    function ModSizeOverLife(player) {
        var _this = _super.call(this, player) || this;
        _this.sizeBegin = common.Vector.create();
        _this.sizeEnd = common.Vector.create();
        _this.name = ModSizeOverLife.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModSizeOverLife.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var sizeBegin = this.sizeBegin;
        var sizeBeginConfig = info.sizeBegin || common.VECTOR_ZERO;
        sizeBegin[0] = sizeBeginConfig[0] || 0;
        sizeBegin[1] = sizeBeginConfig[1] || 0;
        var sizeEnd = this.sizeEnd;
        var sizeEndConfig = info.sizeEnd || common.VECTOR_ZERO;
        sizeEnd[0] = sizeEndConfig[0] || 0;
        sizeEnd[1] = sizeEndConfig[1] || 0;
    };
    ModSizeOverLife.prototype.update = function () {
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        var sizeBegin = this.sizeBegin;
        var sizeEnd = this.sizeEnd;
        for (var i = 0; i < particleCount; ++i) {
            var particle = particles[i];
            var size = particle.size;
            size[0] = sizeBegin[0] + (sizeEnd[0] - sizeBegin[0]) * (particle.time / particle.life);
            size[1] = sizeBegin[1] + (sizeEnd[1] - sizeBegin[1]) * (particle.time / particle.life);
        }
    };
    ModSizeOverLife.prototype._onCreateParticle = function (particle) {
        if (particle.size) {
            common.Vector.copy(particle.size, this.sizeBegin);
        }
        else {
            particle.size = common.Vector.clone(this.sizeBegin);
        }
    };
    ModSizeOverLife.NAME = "size_over_life";
    return ModSizeOverLife;
}(module_1.Module));
exports.ModSizeOverLife = ModSizeOverLife;
