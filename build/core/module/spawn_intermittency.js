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
var ModSpawnIntermittency = /** @class */ (function (_super) {
    __extends(ModSpawnIntermittency, _super);
    function ModSpawnIntermittency(player) {
        var _this = _super.call(this, player) || this;
        _this._time = 0;
        _this._remainTime = 0;
        return _this;
    }
    ModSpawnIntermittency.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.delay = info.delay || 0;
        this.duration = info.duration > 0 ? info.duration : Number.MAX_VALUE;
        var period = info.period > 0 ? info.period : Number.MAX_VALUE;
        this.period = period;
        var durationPerPeriod = info.durationPerPeriod > 0 ? info.durationPerPeriod : Number.MAX_VALUE;
        this.durationPerPeriod = Math.min(durationPerPeriod, period);
        this.interval = info.rate > 0 ? 1 / info.rate : Number.MAX_VALUE;
        this._remainTime = 0;
        this._time = 0;
    };
    ModSpawnIntermittency.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._remainTime = 0;
        this._time = 0;
    };
    ModSpawnIntermittency.prototype.update = function (dt) {
        var delay = this.delay;
        var time = this._time;
        if (time >= delay) {
            var player = this.player;
            if (!player.emitted) {
                player.startEmit();
            }
            time = time - delay;
            if (time < this.duration) {
                var period = this.period;
                var durationPerPeriod = this.durationPerPeriod;
                var time2 = time + dt;
                var sliceIndex1 = Math.floor(time / period);
                var sliceIndex2 = Math.floor(time2 / period);
                time = time % period;
                time2 = time2 % period;
                var dt2 = 0;
                if (sliceIndex1 !== sliceIndex2 && time2 >= durationPerPeriod) {
                    //Prevent from missing while durationPerPeriod is smaller than dt.
                    dt2 = durationPerPeriod;
                }
                else {
                    dt2 = Math.min(dt, this.durationPerPeriod - time);
                }
                if (dt2 > 0) {
                    var interval = this.interval;
                    dt2 = this._remainTime + dt2;
                    var pCount = Math.ceil(dt2 / interval);
                    this._remainTime = dt2 % interval;
                    if (this._remainTime > 0)
                        this._remainTime -= interval;
                    while (pCount > 0) {
                        player.createParticle();
                        --pCount;
                    }
                }
            }
            else {
                if (player.emitted && !player.emitComplete) {
                    this.player.endEmit();
                }
            }
        }
        this._time += dt;
    };
    ModSpawnIntermittency.NAME = "spawn_intermittency";
    return ModSpawnIntermittency;
}(module_1.Module));
exports.ModSpawnIntermittency = ModSpawnIntermittency;
//# sourceMappingURL=spawn_intermittency.js.map