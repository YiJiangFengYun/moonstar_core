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
exports.ModSubPlayerFollow = void 0;
var emitterPlayer = require("../emitter_player");
var modulePart = require("../module_part");
var module_1 = require("./module");
var ModSubPlayerFollow = /** @class */ (function (_super) {
    __extends(ModSubPlayerFollow, _super);
    function ModSubPlayerFollow(player) {
        var _this = _super.call(this, player) || this;
        _this.subPlayer = modulePart.createModulePart(modulePart.SubPlayerManager, player);
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreatedParticle, _this);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, _this._onDestroyedParticle, _this);
        return _this;
    }
    ModSubPlayerFollow.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.subPlayer.init(info);
    };
    ModSubPlayerFollow.prototype.ready = function () {
        _super.prototype.ready.call(this);
        this.subPlayer.ready();
        this.mapUsedSubPlayers = {};
        this.mapUsedParticles = {};
    };
    ModSubPlayerFollow.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.subPlayer.reset();
        this.mapUsedSubPlayers = {};
        this.mapUsedParticles = {};
    };
    ModSubPlayerFollow.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        var subplayerManager = this.subPlayer;
        var usedPlayers = subplayerManager.usedPlayerIndexs;
        var usedPlayerCount = subplayerManager.usedPlayerIndexCount;
        var subPlayers = this.player.players;
        var mapUsedParticles = this.mapUsedParticles;
        for (var i = 0; i < usedPlayerCount; ++i) {
            var index = usedPlayers[i];
            var player = subPlayers[index];
            var particle = mapUsedParticles[player.id];
            player.setPosition(particle.pos);
        }
    };
    ModSubPlayerFollow.prototype._onCreatedParticle = function (particle) {
        var index = this.subPlayer.usePlayer();
        if (typeof index === "number") {
            var subPlayer = this.player.players[index];
            subPlayer.on(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.setPosition(particle.pos);
            subPlayer.play();
            if (this.mapUsedSubPlayers[particle.id]) {
                console.error("Repeatly allocate a subplayer to the same particle.");
            }
            this.mapUsedSubPlayers[particle.id] = subPlayer;
            this.mapUsedParticles[subPlayer.id] = particle;
        }
    };
    ModSubPlayerFollow.prototype._onDestroyedParticle = function (particle) {
        var player = this.mapUsedSubPlayers[particle.id];
        if (player) {
            player.endEmit();
        }
    };
    ModSubPlayerFollow.prototype._onSubPlayerComplete = function (player) {
        var players = this.player.players;
        var index = players.indexOf(player);
        if (index >= 0) {
            var subPlayer = players[index];
            subPlayer.off(emitterPlayer.EVENT_COMPLETE, this._onSubPlayerComplete, this);
            subPlayer.stop();
            this.subPlayer.freePlayer(index);
            var particle = this.mapUsedParticles[player.id];
            this.mapUsedSubPlayers[particle.id] = null;
            this.mapUsedParticles[player.id] = null;
        }
    };
    ModSubPlayerFollow.NAME = "subplayer_follow";
    return ModSubPlayerFollow;
}(module_1.Module));
exports.ModSubPlayerFollow = ModSubPlayerFollow;
