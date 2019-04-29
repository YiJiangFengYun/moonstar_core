"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player() {
        this.elapsedTime = 0;
        this.isPlay = false;
    }
    Player.prototype.play = function () {
        this.isPlay = true;
    };
    Player.prototype.pause = function () {
        this.isPlay = false;
    };
    Player.prototype.stop = function () {
        this.isPlay = false;
        this.elapsedTime = 0;
    };
    Player.prototype.update = function (dt) {
        this.elapsedTime += dt;
    };
    return Player;
}());
exports.Player = Player;
