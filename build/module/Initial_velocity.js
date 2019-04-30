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
var spawn_1 = require("./spawn");
var vector_1 = require("../common/vector");
var ModInitialVelocity = /** @class */ (function (_super) {
    __extends(ModInitialVelocity, _super);
    function ModInitialVelocity(owner) {
        var _this = _super.call(this, owner) || this;
        _this.name = ModInitialVelocity.NAME;
        owner.on(spawn_1.EVENT_CREATE_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModInitialVelocity.prototype.init = function () {
    };
    ModInitialVelocity.prototype._onCreateParticle = function (particle) {
        if (particle.velocity) {
            vector_1.copyVector(this.velocity, particle.velocity);
        }
        else {
            particle.velocity = vector_1.cloneVector(this.velocity);
        }
    };
    ModInitialVelocity.NAME = "initial_velocity";
    return ModInitialVelocity;
}(module_1.Module));
exports.ModInitialVelocity = ModInitialVelocity;
//# sourceMappingURL=Initial_velocity.js.map