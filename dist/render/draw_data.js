"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vertex_1 = require("../common/vertex");
exports.SPACE_VERTEX_FORMATS = {
    1: [{
            name: vertex_1.AttrName.POSITION,
            format: vertex_1.AttrFormat.FLOAT32,
            count: 2,
            normalized: false,
        }, {
            name: vertex_1.AttrName.COLOR,
            format: vertex_1.AttrFormat.UINT8,
            count: 4,
            normalized: true,
        }, {
            name: vertex_1.AttrName.UV0,
            format: vertex_1.AttrFormat.FLOAT32,
            count: 2,
            normalized: false,
        }],
    2: [{
            name: vertex_1.AttrName.POSITION,
            format: vertex_1.AttrFormat.FLOAT32,
            count: 3,
            normalized: false,
        }, {
            name: vertex_1.AttrName.COLOR,
            format: vertex_1.AttrFormat.UINT8,
            count: 4,
            normalized: true,
        }, {
            name: vertex_1.AttrName.UV0,
            format: vertex_1.AttrFormat.FLOAT32,
            count: 2,
            normalized: false,
        }]
};
var DrawData = /** @class */ (function () {
    function DrawData() {
        this.vertexFormat = exports.SPACE_VERTEX_FORMATS[0];
        this.cmdList = [];
        var vtxBufferSize = 0;
        var vertexFormat = this.vertexFormat;
        var attrFormatSizes = vertex_1.ATTR_FORMAT_SIZES;
        vertexFormat.forEach(function (item) {
            vtxBufferSize += attrFormatSizes[item.format] * item.count;
        });
        this.vtxSize = vtxBufferSize;
        this.idxSize = vertex_1.INDEX_SIZE;
    }
    DrawData.prototype.init = function (totalVtxCount, totalIdxCount) {
        this.totalVtxCount = totalVtxCount;
        this.totalIdxCount = totalIdxCount;
        var vtxSize = this.vtxSize;
        var idxSize = this.idxSize;
        this.vtxBuffer = new ArrayBuffer(vtxSize * totalVtxCount);
        this.idxBuffer = new ArrayBuffer(idxSize * totalIdxCount);
        this.cmdListCount = 0;
    };
    return DrawData;
}());
exports.DrawData = DrawData;
