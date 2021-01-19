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
exports.ModColorInitial = void 0;
var common = require("../common");
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModColorInitial = /** @class */ (function (_super) {
    __extends(ModColorInitial, _super);
    function ModColorInitial(player) {
        var _this = _super.call(this, player) || this;
        _this.color = common.Color.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModColorInitial.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        var color = this.color;
        var colorConfig = info.color || common.COLOR_WHITE;
        color[0] = colorConfig[0];
        color[1] = colorConfig[1];
        color[2] = colorConfig[2];
        color[3] = colorConfig[3];
    };
    ModColorInitial.prototype._onCreateParticle = function (particle) {
        if (particle.color) {
            common.Color.copy(particle.color, this.color);
        }
        else {
            particle.color = common.Color.clone(this.color);
        }
    };
    ModColorInitial.NAME = "color_initial";
    return ModColorInitial;
}(module_1.Module));
exports.ModColorInitial = ModColorInitial;
//# sourceMappingURL=color_initial.js.map