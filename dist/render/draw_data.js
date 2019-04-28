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
    function DrawData(space) {
        this.space = space;
        this.vertexFormat = exports.SPACE_VERTEX_FORMATS[space];
    }
    return DrawData;
}());
exports.DrawData = DrawData;
