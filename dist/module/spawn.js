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
var module_1 = require("./module");
var ModSpawn = /** @class */ (function (_super) {
    __extends(ModSpawn, _super);
    function ModSpawn(player) {
        var _this = _super.call(this, player) || this;
        _this._time = 0;
        _this._remainTime = 0;
        return _this;
    }
    ModSpawn.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this._remainTime = 0;
        this.interval = info.rate > 0 ? 1 / info.rate : Number.MAX_VALUE;
        this.duration = info.duration > 0 ? info.duration : Number.MAX_VALUE;
        this.delay = info.delay || 0;
        this._time = 0;
    };
    ModSpawn.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._time = 0;
        this._remainTime = 0;
    };
    ModSpawn.prototype.update = function (dt) {
        var delay = this.delay;
        var time = this._time;
        if (time >= delay) {
            var player = this.player;
            if (!player.emitted) {
                player.startEmit();
            }
            if (player.emitComplete) {
                return;
            }
            var dt2 = Math.min(dt, this.duration + delay - time);
            if (dt2 > 0) {
                var interval = this.interval;
                var dt3 = this._remainTime + dt2;
                var pCount = Math.ceil(dt3 / interval);
                this._remainTime = dt3 % interval;
                if (this._remainTime > 0)
                    this._remainTime -= interval;
                while (pCount > 0) {
                    player.createParticle();
                    --pCount;
                }
            }
            if (player.emitted && !player.emitComplete && dt2 <= 0) {
                player.endEmit();
            }
        }
        this._time += dt;
    };
    ModSpawn.NAME = "spawn";
    return ModSpawn;
}(module_1.Module));
exports.ModSpawn = ModSpawn;
