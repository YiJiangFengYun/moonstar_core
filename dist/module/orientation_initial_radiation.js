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
var ModOrientationInitialRadiation = /** @class */ (function (_super) {
    __extends(ModOrientationInitialRadiation, _super);
    function ModOrientationInitialRadiation(player) {
        var _this = _super.call(this, player) || this;
        _this.vecHelper = common.Vector.create();
        _this.name = ModOrientationInitialRadiation.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModOrientationInitialRadiation.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.effectRotation = info.effectRotation || false;
    };
    ModOrientationInitialRadiation.prototype._onCreateParticle = function (particle) {
        var vecHelper = this.vecHelper;
        var origin = this.player.position;
        common.Vector.sub(vecHelper, particle.pos, origin);
        var angle;
        if (vecHelper[0]) {
            angle = Math.atan(vecHelper[1] / vecHelper[0]);
            if (vecHelper[0] < 0) {
                angle += Math.PI;
            }
        }
        else {
            if (vecHelper[1] > 0) {
                angle = Math.PI / 2;
            }
            else if (vecHelper[1] < 0) {
                angle = -Math.PI / 2;
            }
            else {
                angle = 0;
            }
        }
        particle.orientation = angle;
        if (this.effectRotation) {
            particle.rotation = angle;
        }
    };
    ModOrientationInitialRadiation.NAME = "orientation_initial_radiation";
    return ModOrientationInitialRadiation;
}(module_1.Module));
exports.ModOrientationInitialRadiation = ModOrientationInitialRadiation;
