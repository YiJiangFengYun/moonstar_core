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
exports.ModLifeTimeInitial = void 0;
var emitterPlayer = require("../emitter_player");
var module_1 = require("./module");
var ModLifeTimeInitial = /** @class */ (function (_super) {
    __extends(ModLifeTimeInitial, _super);
    function ModLifeTimeInitial(player) {
        var _this = _super.call(this, player) || this;
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreateParticle, _this);
        return _this;
    }
    ModLifeTimeInitial.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.life = info.life;
    };
    ModLifeTimeInitial.prototype._onCreateParticle = function (particle) {
        particle.lifeTime = this.life;
        particle.time = 0;
        particle.life = 0;
    };
    ModLifeTimeInitial.NAME = "life_time_initial";
    return ModLifeTimeInitial;
}(module_1.Module));
exports.ModLifeTimeInitial = ModLifeTimeInitial;
