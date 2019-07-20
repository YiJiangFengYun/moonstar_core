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
var ModSpriteConnected = /** @class */ (function (_super) {
    __extends(ModSpriteConnected, _super);
    function ModSpriteConnected(player) {
        var _this = _super.call(this, player) || this;
        _this.material = new material.Material(material.MaterialType.SPRITE_CONNECTED);
        _this._posHelper = common.Vector.create();
        _this._uvHelper = common.Vector.create();
        _this._cmdHelper = render.DrawCmd.create();
        _this._sizeHelper = common.Vector.create();
        _this._scaleHelper = common.Vector.create();
        _this._colorHelper = common.Color.create();
        _this._vectorHelper = common.Vector.create();
        _this._vectorHelper2 = common.Vector.create();
        _this.name = ModSpriteConnected.NAME;
        return _this;
    }
    ModSpriteConnected.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.material.init(info);
        if (info.head) {
            var head = this.head = common.Vector.create();
            var headConfig = info.head;
            head[0] = headConfig[0] || 0;
            head[1] = headConfig[1] || 0;
        }
        else {
            this.head = null;
        }
        if (info.tail) {
            var tail = this.tail = common.Vector.create();
            var tailConfig = info.tail;
            tail[0] = tailConfig[0] || 0;
            tail[1] = tailConfig[1] || 0;
        }
        else {
            this.tail = null;
        }
        this.ribbon = info.ribbon || false;
    };
    ModSpriteConnected.prototype.getTotalVtxCount = function () {
        var player = this.player;
        var particleCount = player.particleCount;
        if (this.head) {
            ++particleCount;
        }
        if (this.tail) {
            ++particleCount;
        }
        if (this.ribbon) {
            return 2 * particleCount;
        }
        else {
            return Math.max(0, 4 * (particleCount - 1));
        }
    };
    ModSpriteConnected.prototype.getTotalIdxCount = function () {
        var player = this.player;
        var particleCount = player.particleCount;
        if (this.head) {
            ++particleCount;
        }
        if (this.tail) {
            ++particleCount;
        }
        return Math.max(0, 6 * (particleCount - 1));
    };
    ModSpriteConnected.prototype.getMaxVtxCount = function () {
        var particleCount = this.player.maxParticleCount;
        if (this.head) {
            ++particleCount;
        }
        if (this.tail) {
            ++particleCount;
        }
        if (this.ribbon) {
            return 2 * particleCount;
        }
        else {
            return Math.max(0, 4 * (particleCount - 1));
        }
    };
    ModSpriteConnected.prototype.getMaxIdxCount = function () {
        var particleCount = this.player.maxParticleCount;
        if (this.head) {
            ++particleCount;
        }
        if (this.tail) {
            ++particleCount;
        }
        return Math.max(0, 6 * (particleCount - 1));
    };
    ModSpriteConnected.prototype.fillBuffers = function (drawData, offsets) {
        var _this = this;
        var context = this;
        var player = this.player;
        var head = this.head;
        var tail = this.tail;
        var ribbon = this.ribbon;
        var particles = player.particles;
        var particleCount = player.particleCount;
        var finalParticleCount = particleCount;
        if (head)
            ++finalParticleCount;
        if (tail)
            ++finalParticleCount;
        var vtxBufferByteOffset = offsets.vtxBufferByteOffset;
        var idxBufferByteOffset = offsets.idxBufferByteOffset;
        var idxValueOffset = 0;
        var fillVertexData = function (sliceIndex, pos1, pos2, size1, size2, scale1, scale2, color1, color2, lastPos) {
            var posHelper = context._posHelper;
            var uvHelper = context._uvHelper;
            var perpHelper = context._vectorHelper;
            var total = finalParticleCount;
            var totalDecOne = total - 1;
            var isRibbon = ribbon;
            var halfSize1 = scale1[0] * size1[0] * 0.5;
            var halfSize2 = scale2[0] * size2[0] * 0.5;
            if (isRibbon && lastPos) {
                var vecHelper = _this._vectorHelper2;
                common.Vector.sub(vecHelper, pos1, lastPos);
                common.Vector.sub(perpHelper, pos2, pos1);
                common.Vector.normalize(vecHelper, vecHelper);
                common.Vector.normalize(perpHelper, perpHelper);
                common.Vector.add(perpHelper, vecHelper, perpHelper);
            }
            else {
                common.Vector.sub(perpHelper, pos2, pos1);
                common.Vector.normalize(perpHelper, perpHelper);
            }
            //Perpendicular
            common.Vector.set(perpHelper, -perpHelper[1], perpHelper[0]);
            //Vertex 0 left top
            common.Vector.scaleAndAdd(posHelper, pos1, perpHelper, -halfSize1);
            uvHelper[0] = 0;
            uvHelper[1] = sliceIndex / totalDecOne;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color1,
            }, vtxBufferByteOffset);
            //Vertex 1 right top
            common.Vector.scaleAndAdd(posHelper, pos1, perpHelper, halfSize1);
            uvHelper[0] = 1;
            uvHelper[1] = sliceIndex / totalDecOne;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color1,
            }, vtxBufferByteOffset);
            if (!ribbon || sliceIndex === totalDecOne - 1) {
                if (ribbon) { //Recaculate perpendicular vector for final point.
                    common.Vector.sub(perpHelper, pos2, pos1);
                    common.Vector.normalize(perpHelper, perpHelper);
                    //Perpendicular
                    common.Vector.set(perpHelper, -perpHelper[1], perpHelper[0]);
                }
                //Vertex 2 left bottom
                common.Vector.scaleAndAdd(posHelper, pos2, perpHelper, -halfSize2);
                uvHelper[0] = 0;
                uvHelper[1] = (sliceIndex + 1) / totalDecOne;
                vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                    pos: posHelper,
                    uv: uvHelper,
                    color: color2,
                }, vtxBufferByteOffset);
                //Vertex 3 right bottom
                common.Vector.scaleAndAdd(posHelper, pos2, perpHelper, halfSize2);
                uvHelper[0] = 1;
                uvHelper[1] = (sliceIndex + 1) / totalDecOne;
                vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                    pos: posHelper,
                    uv: uvHelper,
                    color: color2,
                }, vtxBufferByteOffset);
            }
            //Index
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            if (ribbon) {
                idxValueOffset += 2;
            }
            else {
                idxValueOffset += 4;
            }
        };
        var sizeHelper = this._sizeHelper;
        var scaleHelper = this._scaleHelper;
        var colorHelper = this._colorHelper;
        var sliceIndex = 0;
        if (head) {
            if (particleCount) {
                common.Vector.copy(sizeHelper, particles[0].size || common.VECTOR_ZERO);
                common.Vector.copy(scaleHelper, particles[0].scale || common.VECTOR_ONE);
                common.Color.copy(colorHelper, particles[0].color || common.COLOR_WHITE);
            }
            else {
                common.Vector.copy(sizeHelper, common.VECTOR_ZERO);
                common.Vector.copy(scaleHelper, common.VECTOR_ONE);
                common.Color.copy(colorHelper, common.COLOR_WHITE);
            }
        }
        //Traverse all particles.
        for (var particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            var particle = particles[particleIndex];
            var pos = particle.pos || common.VECTOR_ZERO;
            var scale = particle.scale || common.VECTOR_ONE;
            var size = particle.size || common.VECTOR_ZERO;
            var color = particle.color || common.COLOR_WHITE;
            if (particleIndex) {
                var particleLast = particles[particleIndex - 1];
                var posLast = particleLast.pos || common.VECTOR_ZERO;
                var scaleLast = particleLast.scale || common.VECTOR_ONE;
                var sizeLast = particleLast.size || common.VECTOR_ZERO;
                var colorLast = particleLast.color || common.COLOR_WHITE;
                fillVertexData(sliceIndex, posLast, pos, sizeLast, size, scaleLast, scale, colorLast, color, particleIndex > 1 ? particles[particleIndex - 2].pos : head);
                ++sliceIndex;
            }
            else if (head) {
                fillVertexData(sliceIndex, head, pos, sizeHelper, size, scaleHelper, scale, colorHelper, color, null);
                ++sliceIndex;
            }
        }
        if (tail) {
            if (particleCount) {
                var particle = particles[particleCount - 1];
                common.Vector.copy(sizeHelper, particle.size || common.VECTOR_ZERO);
                common.Vector.copy(scaleHelper, particle.scale || common.VECTOR_ONE);
                common.Color.copy(colorHelper, particle.color || common.COLOR_WHITE);
                var pos = particle.pos || common.VECTOR_ZERO;
                var scale = particle.scale || common.VECTOR_ONE;
                var size = particle.size || common.VECTOR_ZERO;
                var color = particle.color || common.COLOR_WHITE;
                fillVertexData(sliceIndex, pos, tail, size, sizeHelper, scale, scaleHelper, color, colorHelper, particleCount > 1 ? particles[particleCount - 2].pos : head);
            }
            else {
                fillVertexData(sliceIndex, head, tail, sizeHelper, common.VECTOR_ZERO, scaleHelper, common.VECTOR_ONE, colorHelper, common.COLOR_WHITE, null);
            }
        }
        var cmdHelper = context._cmdHelper;
        cmdHelper.vertexBufferByteOffset = offsets.vtxBufferByteOffset;
        cmdHelper.indexOffset = offsets.lastIndexCount;
        cmdHelper.indexCount = Math.max(0, 6 * (finalParticleCount - 1));
        ;
        cmdHelper.material = this.material.id;
        cmdHelper.emitterPlayer = this.player.id;
        var psData = this.player.psData;
        if (psData.useLocalSpace) {
            common.Matrix4x4.copy(cmdHelper.matrixModel, psData.matrix4x4);
        }
        else {
            common.Matrix4x4.identity(cmdHelper.matrixModel);
        }
        drawData.fillDrawCmd(cmdHelper);
    };
    ModSpriteConnected.NAME = "sprite_connected";
    return ModSpriteConnected;
}(module_1.Module));
exports.ModSpriteConnected = ModSpriteConnected;
