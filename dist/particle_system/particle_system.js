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
var draw_data_1 = require("../render/draw_data");
var player_1 = require("../common/player");
function render(emitters, drawData) {
    var emitterCount = emitters.length;
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
    var vtxBufferOffset = 0;
    var idxBufferOffset = 0;
    var idxOffset = 0;
    for (var i = 0; i < emitterCount; ++i) {
        var eRenderCpt = emitters[i].renderModule;
        if (eRenderCpt) {
            eRenderCpt.fillBuffers({
                vtxBuffer: drawData.vtxBuffer,
                vtxBufferByteOffset: vtxBufferOffset,
                vtxFormat: drawData.vertexFormat,
                vtxSize: drawData.vtxSize,
                idxBuffer: drawData.idxBuffer,
                idxBufferByteOffset: idxBufferOffset,
                idxValueOffset: idxOffset,
                idxSize: drawData.idxSize,
            });
            vtxBufferOffset += drawData.vtxSize * eRenderCpt.getTotalVtxCount();
            idxBufferOffset += drawData.idxSize * eRenderCpt.getTotalIdxCount();
            idxOffset += eRenderCpt.getTotalVtxCount();
        }
    }
}
var ParticleSystem = /** @class */ (function (_super) {
    __extends(ParticleSystem, _super);
    function ParticleSystem() {
        var _this = _super.call(this) || this;
        _this.drawData = new draw_data_1.DrawData();
        _this.emitters = [];
        return _this;
    }
    ParticleSystem.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    ParticleSystem.prototype.render = function () {
        render(this.emitters, this.drawData);
    };
    return ParticleSystem;
}(player_1.Player));
exports.ParticleSystem = ParticleSystem;
