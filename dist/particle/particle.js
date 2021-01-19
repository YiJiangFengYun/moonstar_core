"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticle = void 0;
var common = require("../common");
function createParticle() {
    return { id: common.gainID() };
}
exports.createParticle = createParticle;
