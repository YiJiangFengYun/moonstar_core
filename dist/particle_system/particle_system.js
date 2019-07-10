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
var log = require("loglevel");
var common = require("../common");
var emitter = require("../emitter");
var render = require("../render");
/**
 * Note: All emitters should be created when the ParticleSystem init.
 * If a emitter play latter, you should stop the emitter, and then play it.
 */
var ParticleSystem = /** @class */ (function (_super) {
    __extends(ParticleSystem, _super);
    function ParticleSystem() {
        var _this = _super.call(this) || this;
        _this.drawData = new render.DrawData();
        _this.emitters = [];
        _this.emitterCount = 0;
        _this._id = common.gainID();
        return _this;
    }
    Object.defineProperty(ParticleSystem.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    ParticleSystem.prototype.init = function (info) {
        var newCount = info.emitters ? info.emitters.length : 0;
        this.emitterCount = newCount;
        var emitters = this.emitters;
        if (emitters.length < newCount) {
            emitters.length = newCount;
        }
        // Create emitters
        var mapEmitters = {};
        for (var i = 0; i < newCount; ++i) {
            var et = emitters[i];
            var etInfo = info.emitters[i];
            if (!et)
                emitters[i] = et = new emitter.Emitter();
            et.init(etInfo);
            if (!et.name) {
                et.name = "emitter_" + (i + 1);
            }
            mapEmitters[et.name] = et;
            if (!etInfo.parent)
                et.play();
        }
        // Initialize the hierarchy of the emiiters
        for (var i = 0; i < newCount; ++i) {
            var et = emitters[i];
            var etInfo = info.emitters[i];
            if (etInfo.parent) {
                var parentEt = mapEmitters[etInfo.parent];
                var parentPlayer = parentEt.player;
                parentPlayer.addPlayer(et.player);
            }
        }
        // Ready the emitters
        for (var i = 0; i < newCount; ++i) {
            emitters[i].ready();
        }
        var maxVtxCount = 0;
        var maxIdxCount = 0;
        //Get totalVtxCount and totalIdxCount.
        for (var i = 0; i < newCount; ++i) {
            var eRenderCpt = emitters[i].renderModule;
            if (eRenderCpt) {
                maxVtxCount += eRenderCpt.getMaxVtxCount();
                maxIdxCount += eRenderCpt.getMaxIdxCount();
            }
            else {
                log.warn("The emitter don't own a render component.");
            }
        }
        this.drawData.init({
            maxVtxCount: maxVtxCount,
            maxIdxCount: maxIdxCount,
        });
    };
    /**
     *
     * @param dt Passed time (s)
     */
    ParticleSystem.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        if (this.isPlay) {
            var emitterCount = this.emitterCount;
            var emitters = this.emitters;
            for (var i = 0; i < emitterCount; ++i) {
                emitters[i].update(dt);
            }
        }
    };
    ParticleSystem.prototype.render = function () {
        var emitterCount = this.emitterCount;
        var emitters = this.emitters;
        var drawData = this.drawData;
        emitterCount = emitterCount || 0;
        var totalVtxCount = 0;
        var totalIdxCount = 0;
        //Get totalVtxCount and totalIdxCount.
        for (var i = 0; i < emitterCount; ++i) {
            var eRenderCpt = emitters[i].renderModule;
            if (eRenderCpt) {
                totalVtxCount += eRenderCpt.getTotalVtxCount();
                totalIdxCount += eRenderCpt.getTotalIdxCount();
            }
            else {
                log.warn("The emitter don't own a render component.");
            }
        }
        //Update data.
        drawData.updateData({
            totalVtxCount: totalVtxCount,
            totalIdxCount: totalIdxCount,
        });
        drawData.clearCmds();
        var vtxBufferByteOffset = 0;
        var idxBufferByteOffset = 0;
        var lastVertexCount = 0;
        var lastIndexCount = 0;
        for (var i = 0; i < emitterCount; ++i) {
            var eRenderCpt = emitters[i].renderModule;
            if (eRenderCpt) {
                eRenderCpt.fillBuffers(drawData, {
                    vtxBufferByteOffset: vtxBufferByteOffset,
                    idxBufferByteOffset: idxBufferByteOffset,
                    lastVertexCount: lastVertexCount,
                    lastIndexCount: lastIndexCount,
                });
                var vtxCount = eRenderCpt.getTotalVtxCount();
                var idxCount = eRenderCpt.getTotalIdxCount();
                lastVertexCount += vtxCount;
                lastIndexCount += idxCount;
                vtxBufferByteOffset += drawData.vtxSize * vtxCount;
                idxBufferByteOffset += drawData.idxSize * idxCount;
            }
        }
    };
    return ParticleSystem;
}(common.Player));
exports.ParticleSystem = ParticleSystem;
