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
var render = require("../render");
var emitter_1 = require("../emitter");
function doRender(emitters, emitterCount, drawData) {
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
    //Reset draw data.
    drawData.init(totalVtxCount, totalIdxCount);
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
}
var ParticleSystem = /** @class */ (function (_super) {
    __extends(ParticleSystem, _super);
    function ParticleSystem() {
        var _this = _super.call(this) || this;
        _this.drawData = new render.DrawData();
        _this.emitters = [];
        _this.emitterCount = 0;
        return _this;
    }
    ParticleSystem.prototype.init = function (info) {
        var newCount = info.emitters ? info.emitters.length : 0;
        this.emitterCount = newCount;
        var emitters = this.emitters;
        if (emitters.length < newCount) {
            emitters.length = newCount;
        }
        for (var i = 0; i < newCount; ++i) {
            if (!emitters[i])
                emitters[i] = new emitter_1.Emitter();
            emitters[i].init(info.emitters[i]);
        }
    };
    ParticleSystem.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    ParticleSystem.prototype.render = function () {
        doRender(this.emitters, this.emitterCount, this.drawData);
    };
    return ParticleSystem;
}(common.Player));
exports.ParticleSystem = ParticleSystem;
