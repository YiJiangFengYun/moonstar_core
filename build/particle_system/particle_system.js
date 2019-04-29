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
var log = require("loglevel");
var space_type_1 = require("../common/space_type");
var draw_data_1 = require("../render/draw_data");
var player_1 = require("../common/player");
var ParticleSystem2D = /** @class */ (function (_super) {
    __extends(ParticleSystem2D, _super);
    function ParticleSystem2D() {
        var _this = _super.call(this) || this;
        _this.space = space_type_1.SpaceID.SPACE_2D;
        _this.drawData = new draw_data_1.DrawData(_this.space);
        _this.components = [];
        _this.emitters = [];
        return _this;
    }
    ParticleSystem2D.prototype.update = function (dt) {
    };
    ParticleSystem2D.prototype.render = function () {
        if (this.renderComponent) {
            this.renderComponent.render();
        }
        else {
            log.warn("The particle system don't own a render component.");
        }
    };
    return ParticleSystem2D;
}(player_1.Player));
exports.ParticleSystem2D = ParticleSystem2D;
var ParticleSystem3D = /** @class */ (function (_super) {
    __extends(ParticleSystem3D, _super);
    function ParticleSystem3D() {
        var _this = _super.call(this) || this;
        _this.space = space_type_1.SpaceID.SPACE_3D;
        _this.drawData = new draw_data_1.DrawData(_this.space);
        _this.components = [];
        _this.emitters = [];
        return _this;
    }
    ParticleSystem3D.prototype.update = function (dt) {
    };
    ParticleSystem3D.prototype.render = function () {
        if (this.renderComponent) {
            this.renderComponent.render();
        }
        else {
            log.warn("The particle system don't own a render component.");
        }
    };
    return ParticleSystem3D;
}(player_1.Player));
exports.ParticleSystem3D = ParticleSystem3D;
//# sourceMappingURL=particle_system.js.map