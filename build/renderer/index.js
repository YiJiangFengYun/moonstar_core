"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("../core");
var renderer_1 = require("./renderer");
var r = renderer_1.renderer;
function init(info) {
    return Promise.resolve()
        .then(function () {
        return core.init();
    })
        .then(function () {
        return r.init(info)
            .then(function () {
            return r;
        });
    });
}
exports.init = init;
var particle_system_1 = require("./particle_system");
exports.ParticleSystem = particle_system_1.ParticleSystem;
var renderer_2 = require("./renderer");
exports.Renderer = renderer_2.Renderer;
//# sourceMappingURL=index.js.map