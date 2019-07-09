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
var module_1 = require("./module");
var spawn_1 = require("./spawn");
var ModColorOverLife = /** @class */ (function (_super) {
    __extends(ModColorOverLife, _super);
    function ModColorOverLife(owner) {
        var _this = _super.call(this, owner) || this;
        _this.name = ModColorOverLife.NAME;
        _this.beginColor = common.Color.create();
        _this.endColor = common.Color.create();
        owner.on(spawn_1.EVENT_CREATE_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModColorOverLife.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var beginColor = this.beginColor;
        var endColor = this.endColor;
        beginColor[0] = info.beginColorR || 0;
        beginColor[1] = info.beginColorG || 0;
        beginColor[2] = info.beginColorB || 0;
        beginColor[3] = info.beginColorA || 0;
        endColor[0] = info.endColorR || 0;
        endColor[1] = info.endColorG || 0;
        endColor[2] = info.endColorB || 0;
        endColor[3] = info.endColorA || 0;
    };
    ModColorOverLife.prototype.update = function () {
        var owner = this.owner;
        var particles = owner.particles;
        var particleCount = owner.particleCount;
        var beginColor = this.beginColor || common.COLOR_WHITE;
        var endColor = this.endColor || common.COLOR_WHITE;
        var beginColorR = beginColor[0];
        var beginColorG = beginColor[1];
        var beginColorB = beginColor[2];
        var beginColorA = beginColor[3];
        var endColorR = endColor[0];
        var endColorG = endColor[1];
        var endColorB = endColor[2];
        var endColorA = endColor[3];
        for (var i = 0; i < particleCount; ++i) {
            var particle_1 = particles[i];
            var color = particle_1.color;
            if (!color)
                particle_1.color = color = common.Color.create();
            color[0] = beginColorR + (endColorR - beginColorR) * (particle_1.time / particle_1.life);
            color[1] = beginColorG + (endColorG - beginColorG) * (particle_1.time / particle_1.life);
            color[2] = beginColorB + (endColorB - beginColorB) * (particle_1.time / particle_1.life);
            color[3] = beginColorA + (endColorA - beginColorA) * (particle_1.time / particle_1.life);
        }
    };
    ModColorOverLife.prototype._onCreateParticle = function (particle) {
        if (particle.color) {
            common.Color.copy(particle.color, this.beginColor);
        }
        else {
            particle.color = common.Color.clone(this.beginColor);
        }
    };
    ModColorOverLife.NAME = "color_over_life";
    return ModColorOverLife;
}(module_1.Module));
exports.ModColorOverLife = ModColorOverLife;
//# sourceMappingURL=color_over_life.js.map