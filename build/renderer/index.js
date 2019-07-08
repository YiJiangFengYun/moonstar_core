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
        r.init(info);
        return r;
    });
}
exports.init = init;
//# sourceMappingURL=index.js.map