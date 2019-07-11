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
var ModSizeInitialRandom = /** @class */ (function (_super) {
    __extends(ModSizeInitialRandom, _super);
    function ModSizeInitialRandom(player) {
        var _this = _super.call(this, player) || this;
        _this.size = common.Vector.create();
        _this.scaleMinMax = common.Vector.create();
        _this.name = ModSizeInitialRandom.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModSizeInitialRandom.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var size = this.size;
        var scaleMinMax = this.scaleMinMax;
        size[0] = info.width || 0;
        size[1] = info.height || 0;
        scaleMinMax[0] = info.scaleMin || 1;
        scaleMinMax[1] = info.scaleMax || 1;
    };
    ModSizeInitialRandom.prototype._onCreateParticle = function (particle) {
        var scaleMinMax = this.scaleMinMax;
        var scale = scaleMinMax[0] + Math.random() * (scaleMinMax[1] - scaleMinMax[0]);
        if (particle.size) {
            common.Vector.scale(particle.size, this.size, scale);
        }
        else {
            particle.size = common.Vector.clone(this.size);
            common.Vector.scale(particle.size, particle.size, scale);
        }
    };
    ModSizeInitialRandom.NAME = "size_initial_random";
    return ModSizeInitialRandom;
}(module_1.Module));
exports.ModSizeInitialRandom = ModSizeInitialRandom;
