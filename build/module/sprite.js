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
var ModSprite = /** @class */ (function (_super) {
    __extends(ModSprite, _super);
    function ModSprite(owner) {
        var _this = _super.call(this, owner) || this;
        _this.name = ModSprite.NAME;
        return _this;
    }
    ModSprite.prototype.getTotalVtxCount = function () {
        var owner = this.owner;
        var particleCount = owner.particleCount;
        return particleCount * 4;
    };
    ModSprite.prototype.getTotalIdxCount = function () {
        var owner = this.owner;
        var particleCount = owner.particleCount;
        return particleCount * 6;
    };
    ModSprite.prototype.fillBuffers = function (drawData, offsets) {
        var owner = this.owner;
        var particles = owner.particles;
        var particleCount = owner.particleCount;
        // todo 
        // let origin = owner.origin;
        // let useLocal = owner.useLocalSpace; 
        var vtxBufferByteOffset = offsets.idxBufferByteOffset;
        var idxBufferByteOffset = offsets.idxBufferByteOffset;
        var idxValueOffset = offsets.lastVertexCount;
        //Traverse all particles.
        for (var particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            var particle = particles[particleIndex];
            var size = particle.size;
            var color = particle.color || common.WHITE;
            var angle = particle.angle || 0;
            var cos = angle ? Math.cos(angle) : 1;
            var sin = angle ? Math.sin(angle) : 0;
            var halfW = size ? size.x / 2 : 0;
            var halfH = size ? size.y / 2 : 0;
            var halfWNegative = -halfW;
            var halfHNegative = -halfH;
            //Vertex 0 left top
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                posX: cos * halfWNegative - sin * halfH,
                posY: sin * halfWNegative + sin * halfH,
                uv0X: 0,
                uv0Y: 0,
                colorR: color.r,
                colorG: color.g,
                colorB: color.b,
                colorA: color.a,
            }, vtxBufferByteOffset);
            //Vertex 1 right top
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                posX: cos * halfW - sin * halfH,
                posY: sin * halfW + sin * halfH,
                uv0X: 1,
                uv0Y: 0,
                colorR: color.r,
                colorG: color.g,
                colorB: color.b,
                colorA: color.a,
            }, vtxBufferByteOffset);
            //Vertex 2 left bottom
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                posX: cos * halfWNegative - sin * halfHNegative,
                posY: sin * halfWNegative + sin * halfHNegative,
                uv0X: 0,
                uv0Y: 1,
                colorR: color.r,
                colorG: color.g,
                colorB: color.b,
                colorA: color.a,
            }, vtxBufferByteOffset);
            //Vertex 3 right bottom
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                posX: cos * halfW - sin * halfHNegative,
                posY: sin * halfW + sin * halfHNegative,
                uv0X: 1,
                uv0Y: 1,
                colorR: color.r,
                colorG: color.g,
                colorB: color.b,
                colorA: color.a,
            }, vtxBufferByteOffset);
            //Index
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
        }
    };
    ModSprite.NAME = "sprite";
    return ModSprite;
}(module_1.Module));
exports.ModSprite = ModSprite;
//# sourceMappingURL=sprite.js.map