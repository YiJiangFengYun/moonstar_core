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
var ModInitialSize = /** @class */ (function (_super) {
    __extends(ModInitialSize, _super);
    function ModInitialSize(owner) {
        var _this = _super.call(this, owner) || this;
        _this.size = 0;
        _this.name = ModInitialSize.NAME;
        owner.on(spawn_1.EVENT_CREATE_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModInitialSize.prototype.init = function () {
    };
    ModInitialSize.prototype._onCreateParticle = function (particle) {
        particle.size = this.size;
    };
    ModInitialSize.NAME = "initial_size";
    return ModInitialSize;
}(module_1.Module));
exports.ModInitialSize = ModInitialSize;
//# sourceMappingURL=initial_size.js.map