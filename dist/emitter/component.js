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
var EComponent = /** @class */ (function () {
    function EComponent(owner) {
        this.owner = owner;
    }
    EComponent.prototype.update = function (dt) {
    };
    return EComponent;
}());
exports.EComponent = EComponent;
var ERenderComponent = /** @class */ (function (_super) {
    __extends(ERenderComponent, _super);
    function ERenderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ERenderComponent.prototype.getTotalVtxCount = function () {
        return 0;
    };
    ERenderComponent.prototype.getTotalIdxCount = function () {
        return 0;
    };
    ERenderComponent.prototype.fillVtxBuffer = function (buffer, offset, vtxFormat, vtxSize) {
    };
    ERenderComponent.prototype.fillIdxBuffer = function (buffer, offset, idxOffset, idxSize) {
    };
    return ERenderComponent;
}(EComponent));
exports.ERenderComponent = ERenderComponent;
