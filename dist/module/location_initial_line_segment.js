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
exports.ModLocationInitialLineSegment = void 0;
var common = require("../common");
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModLocationInitialLineSegment = /** @class */ (function (_super) {
    __extends(ModLocationInitialLineSegment, _super);
    function ModLocationInitialLineSegment(player) {
        var _this = _super.call(this, player) || this;
        _this.source = common.Vector.create();
        _this.target = common.Vector.create();
        _this.bias = 0;
        _this._vector = common.Vector.create();
        _this._vecPerpendicular = common.Vector.create();
        _this._vecHelper = common.Vector.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModLocationInitialLineSegment.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var source = this.source;
        var sourceConfig = info.source || common.VECTOR_ZERO;
        var target = this.target;
        var targetConfig = info.target || common.VECTOR_ZERO;
        source[0] = sourceConfig[0] || 0;
        source[1] = sourceConfig[1] || 0;
        target[0] = targetConfig[0] || 0;
        target[1] = targetConfig[1] || 0;
        this.bias = info.bias || 0;
        var vector = this._vector;
        common.Vector.sub(vector, target, source);
        var vecPerpendicular = this._vecPerpendicular;
        common.Vector.set(vecPerpendicular, -vector[1], vector[0]);
        common.Vector.normalize(vecPerpendicular, vecPerpendicular);
    };
    ModLocationInitialLineSegment.prototype._onCreateParticle = function (particle) {
        var source = this.source;
        var bias = this.bias;
        var r = Math.random();
        var rBias = Math.random() * 2 - 1;
        var vecHelper = this._vecHelper;
        var vector = this._vector;
        var vecPerpendicular = this._vecPerpendicular;
        common.Vector.scaleAndAdd(vecHelper, source, vector, r);
        common.Vector.scaleAndAdd(vecHelper, vecHelper, vecPerpendicular, bias * rBias);
        var pos = this.player.position;
        var x = pos[0] + vecHelper[0];
        var y = pos[1] + vecHelper[1];
        if (particle.pos) {
            common.Vector.set(particle.pos, x, y);
        }
        else {
            particle.pos = common.Vector.fromValues(x, y);
        }
    };
    ModLocationInitialLineSegment.NAME = "location_initial_line_segment";
    return ModLocationInitialLineSegment;
}(module_1.Module));
exports.ModLocationInitialLineSegment = ModLocationInitialLineSegment;
