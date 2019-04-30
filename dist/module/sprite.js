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
var module_1 = require("./module");
var ModSprite = /** @class */ (function (_super) {
    __extends(ModSprite, _super);
    function ModSprite(owner) {
        var _this = _super.call(this, owner) || this;
        _this.name = ModSprite.NAME;
        return _this;
    }
    ModSprite.prototype.getTotalVtxCount = function () {
        return 0;
    };
    ModSprite.prototype.getTotalIdxCount = function () {
        return 0;
    };
    ModSprite.prototype.fillVtxBuffer = function (buffer, offset, vtxFormat, vtxSize) {
    };
    ModSprite.prototype.fillIdxBuffer = function (buffer, offset, idxOffset, idxSize) {
    };
    ModSprite.NAME = "sprite";
    return ModSprite;
}(module_1.Module));
exports.ModSprite = ModSprite;
