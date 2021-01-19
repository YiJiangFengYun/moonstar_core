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
exports.ModSprite = void 0;
var common = require("../common");
var material = require("../material");
var render = require("../render");
var module_1 = require("./module");
var ModSprite = /** @class */ (function (_super) {
    __extends(ModSprite, _super);
    function ModSprite(player) {
        var _this = _super.call(this, player) || this;
        _this.material = new material.Material();
        _this._posHelper = common.Vector.create();
        _this._uvHelper = common.Vector.create();
        _this._cmdHelper = render.DrawCmd.create();
        return _this;
    }
    ModSprite.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.material.init(info);
    };
    ModSprite.prototype.getTotalVtxCount = function () {
        var player = this.player;
        var particleCount = player.particleCount;
        return particleCount * 4;
    };
    ModSprite.prototype.getTotalIdxCount = function () {
        var player = this.player;
        var particleCount = player.particleCount;
        return particleCount * 6;
    };
    ModSprite.prototype.getMaxVtxCount = function () {
        return this.player.maxParticleCount * 4;
    };
    ModSprite.prototype.getMaxIdxCount = function () {
        return this.player.maxParticleCount * 6;
    };
    ModSprite.prototype.fillBuffers = function (drawData, offsets, batchInfo) {
        var player = this.player;
        var particles = player.particles;
        var particleCount = player.particleCount;
        var vtxBufferByteOffset = offsets.vtxBufferByteOffset;
        var idxBufferByteOffset = offsets.idxBufferByteOffset;
        var idxValueOffset = batchInfo ? batchInfo.lastBatchVertexCount : 0;
        var posHelper = this._posHelper;
        var uvHelper = this._uvHelper;
        var cmdHelper = this._cmdHelper;
        //Traverse all particles.
        for (var particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            var particle = particles[particleIndex];
            var pos = particle.pos || common.VECTOR_ZERO;
            var scale = particle.scale || common.VECTOR_ONE;
            var size = particle.size || common.VECTOR_ZERO;
            var color = particle.color || common.COLOR_WHITE;
            var rotation = particle.rotation || 0;
            var angle = rotation;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var halfW = size[0] * scale[0] / 2;
            var halfH = size[1] * scale[1] / 2;
            var halfWNegative = -halfW;
            var halfHNegative = -halfH;
            var subUV = void 0;
            subUV = particle.subUV || common.VECTOR4_ZERO_ONE;
            //Vertex 0 left top
            posHelper[0] = pos[0] + cos * halfWNegative - sin * halfH;
            posHelper[1] = pos[1] + sin * halfWNegative + cos * halfH;
            uvHelper[0] = subUV[0];
            uvHelper[1] = subUV[1];
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 1 right top
            posHelper[0] = pos[0] + cos * halfW - sin * halfH;
            posHelper[1] = pos[1] + sin * halfW + cos * halfH;
            uvHelper[0] = subUV[2];
            uvHelper[1] = subUV[1];
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 2 left bottom
            posHelper[0] = pos[0] + cos * halfWNegative - sin * halfHNegative;
            posHelper[1] = pos[1] + sin * halfWNegative + cos * halfHNegative;
            uvHelper[0] = subUV[0];
            uvHelper[1] = subUV[3];
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 3 right bottom
            posHelper[0] = pos[0] + cos * halfW - sin * halfHNegative;
            posHelper[1] = pos[1] + sin * halfW + cos * halfHNegative;
            uvHelper[0] = subUV[2];
            uvHelper[1] = subUV[3];
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Index
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            idxValueOffset += 4;
        }
        var indexCount = particleCount * 6;
        var cmd;
        if (batchInfo) {
            cmd = batchInfo.lastDrawCmd;
            cmd.indexCount += indexCount;
            common.Bounds.union(cmd.bounds, cmd.bounds, player.globalBounds);
        }
        else {
            cmd = cmdHelper;
            cmd.vertexBufferByteOffset = offsets.vtxBufferByteOffset;
            cmd.indexCount = indexCount;
            cmd.indexOffset = offsets.lastIndexCount;
            cmd.material = this.material.id;
            common.Bounds.copy(cmd.bounds, player.globalBounds);
        }
        return cmd;
    };
    ModSprite.NAME = "sprite";
    return ModSprite;
}(module_1.Module));
exports.ModSprite = ModSprite;
