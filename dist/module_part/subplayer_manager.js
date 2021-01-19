"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubPlayerManager = void 0;
var SubPlayerManager = /** @class */ (function () {
    function SubPlayerManager(player) {
        this.idlePlayerIndexs = [];
        this.idlePlayerIndexCount = 0;
        this.usedPlayerIndexs = [];
        this.usedPlayerIndexCount = 0;
        this.player = player;
    }
    SubPlayerManager.prototype.init = function (info) {
    };
    SubPlayerManager.prototype.ready = function () {
        this._prepareAllPlayer();
    };
    SubPlayerManager.prototype.reset = function () {
        var player = this.player;
        var subPlayerCount = player.playerCount;
        var subPlayers = player.players;
        for (var i = 0; i < subPlayerCount; ++i) {
            subPlayers[i].stop();
        }
        this._prepareAllPlayer();
    };
    SubPlayerManager.prototype.usePlayer = function () {
        var idleCount = this.idlePlayerIndexCount;
        if (idleCount) {
            idleCount -= 1;
            var idleIndexs = this.idlePlayerIndexs;
            var index = idleIndexs[idleCount];
            this.idlePlayerIndexCount = idleCount;
            var player = this.player.players[index];
            if (player.isPlaying) {
                console.warn("Subplayer manager: the player allocated is not idle, it is playing.");
            }
            this.usedPlayerIndexs[this.usedPlayerIndexCount++] = index;
            return index;
        }
        else {
            return null;
        }
    };
    SubPlayerManager.prototype.freePlayer = function (index) {
        var player = this.player.players[index];
        if (player.isPlaying) {
            console.warn("Subplayer manager: the player deallocated is still playing.");
        }
        this.idlePlayerIndexs[this.idlePlayerIndexCount++] = index;
        var usedPlayerIndexs = this.usedPlayerIndexs;
        var i = usedPlayerIndexs.indexOf(index);
        usedPlayerIndexs[i] = usedPlayerIndexs[--this.usedPlayerIndexCount];
    };
    SubPlayerManager.prototype._prepareAllPlayer = function () {
        var player = this.player;
        var subPlayerCount = player.playerCount;
        var idlePlayerIndexs = this.idlePlayerIndexs;
        idlePlayerIndexs.length = subPlayerCount;
        for (var i = 0; i < subPlayerCount; ++i) {
            idlePlayerIndexs[i] = i;
        }
        this.idlePlayerIndexCount = subPlayerCount;
        this.usedPlayerIndexs.length = subPlayerCount;
        this.usedPlayerIndexCount = 0;
    };
    return SubPlayerManager;
}());
exports.SubPlayerManager = SubPlayerManager;
