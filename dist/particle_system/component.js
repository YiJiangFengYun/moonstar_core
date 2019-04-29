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
var PSComponent = /** @class */ (function () {
    function PSComponent(owner) {
        this.owner = owner;
    }
    PSComponent.prototype.update = function (dt) {
    };
    return PSComponent;
}());
exports.PSComponent = PSComponent;
var PSRenderComponent = /** @class */ (function (_super) {
    __extends(PSRenderComponent, _super);
    function PSRenderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PSRenderComponent.prototype.render = function () {
        var owner = this.owner;
        var emitters = owner.emitters;
        var emitterCount = emitters.length;
        var totalVtxCount = 0;
        var totalIdxCount = 0;
        //Get totalVtxCount and totalIdxCount.
        for (var i = 0; i < emitterCount; ++i) {
            var eRenderCpt = emitters[i].renderComponent;
            if (eRenderCpt) {
                totalVtxCount += eRenderCpt.getTotalVtxCount();
                totalIdxCount += eRenderCpt.getTotalIdxCount();
            }
            else {
                log.warn("The emitter don't own a render component.");
            }
        }
        //Reset draw data.
        var drawData = owner.drawData;
        drawData.init(totalVtxCount, totalIdxCount);
        var vtxBufferOffset = 0;
        var idxBufferOffset = 0;
        var idxOffset = 0;
        for (var i = 0; i < emitterCount; ++i) {
            var eRenderCpt = emitters[i].renderComponent;
            if (eRenderCpt) {
                eRenderCpt.fillVtxBuffer(drawData.vtxBuffer, vtxBufferOffset, drawData.vertexFormat, drawData.vtxSize);
                vtxBufferOffset += drawData.vtxSize * eRenderCpt.getTotalVtxCount();
                eRenderCpt.fillIdxBuffer(drawData.idxBuffer, idxBufferOffset, idxOffset, drawData.idxSize);
                idxBufferOffset += drawData.idxSize * eRenderCpt.getTotalIdxCount();
                idxOffset += eRenderCpt.getTotalVtxCount();
            }
        }
    };
    return PSRenderComponent;
}(PSComponent));
exports.PSRenderComponent = PSRenderComponent;
