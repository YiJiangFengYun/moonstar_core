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
var ModLocationInitialCircleBorder = /** @class */ (function (_super) {
    __extends(ModLocationInitialCircleBorder, _super);
    function ModLocationInitialCircleBorder(player) {
        var _this = _super.call(this, player) || this;
        _this.radius = 0;
        _this.name = ModLocationInitialCircleBorder.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModLocationInitialCircleBorder.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.radius = info.radius || 0;
    };
    ModLocationInitialCircleBorder.prototype._onCreateParticle = function (particle) {
        var r = this.radius;
        var randomAngle = Math.random() * 2 * Math.PI;
        var pos = this.player.position;
        if (particle.pos) {
            common.Vector.set(particle.pos, pos[0] + Math.cos(randomAngle) * r, pos[1] + Math.sin(randomAngle) * r);
        }
        else {
            particle.pos = common.Vector.fromValues(pos[0] + Math.cos(randomAngle) * r, pos[1] + Math.sin(randomAngle) * r);
        }
    };
    ModLocationInitialCircleBorder.NAME = "location_initial_circle_border";
    return ModLocationInitialCircleBorder;
}(module_1.Module));
exports.ModLocationInitialCircleBorder = ModLocationInitialCircleBorder;
