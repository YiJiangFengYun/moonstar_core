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
var ModSortLineSegment = /** @class */ (function (_super) {
    __extends(ModSortLineSegment, _super);
    function ModSortLineSegment(player) {
        var _this = _super.call(this, player) || this;
        _this.source = common.Vector.create();
        _this.target = common.Vector.create();
        _this._vector = common.Vector.create();
        _this._vecHelper1 = common.Vector.create();
        _this._vecHelper2 = common.Vector.create();
        _this.name = ModSortLineSegment.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onChangeParticle, _this);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, _this._onChangeParticle, _this);
        return _this;
    }
    ModSortLineSegment.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var source = this.source;
        var sourceConfig = info.source || common.VECTOR_ZERO;
        var target = this.target;
        var targetConfig = info.target || common.VECTOR_ZERO;
        source[0] = sourceConfig[0] || 0;
        source[1] = sourceConfig[1] || 0;
        target[0] = targetConfig[0] || 0;
        target[1] = targetConfig[1] || 0;
        var vector = this._vector;
        common.Vector.sub(vector, target, source);
        common.Vector.normalize(vector, vector);
    };
    ModSortLineSegment.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        if (this._changed) {
            //Resort particles
            var player = this.player;
            var particleCount = player.particleCount;
            var particles = player.particles;
            var source_1 = this.source;
            var vector_1 = this._vector;
            var aVector_1 = this._vecHelper1;
            var bVector_1 = this._vecHelper2;
            player.particles = particles.slice(0, particleCount).sort(function (a, b) {
                var Vector = common.Vector;
                Vector.sub(aVector_1, a.pos, source_1);
                Vector.sub(bVector_1, b.pos, source_1);
                var aDot = Vector.dot(aVector_1, vector_1);
                var bDot = Vector.dot(bVector_1, vector_1);
                return aDot - bDot;
            }).concat(particles.slice(particleCount));
            this._changed = false;
        }
    };
    ModSortLineSegment.prototype._onChangeParticle = function () {
        this._changed = true;
    };
    ModSortLineSegment.NAME = "sort_line_segment";
    return ModSortLineSegment;
}(module_1.Module));
exports.ModSortLineSegment = ModSortLineSegment;
