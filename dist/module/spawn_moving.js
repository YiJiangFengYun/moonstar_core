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
var module_1 = require("./module");
var ModSpawnMoving = /** @class */ (function (_super) {
    __extends(ModSpawnMoving, _super);
    function ModSpawnMoving(player) {
        var _this = _super.call(this, player) || this;
        _this.interval = 0;
        _this._lastEmitterPos = common.Vector.create();
        _this._vecHelper = common.Vector.create();
        _this._vecHelper2 = common.Vector.create();
        _this.name = ModSpawnMoving.NAME;
        return _this;
    }
    ModSpawnMoving.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.interval = info.interval || 0;
        common.Vector.copy(this._lastEmitterPos, this.player.position);
        this._remainDis = 0;
    };
    ModSpawnMoving.prototype.reset = function () {
        _super.prototype.reset.call(this);
        common.Vector.copy(this._lastEmitterPos, this.player.position);
        this._remainDis = 0;
    };
    ModSpawnMoving.prototype.update = function (dt) {
        var player = this.player;
        if (!player.emitted) {
            player.startEmit();
        }
        var interval = this.interval;
        if (interval) {
            var lastPos = this._lastEmitterPos;
            var nowPos = this.player.position;
            var direct = this._vecHelper;
            common.Vector.sub(direct, nowPos, lastPos);
            var dis = common.Vector.length(direct);
            //normalize
            if (dis > 0) {
                direct[0] /= dis;
                direct[1] /= dis;
            }
            dis += this._remainDis;
            var pCount = Math.ceil(dis / interval);
            this._remainDis = dis % interval;
            if (this._remainDis > 0)
                this._remainDis -= interval;
            var temp = this._vecHelper2;
            var index = 1;
            while (pCount > 0) {
                common.Vector.scale(temp, direct, index * interval);
                common.Vector.add(temp, lastPos, temp);
                player.createParticle(temp);
                --pCount;
                ++index;
            }
            common.Vector.copy(lastPos, nowPos);
        }
    };
    ModSpawnMoving.NAME = "spawn_moving";
    return ModSpawnMoving;
}(module_1.Module));
exports.ModSpawnMoving = ModSpawnMoving;
