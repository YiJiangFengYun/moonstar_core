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
var ModColorInitialRandom = /** @class */ (function (_super) {
    __extends(ModColorInitialRandom, _super);
    function ModColorInitialRandom(player) {
        var _this = _super.call(this, player) || this;
        _this.colorMin = common.Color.create();
        _this.colorMax = common.Color.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModColorInitialRandom.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var colorMin = this.colorMin;
        var colorMinConfig = info.colorMin || common.COLOR_BLACK;
        var colorMax = this.colorMax;
        var colorMaxConfig = info.colorMax || common.COLOR_WHITE;
        colorMin[0] = colorMinConfig[0];
        colorMin[1] = colorMinConfig[1];
        colorMin[2] = colorMinConfig[2];
        colorMin[3] = colorMinConfig[3];
        colorMax[0] = colorMaxConfig[0];
        colorMax[1] = colorMaxConfig[1];
        colorMax[2] = colorMaxConfig[2];
        colorMax[3] = colorMaxConfig[3];
        this.channelSame = info.channelSame || false;
    };
    ModColorInitialRandom.prototype._onCreateParticle = function (particle) {
        var color = [0, 0, 0, 0];
        var colorMin = this.colorMin;
        var colorMax = this.colorMax;
        if (this.channelSame) {
            var r = Math.random();
            color[0] = colorMin[0] + (colorMax[0] - colorMin[0]) * r;
            color[1] = colorMin[1] + (colorMax[1] - colorMin[1]) * r;
            color[2] = colorMin[2] + (colorMax[2] - colorMin[2]) * r;
            color[3] = colorMin[3] + (colorMax[3] - colorMin[3]) * r;
        }
        else {
            color[0] = colorMin[0] + (colorMax[0] - colorMin[0]) * Math.random();
            color[1] = colorMin[1] + (colorMax[1] - colorMin[1]) * Math.random();
            color[2] = colorMin[2] + (colorMax[2] - colorMin[2]) * Math.random();
            color[3] = colorMin[3] + (colorMax[3] - colorMin[3]) * Math.random();
        }
        if (particle.color) {
            common.Color.copy(particle.color, color);
        }
        else {
            particle.color = common.Color.clone(color);
        }
    };
    ModColorInitialRandom.NAME = "color_initial_random";
    return ModColorInitialRandom;
}(module_1.Module));
exports.ModColorInitialRandom = ModColorInitialRandom;
