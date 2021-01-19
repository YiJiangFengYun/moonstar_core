"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = exports.ParticleSystem = exports.init = void 0;
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
Object.defineProperty(exports, "ParticleSystem", { enumerable: true, get: function () { return particle_system_1.ParticleSystem; } });
var renderer_2 = require("./renderer");
Object.defineProperty(exports, "Renderer", { enumerable: true, get: function () { return renderer_2.Renderer; } });
//# sourceMappingURL=index.js.map