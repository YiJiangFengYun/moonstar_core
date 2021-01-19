"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init() {
    return Promise.resolve()
        .then(function () {
        console.info("\n////////////////////////\nMoonstar Particle System\nA cascade particle system.\n////////////////////////\n        ");
    });
}
exports.init = init;
__exportStar(require("./common"), exports);
__exportStar(require("./material"), exports);
__exportStar(require("./render"), exports);
__exportStar(require("./particle"), exports);
__exportStar(require("./module"), exports);
__exportStar(require("./emitter_player"), exports);
__exportStar(require("./emitter"), exports);
__exportStar(require("./particle_system"), exports);
//# sourceMappingURL=index.js.map