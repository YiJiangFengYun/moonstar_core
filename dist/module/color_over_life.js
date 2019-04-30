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
        var beginColor = this.beginColor || 0;
        var endColor = this.endColor || 0;
        for (var i = 0; i < particleCount; ++i) {
            var particle = particles[i];
            particle.color = beginColor + (endColor - beginColor) * (particle.time / particle.life);
        }
    };
    ModColorOverLife.NAME = "color_over_life";
    return ModColorOverLife;
}(module_1.Module));
exports.ModColorOverLife = ModColorOverLife;
