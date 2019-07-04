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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("../common");
var module_1 = require("./module");
var ModColorOverLife = /** @class */ (function (_super) {
    __extends(ModColorOverLife, _super);
    function ModColorOverLife(owner) {
        var _this = _super.call(this, owner) || this;
        _this.name = ModColorOverLife.NAME;
        return _this;
    }
    ModColorOverLife.prototype.init = function () {
    };
    ModColorOverLife.prototype.update = function () {
        var owner = this.owner;
        var particles = owner.particles;
        var particleCount = owner.particleCount;
        var beginColor = this.beginColor || common.WHITE;
        var endColor = this.endColor || common.WHITE;
        var beginColorR = beginColor.r;
        var beginColorG = beginColor.g;
        var beginColorB = beginColor.b;
        var beginColorA = beginColor.a;
        var endColorR = endColor.r;
        var endColorG = endColor.g;
        var endColorB = endColor.b;
        var endColorA = endColor.a;
        for (var i = 0; i < particleCount; ++i) {
            var particle_1 = particles[i];
            var color = particle_1.color;
            if (!color)
                particle_1.color = color = __assign({}, common.WHITE);
            color.r = beginColorR + (endColorR - beginColorR) * (particle_1.time / particle_1.life);
            color.g = beginColorG + (endColorG - beginColorG) * (particle_1.time / particle_1.life);
            color.b = beginColorB + (endColorB - beginColorB) * (particle_1.time / particle_1.life);
            color.a = beginColorA + (endColorA - beginColorA) * (particle_1.time / particle_1.life);
        }
    };
    ModColorOverLife.NAME = "color_over_life";
    return ModColorOverLife;
}(module_1.Module));
exports.ModColorOverLife = ModColorOverLife;
//# sourceMappingURL=color_over_life.js.map