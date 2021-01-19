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
exports.ModRotationInitial = void 0;
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModRotationInitial = /** @class */ (function (_super) {
    __extends(ModRotationInitial, _super);
    function ModRotationInitial(player) {
        var _this = _super.call(this, player) || this;
        _this.value = 0; //(radian)
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModRotationInitial.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.value = info.value || 0;
    };
    ModRotationInitial.prototype._onCreateParticle = function (particle) {
        particle.rotationVel = this.value;
    };
    ModRotationInitial.NAME = "rotation_initial";
    return ModRotationInitial;
}(module_1.Module));
exports.ModRotationInitial = ModRotationInitial;
//# sourceMappingURL=rotation_initial.js.map