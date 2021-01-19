"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticle = void 0;
var common = require("../common");
function createParticle(seq) {
    return { id: common.gainID(), seq: seq };
}
exports.createParticle = createParticle;
