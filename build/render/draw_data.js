"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function fillVertex(data, bufferView, byteOffset) {
    // Position
    bufferView.setFloat32(byteOffset, data.posX);
    byteOffset += 4;
    bufferView.setFloat32(byteOffset, data.posY);
    byteOffset += 4;
    // UV0
    bufferView.setFloat32(byteOffset, data.uv0X);
    byteOffset += 4;
    bufferView.setFloat32(byteOffset, data.uv0Y);
    byteOffset += 4;
    // Color
    bufferView.setUint8(byteOffset, (data.colorR || 0) * 255);
    byteOffset += 1;
    bufferView.setUint8(byteOffset, (data.colorG || 0) * 255);
    byteOffset += 1;
    bufferView.setUint8(byteOffset, (data.colorB || 0) * 255);
    byteOffset += 1;
    bufferView.setUint8(byteOffset, (data.colorA || 0) * 255);
    byteOffset += 1;
    return byteOffset;
}
exports.fillVertex = fillVertex;
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
     * Initialize its state and allocate the capacity of its buffers.
     * @param totalVtxCount
     * @param totalIdxCount
     */
    DrawData.prototype.init = function (totalVtxCount, totalIdxCount) {
        this.totalVtxCount = totalVtxCount;
        this.totalIdxCount = totalIdxCount;
        var vtxSize = this.vtxSize;
        var idxSize = this.idxSize;
        this.vtxBuffer = new ArrayBuffer(vtxSize * totalVtxCount);
        this.vtxBufferView = new DataView(this.vtxBuffer);
        this.idxBuffer = new ArrayBuffer(idxSize * totalIdxCount);
        this.idxBufferView = new DataView(this.idxBuffer);
        this.cmdListCount = 0;
    };
    /**
     * Fill a vertex data to vertex buffer.
     * @param data
     * @param byteOffset
     */
    DrawData.prototype.fillVertex = function (data, byteOffset) {
        return fillVertex(data, this.vtxBufferView, byteOffset);
    };
    /**
     * Fill a index value to index buffer.
     * @param index
     * @param byteOffset
     */
    DrawData.prototype.fillIndex = function (index, byteOffset) {
        this.idxBufferView.setUint32(byteOffset, index);
        return byteOffset + 4;
    };
    return DrawData;
}());
exports.DrawData = DrawData;
//# sourceMappingURL=draw_data.js.map