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
var ModSubPlayerSimple = /** @class */ (function (_super) {
    __extends(ModSubPlayerSimple, _super);
    function ModSubPlayerSimple(player) {
        var _this = _super.call(this, player) || this;
        _this.idlePlayerIndexs = [];
        _this.idlePlayerIndexCount = 0;
        _this.name = ModSubPlayerSimple.NAME;
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, _this._onDestroyedParticle, _this);
        return _this;
    }
    ModSubPlayerSimple.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
    };
    ModSubPlayerSimple.prototype.ready = function () {
        _super.prototype.ready.call(this);
        this._prepareAllPlayer();
    };
    ModSubPlayerSimple.prototype.reset = function () {
        _super.prototype.reset.call(this);
        var player = this.player;
        var subPlayerCount = player.playerCount;
        var subPlayers = player.players;
        for (var i = 0; i < subPlayerCount; ++i) {
            subPlayers[i].stop();
        }
        this._prepareAllPlayer();
    };
    ModSubPlayerSimple.prototype._prepareAllPlayer = function () {
        var player = this.player;
        var subPlayerCount = player.playerCount;
        var idlePlayerIndexs = this.idlePlayerIndexs;
        idlePlayerIndexs.length = subPlayerCount;
        for (var i = 0; i < subPlayerCount; ++i) {
            idlePlayerIndexs[i] = i;
        }
        this.idlePlayerIndexCount = subPlayerCount;
    };
    ModSubPlayerSimple.prototype._getIdlePlayer = function () {
        var idleCount = this.idlePlayerIndexCount;
        if (idleCount) {
            idleCount -= 1;
            var idleIndexs = this.idlePlayerIndexs;
            var index = idleIndexs[idleCount];
            this.idlePlayerIndexCount = idleCount;
            return index;
        }
        else {
            return 0;
        }
    };
    ModSubPlayerSimple.prototype._freePlayer = function (index) {
        this.idlePlayerIndexs[this.idlePlayerIndexCount++] = index;
    };
    ModSubPlayerSimple.prototype._onDestroyedParticle = function (particle) {
        var index = this._getIdlePlayer();
        if (index) {
            var subPlayer = this.player.players[index];
            subPlayer.on(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            common.Vector.copy(subPlayer.origin, particle.pos);
            subPlayer.play();
        }
    };
    ModSubPlayerSimple.prototype._onSubPlayerComplete = function (player) {
        var players = this.player.players;
        var index = players.indexOf(player);
        if (index > 0) {
            this._freePlayer(index);
            var subPlayer = players[index];
            subPlayer.off(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.stop();
        }
    };
    ModSubPlayerSimple.NAME = "subplayer_simple";
    return ModSubPlayerSimple;
}(module_1.Module));
exports.ModSubPlayerSimple = ModSubPlayerSimple;
