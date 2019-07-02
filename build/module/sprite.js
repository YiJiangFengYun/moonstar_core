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
var vertex_1 = require("../common/vertex");
var color_1 = require("../common/color");
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
    ModSprite.prototype.fillBuffers = function (data) {
        var owner = this.owner;
        var particles = owner.particles;
        var particleCount = owner.particleCount;
        // let origin = owner.origin;
        var useLocal = owner.useLocalSpace;
        var vtxBuffer = data.vtxBuffer;
        var vtxFormat = data.vtxFormat;
        var vtxBufferByteOffset = data.idxBufferByteOffset;
        var vtxSize = data.vtxSize;
        var idxBuffer = data.idxBuffer;
        var idxBufferByteOffset = data.idxBufferByteOffset;
        var idxValueOffset = data.idxValueOffset;
        var idxSize = data.idxSize;
        //Traverse all particles.
        for (var particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            var particle = particles[particleIndex];
            //Vertex
            var vtxByteOffset = vtxBufferByteOffset;
            for (var i = 0; i < 4; ++i) {
                var attrCount = vtxFormat.length;
                for (var j = 0; j < attrCount; ++j) {
                    var attrFormat = vtxFormat[j];
                    var byteSize = 0;
                    switch (attrFormat.name) {
                        case vertex_1.AttrName.POSITION: {
                            byteSize = 4 * attrFormat.count;
                            var floatArray = new Float32Array(vtxBuffer, vtxByteOffset, byteSize);
                            var pos = particle.pos;
                            if (useLocal) {
                                //todo
                            }
                            floatArray[0] = pos.x;
                            floatArray[1] = pos.y;
                            break;
                        }
                        case vertex_1.AttrName.UV0: {
                            byteSize = 8; //4 * 2
                            var floatArray = new Float32Array(vtxBuffer, vtxByteOffset, byteSize);
                            floatArray[0] = i % 2; //0, 1, 0, 1
                            floatArray[1] = Math.floor(i / 2); //0, 0, 1, 1
                            break;
                        }
                        case vertex_1.AttrName.COLOR: {
                            byteSize = 4; //1 * 4
                            var unit8Array = new Uint8Array(vtxBuffer, vtxByteOffset, byteSize);
                            var color = particle.color || color_1.WHITE;
                            unit8Array[0] = color.r * 255;
                            unit8Array[0] = color.g * 255;
                            unit8Array[0] = color.b * 255;
                            unit8Array[0] = color.a * 255;
                            break;
                        }
                    }
                    vtxByteOffset += byteSize;
                }
            }
            vtxBufferByteOffset += vtxSize * 4;
            //Index idxSize === 4byte
            var unit32Array = new Uint32Array(idxBuffer, idxBufferByteOffset);
            unit32Array[0] = idxValueOffset + 0;
            unit32Array[0] = idxValueOffset + 1;
            unit32Array[0] = idxValueOffset + 2;
            unit32Array[0] = idxValueOffset + 1;
            unit32Array[0] = idxValueOffset + 3;
            unit32Array[0] = idxValueOffset + 2;
            idxBufferByteOffset += idxSize * 6;
        }
    };
    ModSprite.NAME = "sprite";
    return ModSprite;
}(module_1.Module));
exports.ModSprite = ModSprite;
//# sourceMappingURL=sprite.js.map