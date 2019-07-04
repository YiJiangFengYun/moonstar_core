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
var spawn_1 = require("./spawn");
var ModVelocityConstant = /** @class */ (function (_super) {
    __extends(ModVelocityConstant, _super);
    function ModVelocityConstant(owner) {
        var _this = _super.call(this, owner) || this;
        _this.velocity = {};
        _this.name = ModVelocityConstant.NAME;
        owner.on(spawn_1.EVENT_CREATE_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModVelocityConstant.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var vel = this.velocity;
        vel.x = info.x;
        vel.y = info.y;
    };
    ModVelocityConstant.prototype._onCreateParticle = function (particle) {
        if (particle.velocity) {
            common.copyVector(this.velocity, particle.velocity);
        }
        else {
            particle.velocity = __assign({}, this.velocity);
        }
    };
    ModVelocityConstant.NAME = "initial_velocity";
    return ModVelocityConstant;
}(module_1.Module));
exports.ModVelocityConstant = ModVelocityConstant;
//# sourceMappingURL=velocity_constant.js.map