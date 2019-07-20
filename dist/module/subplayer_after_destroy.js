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
var emitterPlayer = require("../emitter_player");
var modulePart = require("../module_part");
var module_1 = require("./module");
var ModSubPlayerAfterDestroy = /** @class */ (function (_super) {
    __extends(ModSubPlayerAfterDestroy, _super);
    function ModSubPlayerAfterDestroy(player) {
        var _this = _super.call(this, player) || this;
        _this.name = ModSubPlayerAfterDestroy.NAME;
        _this.subPlayer = modulePart.createModulePart(modulePart.SubPlayerManager, player);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, _this._onDestroyedParticle, _this);
        return _this;
    }
    ModSubPlayerAfterDestroy.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.subPlayer.init(info);
    };
    ModSubPlayerAfterDestroy.prototype.ready = function () {
        _super.prototype.ready.call(this);
        this.subPlayer.ready();
    };
    ModSubPlayerAfterDestroy.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.subPlayer.reset();
    };
    ModSubPlayerAfterDestroy.prototype._onDestroyedParticle = function (particle) {
        var index = this.subPlayer.usePlayer();
        if (typeof index === "number") {
            var subPlayer = this.player.players[index];
            subPlayer.on(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.setPosition(particle.pos);
            subPlayer.play();
        }
    };
    ModSubPlayerAfterDestroy.prototype._onSubPlayerComplete = function (player) {
        var players = this.player.players;
        var index = players.indexOf(player);
        if (index >= 0) {
            var subPlayer = players[index];
            subPlayer.off(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.stop();
            this.subPlayer.freePlayer(index);
        }
    };
    ModSubPlayerAfterDestroy.NAME = "subplayer_after_destroy";
    return ModSubPlayerAfterDestroy;
}(module_1.Module));
exports.ModSubPlayerAfterDestroy = ModSubPlayerAfterDestroy;
