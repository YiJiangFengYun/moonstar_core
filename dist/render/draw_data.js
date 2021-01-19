"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawData = exports.DrawCmd = exports.fillVertex = exports.vertexInfo = void 0;
var common = require("../common");
exports.vertexInfo = [
    {
        name: common.AttrName.POSITION,
        format: common.ValueFormat.FLOAT32,
        count: 2,
        normalized: false,
    },
    {
        name: common.AttrName.UV0,
        format: common.ValueFormat.FLOAT32,
        count: 2,
        normalized: false,
    },
    {
        name: common.AttrName.COLOR,
        format: common.ValueFormat.UINT8,
        count: 4,
        normalized: true,
    }
];
function fillVertex(data, buffer, byteOffset) {
    // Position
    var float32Array = new Float32Array(buffer, byteOffset);
    float32Array.set(data.pos);
    byteOffset += common.ByteLengthVector;
    // UV0
    try {
        float32Array.set(data.uv, data.pos.length);
    }
    catch (err) {
        console.error(err);
    }
    byteOffset += common.ByteLengthVector;
    // Color
    var uint8Array = new Uint8Array(buffer, byteOffset);
    uint8Array[0] = data.color[0] * 255;
    uint8Array[1] = data.color[1] * 255;
    uint8Array[2] = data.color[2] * 255;
    uint8Array[3] = data.color[3] * 255;
    byteOffset += 4;
    return byteOffset;
}
exports.fillVertex = fillVertex;
exports.DrawCmd = {
    create: function () {
        return {
            vertexBufferByteOffset: 0,
            indexOffset: 0,
            indexCount: 0,
            material: 0,
            bounds: common.Bounds.create(),
            matrixModel: common.Matrix4x4.create(),
        };
    },
    copy: function (out, cmd) {
        if (!out)
            out = exports.DrawCmd.create();
        out.vertexBufferByteOffset = cmd.vertexBufferByteOffset;
        out.indexOffset = cmd.indexOffset;
        out.indexCount = cmd.indexCount;
        out.material = cmd.material;
        common.Bounds.copy(out.bounds, cmd.bounds);
        common.Matrix4x4.copy(out.matrixModel, cmd.matrixModel);
        return out;
    }
};
var DrawData = /** @class */ (function () {
    function DrawData() {
        this.vertexInfo = exports.vertexInfo;
        this.cmdList = [];
        var vtxSize = 0;
        var vInfo = this.vertexInfo;
        var vFSizes = common.valueFormatSizes;
        vInfo.forEach(function (value) {
            vtxSize += vFSizes[value.format] * value.count;
        });
        this.vtxSize = vtxSize;
        this.idxSize = common.indexSize;
    }
    /**
     * Initialize and allocate the capacity of its buffers.
     * @param totalVtxCount
     * @param totalIdxCount
     */
    DrawData.prototype.init = function (info) {
        var vtxSize = this.vtxSize;
        var idxSize = this.idxSize;
        var bufferSize = vtxSize * info.maxVtxCount;
        if (!this.vtxBuffer || this.vtxBuffer.byteLength < bufferSize) {
            this.vtxBuffer = new ArrayBuffer(bufferSize);
        }
        bufferSize = idxSize * info.maxIdxCount;
        if (!this.idxBuffer || this.idxBuffer.byteLength < bufferSize) {
            this.idxBuffer = new ArrayBuffer(bufferSize);
            this.idxBufferView = new Uint16Array(this.idxBuffer);
        }
        this.cmdCount = 0;
    };
    DrawData.prototype.updateData = function (info) {
        this.totalVtxCount = info.totalVtxCount;
        this.totalIdxCount = info.totalIdxCount;
    };
    DrawData.prototype.clearCmds = function () {
        this.cmdCount = 0;
    };
    /**
     * Fill a vertex data to vertex buffer.
     * @param data
     * @param byteOffset
     */
    DrawData.prototype.fillVertex = function (data, byteOffset) {
        return fillVertex(data, this.vtxBuffer, byteOffset);
    };
    /**
     * Fill a index value to index buffer.
     * @param index
     * @param byteOffset
     */
    DrawData.prototype.fillIndex = function (index, byteOffset) {
        this.idxBufferView[byteOffset / common.indexSize] = index;
        return byteOffset + common.indexSize;
    };
    DrawData.prototype.fillDrawCmd = function (drawCmd) {
        var cmdList = this.cmdList;
        var cmdCount = this.cmdCount;
        var cmd = cmdList[cmdCount];
        if (!cmd)
            cmdList[cmdCount] = cmd = exports.DrawCmd.create();
        exports.DrawCmd.copy(cmd, drawCmd);
        ++this.cmdCount;
    };
    return DrawData;
}());
exports.DrawData = DrawData;
