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
exports.Player = void 0;
var eventEmitter = require("eventemitter3");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.elapsedTime = 0;
        _this._isPlaying = false;
        return _this;
    }
    Object.defineProperty(Player.prototype, "isPlaying", {
        get: function () { return this._isPlaying; },
        enumerable: false,
        configurable: true
    });
    Player.prototype.play = function () {
        this._isPlaying = true;
    };
    Player.prototype.pause = function () {
        this._isPlaying = false;
    };
    Player.prototype.stop = function () {
        this._isPlaying = false;
        this._reset();
    };
    Player.prototype.reset = function () {
        this._reset();
    };
    Player.prototype._reset = function () {
        this.elapsedTime = 0;
    };
    Player.prototype.update = function (dt) {
        if (this._isPlaying) {
            this.elapsedTime += dt;
        }
    };
    Object.defineProperty(Player.prototype, "time", {
        get: function () {
            return this.elapsedTime;
        },
        enumerable: false,
        configurable: true
    });
    return Player;
}(eventEmitter.EventEmitter));
exports.Player = Player;
//# sourceMappingURL=player.js.map