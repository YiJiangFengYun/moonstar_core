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
var material = require("../material");
var render = require("../render");
var module_1 = require("./module");
var ModSprite = /** @class */ (function (_super) {
    __extends(ModSprite, _super);
    function ModSprite(owner) {
        var _this = _super.call(this, owner) || this;
        _this.name = ModSprite.NAME;
        _this.material = new material.Material(material.MaterialType.SPRITE);
        return _this;
    }
    ModSprite.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.material.init(info);
    };
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
    ModSprite.prototype.getMaxVtxCount = function () {
        return this.owner.maxParticleCount * 4;
    };
    ModSprite.prototype.getMaxIdxCount = function () {
        return this.owner.maxParticleCount * 6;
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
        var posHelper = common.Vector.create();
        var uvHelper = common.Vector.create();
        var cmdHelper = render.DrawCmd.create();
        //Traverse all particles.
        for (var particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            var particle = particles[particleIndex];
            var pos = particle.pos;
            var size = particle.size;
            var color = particle.color || common.WHITE;
            var angle = particle.angle || 0;
            var cos = angle ? Math.cos(angle) : 1;
            var sin = angle ? Math.sin(angle) : 0;
            var halfW = size ? size[0] / 2 : 0;
            var halfH = size ? size[1] / 2 : 0;
            var halfWNegative = -halfW;
            var halfHNegative = -halfH;
            //Vertex 0 left top
            posHelper[0] = pos[0] + cos * halfWNegative - sin * halfH;
            posHelper[1] = pos[1] + sin * halfWNegative + sin * halfH;
            uvHelper[0] = 0;
            uvHelper[1] = 0;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 1 right top
            posHelper[0] = pos[0] + cos * halfW - sin * halfH;
            posHelper[1] = pos[1] + sin * halfW + sin * halfH;
            uvHelper[0] = 1;
            uvHelper[1] = 0;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 2 left bottom
            posHelper[0] = pos[0] + cos * halfWNegative - sin * halfHNegative;
            posHelper[1] = pos[1] + sin * halfWNegative + sin * halfHNegative;
            uvHelper[0] = 0;
            uvHelper[1] = 1;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 3 right bottom
            posHelper[0] = pos[0] + cos * halfW - sin * halfHNegative;
            posHelper[1] = pos[1] + sin * halfW + sin * halfHNegative;
            uvHelper[0] = 1;
            uvHelper[1] = 1;
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
        }
        cmdHelper.indexOffset = offsets.lastIndexCount;
        cmdHelper.indexCount = particleCount * 6;
        cmdHelper.material = this.material;
        // common.Matrix.identity(cmdHelper.emitterMatrix);
        // common.Matrix.rotate(cmdHelper.emitterMatrix, cmdHelper.emitterMatrix, owner.rotation);
        // common.Matrix.translate(cmdHelper.emitterMatrix, cmdHelper.emitterMatrix, owner.origin);
        common.Matrix.fromRotation(cmdHelper.emitterMatrix, owner.rotation);
        common.Matrix.translate(cmdHelper.emitterMatrix, cmdHelper.emitterMatrix, owner.origin);
        cmdHelper.emitterMatrix;
        drawData.fillDrawCmd(cmdHelper);
    };
    ModSprite.NAME = "sprite";
    return ModSprite;
}(module_1.Module));
exports.ModSprite = ModSprite;
