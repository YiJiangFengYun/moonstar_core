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
var particleMod = require("../particle");
var module_1 = require("./module");
var ModSizeInitial = /** @class */ (function (_super) {
    __extends(ModSizeInitial, _super);
    function ModSizeInitial(player) {
        var _this = _super.call(this, player) || this;
        _this.size = common.Vector.create();
        _this.name = ModSizeInitial.NAME;
        player.on(particleMod.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModSizeInitial.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var size = this.size;
        size[0] = info.width || 0;
        size[1] = info.height || 0;
    };
    ModSizeInitial.prototype._onCreateParticle = function (particle) {
        if (particle.size) {
            common.Vector.copy(particle.size, this.size);
        }
        else {
            particle.size = common.Vector.clone(this.size);
        }
    };
    ModSizeInitial.NAME = "size_initial";
    return ModSizeInitial;
}(module_1.Module));
exports.ModSizeInitial = ModSizeInitial;
