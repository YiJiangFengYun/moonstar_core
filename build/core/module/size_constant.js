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
var ModSizeConstant = /** @class */ (function (_super) {
    __extends(ModSizeConstant, _super);
    function ModSizeConstant(owner) {
        var _this = _super.call(this, owner) || this;
        _this.size = common.Vector.create();
        _this.name = ModSizeConstant.NAME;
        owner.on(spawn_1.EVENT_CREATE_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModSizeConstant.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var size = this.size;
        size[0] = info.width || 0;
        size[1] = info.height || 0;
    };
    ModSizeConstant.prototype._onCreateParticle = function (particle) {
        if (particle.size) {
            common.Vector.copy(particle.size, this.size);
        }
        else {
            particle.size = common.Vector.clone(this.size);
        }
    };
    ModSizeConstant.NAME = "size_constant";
    return ModSizeConstant;
}(module_1.Module));
exports.ModSizeConstant = ModSizeConstant;
//# sourceMappingURL=size_constant.js.map