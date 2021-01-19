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
exports.ModWidthInitial = void 0;
var common = require("../common");
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModWidthInitial = /** @class */ (function (_super) {
    __extends(ModWidthInitial, _super);
    function ModWidthInitial(player) {
        var _this = _super.call(this, player) || this;
        _this.width = 0;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModWidthInitial.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.width = info.width || 0;
    };
    ModWidthInitial.prototype._onCreateParticle = function (particle) {
        if (particle.size) {
            common.Vector.copy(particle.size, [this.width, 0]);
        }
        else {
            particle.size = common.Vector.clone([this.width, 0]);
        }
    };
    ModWidthInitial.NAME = "width_initial";
    return ModWidthInitial;
}(module_1.Module));
exports.ModWidthInitial = ModWidthInitial;
//# sourceMappingURL=width_inital.js.map