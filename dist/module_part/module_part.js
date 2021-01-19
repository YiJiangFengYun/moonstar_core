"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModulePart = void 0;
function createModulePart(ctor, player) {
    return new ctor(player);
}
exports.createModulePart = createModulePart;
