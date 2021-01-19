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
exports.ParticleSystem = void 0;
var common = require("../common");
var emitter = require("../emitter");
var psData = require("../ps_data");
var render = require("../render");
var material = require("../material");
/**
 * Note: All emitters should be created when the ParticleSystem init.
 * If a emitter play latter, you should stop the emitter, and then play it.
 */
var ParticleSystem = /** @class */ (function (_super) {
    __extends(ParticleSystem, _super);
    function ParticleSystem() {
        var _this = _super.call(this) || this;
        _this.data = new psData.PSData();
        _this.drawData = new render.DrawData();
        _this.emitters = [];
        _this.emitterCount = 0;
        _this._cmdHelper = render.DrawCmd.create();
        _this._id = common.gainID();
        return _this;
    }
    Object.defineProperty(ParticleSystem.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    ParticleSystem.prototype.init = function (info) {
        this.data.init(info);
        var len = info.emitters ? info.emitters.length : 0;
        var newCount = 0;
        for (var i = 0; i < len; ++i) {
            newCount += (info.emitters[i].count || 1);
        }
        var emitterInfos = [];
        emitterInfos.length = newCount;
        var emitterInfoIndex = 0;
        for (var i = 0; i < len; ++i) {
            var count = info.emitters[i].count || 1;
            for (var j = 0; j < count; ++j) {
                emitterInfos[emitterInfoIndex] = info.emitters[i];
                ++emitterInfoIndex;
            }
        }
        this.emitterCount = newCount;
        var emitters = this.emitters;
        if (emitters.length < newCount) {
            emitters.length = newCount;
        }
        // Create emitters
        var mapEmitters = {};
        for (var i = 0; i < newCount; ++i) {
            var et = emitters[i];
            var etInfo = emitterInfos[i];
            if (!et)
                emitters[i] = et = new emitter.Emitter(this.data);
            et.init(etInfo);
            if (!et.name) {
                et.name = "emitter_" + (i + 1);
            }
            mapEmitters[et.name] = et;
        }
        // Initialize the hierarchy of the emiiters
        for (var i = 0; i < newCount; ++i) {
            var et = emitters[i];
            var etInfo = emitterInfos[i];
            if (etInfo.parent) {
                var parentEt = mapEmitters[etInfo.parent];
                var parentPlayer = parentEt.player;
                parentPlayer.addPlayer(et.player);
            }
        }
        // Sort the emitters by their render module and material.
        emitters.sort(function (a, b) {
            var rMA = a.renderModule;
            var rMB = b.renderModule;
            var typeIDRMA = rMA ? rMA.typeID : 0;
            var typeIDRMB = rMB ? rMB.typeID : 0;
            if (typeIDRMA !== typeIDRMB)
                return typeIDRMA - typeIDRMB;
            var matA = rMA ? rMA.material : null;
            var matB = rMB ? rMB.material : null;
            var matABoolNum = Number(Boolean(matA));
            var matBBoolNum = Number(Boolean(matB));
            if (matABoolNum !== matBBoolNum) {
                return matABoolNum - matBBoolNum;
            }
            if (matA) {
                return material.Material.sort(matA, matB);
            }
            return 0;
        });
        // Ready and player the emitters
        for (var i = 0; i < newCount; ++i) {
            emitters[i].ready();
            if (!emitterInfos[i].parent)
                emitters[i].player.play();
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
                console.warn("The emitter don't own a render component.");
            }
        }
        this.drawData.init({
            maxVtxCount: maxVtxCount,
            maxIdxCount: maxIdxCount,
        });
    };
    ParticleSystem.prototype.setPosition = function (pos) {
        this.data.setPosition(pos);
    };
    ParticleSystem.prototype.play = function () {
        _super.prototype.play.call(this);
        //If root player is pausing after stop entire particle system, should play root player.
        var emitterCount = this.emitterCount;
        var emitters = this.emitters;
        for (var i = 0; i < emitterCount; ++i) {
            if (emitters[i].player.root)
                emitters[i].player.play();
        }
    };
    ParticleSystem.prototype.pause = function () {
        _super.prototype.pause.call(this);
    };
    ParticleSystem.prototype.stop = function () {
        //Should set all player isPlaying to false
        var emitterCount = this.emitterCount;
        var emitters = this.emitters;
        for (var i = 0; i < emitterCount; ++i) {
            emitters[i].player.pause();
        }
        _super.prototype.stop.call(this);
    };
    /**
     *
     * @param dt Passed time (s)
     */
    ParticleSystem.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        if (this.isPlaying) {
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
        var data = this.data;
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
                console.warn("The emitter don't own a render component.");
            }
        }
        //Update data.
        drawData.updateData({
            totalVtxCount: totalVtxCount,
            totalIdxCount: totalIdxCount,
        });
        drawData.clearCmds();
        var lastRenderModuleName = null;
        var lastRenderModule = null;
        var lastBatchVertexCount = 0;
        var lastDrawCmd = this._cmdHelper;
        var vtxBufferByteOffset = 0;
        var idxBufferByteOffset = 0;
        var lastVertexCount = 0;
        var lastIndexCount = 0;
        var fillDrawCmd = function (cmd) {
            drawData.fillDrawCmd(cmd);
            //clear
            cmd.indexCount = 0;
        };
        for (var i = 0; i < emitterCount; ++i) {
            var eRenderCpt = emitters[i].renderModule;
            var idxCount = eRenderCpt ? eRenderCpt.getTotalIdxCount() : 0;
            if (idxCount > 0) {
                var vtxCount = eRenderCpt.getTotalVtxCount();
                if (lastRenderModuleName === eRenderCpt.name && material.Material.equal(lastRenderModule.material, eRenderCpt.material)) {
                    var batchInfo = {
                        lastBatchVertexCount: lastBatchVertexCount,
                        lastDrawCmd: lastDrawCmd,
                    };
                    eRenderCpt.fillBuffers(drawData, {
                        vtxBufferByteOffset: vtxBufferByteOffset,
                        idxBufferByteOffset: idxBufferByteOffset,
                        lastVertexCount: lastVertexCount,
                        lastIndexCount: lastIndexCount,
                    }, batchInfo);
                    lastBatchVertexCount += vtxCount;
                }
                else {
                    if (lastDrawCmd.indexCount) {
                        fillDrawCmd(lastDrawCmd);
                    }
                    var resCmd = eRenderCpt.fillBuffers(drawData, {
                        vtxBufferByteOffset: vtxBufferByteOffset,
                        idxBufferByteOffset: idxBufferByteOffset,
                        lastVertexCount: lastVertexCount,
                        lastIndexCount: lastIndexCount,
                    });
                    render.DrawCmd.copy(lastDrawCmd, resCmd);
                    lastBatchVertexCount = vtxCount;
                    //ps matrix
                    if (data.useLocalSpace) {
                        common.Matrix4x4.copy(lastDrawCmd.matrixModel, data.matrix4x4);
                    }
                    else {
                        common.Matrix4x4.identity(lastDrawCmd.matrixModel);
                    }
                }
                lastVertexCount += vtxCount;
                lastIndexCount += idxCount;
                vtxBufferByteOffset += drawData.vtxSize * vtxCount;
                idxBufferByteOffset += drawData.idxSize * idxCount;
                lastRenderModuleName = eRenderCpt.name;
                lastRenderModule = eRenderCpt;
            }
        }
        if (lastDrawCmd.indexCount) {
            fillDrawCmd(lastDrawCmd);
        }
    };
    ParticleSystem.prototype._reset = function () {
        _super.prototype._reset.call(this);
        var emitterCount = this.emitterCount;
        var emitters = this.emitters;
        for (var i = 0; i < emitterCount; ++i) {
            emitters[i].reset();
        }
    };
    return ParticleSystem;
}(common.Player));
exports.ParticleSystem = ParticleSystem;
//# sourceMappingURL=particle_system.js.map