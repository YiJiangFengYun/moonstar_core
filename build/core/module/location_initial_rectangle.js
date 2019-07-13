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
var ModLocationInitialRectangle = /** @class */ (function (_super) {
    __extends(ModLocationInitialRectangle, _super);
    function ModLocationInitialRectangle(player) {
        var _this = _super.call(this, player) || this;
        _this.width = 0;
        _this.height = 0;
        _this.name = ModLocationInitialRectangle.NAME;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModLocationInitialRectangle.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.width = info.width || 0;
        this.height = info.height || 0;
    };
    ModLocationInitialRectangle.prototype._onCreateParticle = function (particle) {
        var width = this.width;
        var height = this.height;
        var x = Math.random() * width - width / 2;
        var y = Math.random() * height - height / 2;
        if (particle.pos) {
            common.Vector.set(particle.pos, x, y);
        }
        else {
            particle.pos = common.Vector.fromValues(x, y);
        }
    };
    ModLocationInitialRectangle.NAME = "location_initial_rectangle";
    return ModLocationInitialRectangle;
}(module_1.Module));
exports.ModLocationInitialRectangle = ModLocationInitialRectangle;
//# sourceMappingURL=location_initial_rectangle.js.map