"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
function init() {
    return Promise.resolve()
        .then(function () {
        console.info("\n////////////////////////\nMoonstar Particle System\n////////////////////////\n        ");
    });
}
exports.init = init;
__export(require("./common"));
__export(require("./material"));
__export(require("./render"));
__export(require("./module"));
__export(require("./emitter"));
__export(require("./particle_system"));
