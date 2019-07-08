"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("../core");
var context_1 = require("./context");
function init(canvas) {
    return Promise.resolve()
        .then(function () {
        return core.init();
    })
        .then(function () {
        return context_1.context.init(canvas);
    });
}
exports.init = init;
__export(require("./context"));
__export(require("./material"));
__export(require("./particle_system"));
__export(require("./renderer"));
//# sourceMappingURL=index.js.map