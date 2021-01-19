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
exports.ModVelocityInitial = void 0;
var common = require("../common");
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModVelocityInitial = /** @class */ (function (_super) {
    __extends(ModVelocityInitial, _super);
    function ModVelocityInitial(player) {
        var _this = _super.call(this, player) || this;
        _this.velocity = common.Vector.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModVelocityInitial.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var vel = this.velocity;
        var velConfig = info.velocity || common.VECTOR_ZERO;
        vel[0] = velConfig[0];
        vel[1] = velConfig[1];
    };
    ModVelocityInitial.prototype._onCreateParticle = function (particle) {
        if (particle.velocity) {
            common.Vector.copy(particle.velocity, this.velocity);
        }
        else {
            particle.velocity = common.Vector.clone(this.velocity);
        }
    };
    ModVelocityInitial.NAME = "velocity_initial";
    return ModVelocityInitial;
}(module_1.Module));
exports.ModVelocityInitial = ModVelocityInitial;
//# sourceMappingURL=velocity_initial.js.map