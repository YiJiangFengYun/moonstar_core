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
exports.PSData = void 0;
var eventemitter = require("eventemitter3");
var common = require("../common");
var events_1 = require("./events");
var PSData = /** @class */ (function (_super) {
    __extends(PSData, _super);
    function PSData() {
        var _this = _super.call(this) || this;
        _this.bounds = common.Bounds.create();
        _this.position = common.Vector.create();
        _this.globalBounds = common.Bounds.create();
        _this.matrix = common.Matrix.create();
        _this.matrix4x4 = common.Matrix4x4.create();
        return _this;
    }
    PSData.prototype.init = function (info) {
        this.useLocalSpace = info.useLocalSpace;
        var boundsInfo = info.bounds;
        if (boundsInfo)
            common.Bounds.set(this.bounds, boundsInfo[0], boundsInfo[1], boundsInfo[2], boundsInfo[3]);
    };
    PSData.prototype.setPosition = function (value) {
        common.Vector.copy(this.position, value);
        common.Bounds.translate(this.globalBounds, this.bounds, this.position);
        common.Matrix.fromTranslation(this.matrix, this.position);
        common.Matrix4x4.fromTranslation(this.matrix4x4, [value[0], value[1], 0]);
        this.emit(events_1.EVENT_CHANGE_POSITION);
    };
    return PSData;
}(eventemitter.EventEmitter));
exports.PSData = PSData;
//# sourceMappingURL=ps_data.js.map