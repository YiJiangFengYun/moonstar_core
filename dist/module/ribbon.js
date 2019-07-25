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
var emitterPlayer = require("../emitter_player");
var util = require("../util");
var module_1 = require("./module");
var ModRibbon = /** @class */ (function (_super) {
    __extends(ModRibbon, _super);
    function ModRibbon(player) {
        var _this = _super.call(this, player) || this;
        _this.material = new material.Material(material.MaterialType.RIBBON);
        _this._vecDirectHelper = common.Vector.create();
        _this._vecDirectHelper2 = common.Vector.create();
        _this._vecPerpendicularHelper = common.Vector.create();
        _this._posHelper = common.Vector.create();
        _this._uvHelper = common.Vector.create();
        _this._cmdHelper = render.DrawCmd.create();
        player.on(emitterPlayer.EVENT_CREATED_PARTICLE, _this._onCreatedParticle, _this);
        player.on(emitterPlayer.EVENT_DESTROYED_PARTICLE, _this._onDestroyedParticle, _this);
        player.on(emitterPlayer.EVENT_RESET, _this._onReset, _this);
        return _this;
    }
    ModRibbon.prototype.init = function (info) {
        _super.prototype.init.call(this, info);
        this.material.init(info);
        this.queueParticles = new util.QueueArrayFixed(this.player.maxParticleCount);
    };
    ModRibbon.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.queueParticles.empty();
    };
    ModRibbon.prototype.getTotalVtxCount = function () {
        return this.queueParticles.length * 2;
    };
    ModRibbon.prototype.getTotalIdxCount = function () {
        return Math.max(0, (this.queueParticles.length - 1) * 6);
    };
    ModRibbon.prototype.getMaxVtxCount = function () {
        return this.player.maxParticleCount * 2;
    };
    ModRibbon.prototype.getMaxIdxCount = function () {
        return Math.max(0, (this.player.maxParticleCount - 1) * 6);
    };
    ModRibbon.prototype.fillBuffers = function (drawData, offsets, batchInfo) {
        var player = this.player;
        var queueParticles = this.queueParticles;
        var particleCount = queueParticles.length;
        var vtxBufferByteOffset = offsets.vtxBufferByteOffset;
        var idxBufferByteOffset = offsets.idxBufferByteOffset;
        var idxValueOffset = batchInfo ? batchInfo.lastBatchVertexCount : 0;
        var vecDirectHelper = this._vecDirectHelper;
        var vecDirectHelper2 = this._vecDirectHelper2;
        var vecPerpendicularHelper = this._vecPerpendicularHelper;
        var posHelper = this._posHelper;
        var uvHelper = this._uvHelper;
        var cmdHelper = this._cmdHelper;
        if (particleCount > 1) {
            var particleCountDecOne = particleCount - 1;
            for (var particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
                var particle_1 = queueParticles.getItem(particleIndex);
                var particlePos = particle_1.pos;
                var particle2 = void 0;
                var particle3 = void 0;
                var particle2Pos = void 0;
                var particle3Pos = void 0;
                var vecDirect = vecDirectHelper;
                var vecDirect2 = vecDirectHelper2;
                if (particleIndex < particleCountDecOne) {
                    if (particleIndex > 0) {
                        particle2 = queueParticles.getItem(particleIndex + 1);
                        particle2Pos = particle2.pos;
                        particle3 = queueParticles.getItem(particleIndex - 1);
                        particle3Pos = particle3.pos;
                        vecDirect[0] = (particle2Pos[0] - particlePos[0]);
                        vecDirect[1] = (particle2Pos[1] - particlePos[1]);
                        vecDirect2[0] = (particlePos[0] - particle3Pos[0]);
                        vecDirect2[1] = (particlePos[1] - particle3Pos[1]);
                        common.Vector.normalize(vecDirect, vecDirect);
                        common.Vector.normalize(vecDirect2, vecDirect2);
                        common.Vector.add(vecDirect, vecDirect, vecDirect2);
                    }
                    else {
                        particle2 = queueParticles.getItem(particleIndex + 1);
                        particle2Pos = particle2.pos;
                        vecDirect[0] = particle2Pos[0] - particlePos[0];
                        vecDirect[1] = particle2Pos[1] - particlePos[1];
                    }
                }
                else {
                    particle2 = queueParticles.getItem(particleIndex - 1);
                    particle2Pos = particle2.pos;
                    vecDirect[0] = particlePos[0] - particle2Pos[0];
                    vecDirect[1] = particlePos[1] - particle2Pos[1];
                }
                common.Vector.normalize(vecDirect, vecDirect);
                var vecPerpendicular = vecPerpendicularHelper;
                vecPerpendicular[0] = -vecDirect[1];
                vecPerpendicular[1] = vecDirect[0];
                var scale = particle_1.scale || common.VECTOR_ONE;
                var scaleWidth = scale[0];
                var size = particle_1.size || common.COLOR_ZERO;
                var sizeWidth = size[0];
                var color = particle_1.color || common.COLOR_WHITE;
                var life = particle_1.life;
                var widthHalf = scaleWidth * sizeWidth * 0.5;
                var vec_width_x = vecPerpendicular[0] * widthHalf;
                var vec_width_y = vecPerpendicular[1] * widthHalf;
                //The vertex of the left.
                posHelper[0] = particlePos[0] - vec_width_x;
                posHelper[1] = particlePos[1] - vec_width_y;
                uvHelper[0] = 0;
                uvHelper[1] = life;
                vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                    pos: posHelper,
                    uv: uvHelper,
                    color: color,
                }, vtxBufferByteOffset);
                //The vertex of the right.
                posHelper[0] = particlePos[0] + vec_width_x;
                posHelper[1] = particlePos[1] + vec_width_y;
                uvHelper[0] = 1;
                uvHelper[1] = life;
                vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                    pos: posHelper,
                    uv: uvHelper,
                    color: color,
                }, vtxBufferByteOffset);
                //Index
                if (particleIndex > 0) {
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
                    idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
                    idxValueOffset += 2;
                }
            }
        }
        var indexCount = Math.max(0, (particleCount - 1) * 6);
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
    ModRibbon.prototype._onCreatedParticle = function (particle) {
        this.queueParticles.push(particle);
    };
    ModRibbon.prototype._onDestroyedParticle = function () {
        this.queueParticles.pop();
    };
    ModRibbon.prototype._onReset = function () {
        this.queueParticles.empty();
    };
    ModRibbon.NAME = "ribbon";
    return ModRibbon;
}(module_1.Module));
exports.ModRibbon = ModRibbon;
