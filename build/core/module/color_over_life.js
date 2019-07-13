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
var ModColorOverLife = /** @class */ (function (_super) {
    __extends(ModColorOverLife, _super);
    function ModColorOverLife(player) {
        var _this = _super.call(this, player) || this;
        _this.name = ModColorOverLife.NAME;
        _this.colorBegin = common.Color.create();
        _this.colorEnd = common.Color.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModColorOverLife.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var colorBegin = this.colorBegin;
        var colorBeginConfig = info.colorBegin || common.COLOR_WHITE;
        var colorEnd = this.colorEnd;
        var colorEndConfig = info.colorEnd || common.COLOR_WHITE;
        colorBegin[0] = colorBeginConfig[0];
        colorBegin[1] = colorBeginConfig[1];
        colorBegin[2] = colorBeginConfig[2];
        colorBegin[3] = colorBeginConfig[3];
        colorEnd[0] = colorEndConfig[0];
        colorEnd[1] = colorEndConfig[1];
        colorEnd[2] = colorEndConfig[2];
        colorEnd[3] = colorEndConfig[3];
    };
    ModColorOverLife.prototype.update = function () {
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        var colorBegin = this.colorBegin || common.COLOR_WHITE;
        var colorEnd = this.colorEnd || common.COLOR_WHITE;
        var beginColorR = colorBegin[0];
        var beginColorG = colorBegin[1];
        var beginColorB = colorBegin[2];
        var beginColorA = colorBegin[3];
        var endColorR = colorEnd[0];
        var endColorG = colorEnd[1];
        var endColorB = colorEnd[2];
        var endColorA = colorEnd[3];
        for (var i = 0; i < particleCount; ++i) {
            var particle = particles[i];
            var color = particle.color;
            if (!color)
                particle.color = color = common.Color.create();
            color[0] = beginColorR + (endColorR - beginColorR) * (particle.time / particle.life);
            color[1] = beginColorG + (endColorG - beginColorG) * (particle.time / particle.life);
            color[2] = beginColorB + (endColorB - beginColorB) * (particle.time / particle.life);
            color[3] = beginColorA + (endColorA - beginColorA) * (particle.time / particle.life);
        }
    };
    ModColorOverLife.prototype._onCreateParticle = function (particle) {
        if (particle.color) {
            common.Color.copy(particle.color, this.colorBegin);
        }
        else {
            particle.color = common.Color.clone(this.colorBegin);
        }
    };
    ModColorOverLife.NAME = "color_over_life";
    return ModColorOverLife;
}(module_1.Module));
exports.ModColorOverLife = ModColorOverLife;
//# sourceMappingURL=color_over_life.js.map