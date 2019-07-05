"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("./context");
function init() {
    return Promise.resolve()
        .then(function () {
        return context_1.context.init();
    });
}
exports.init = init;
//# sourceMappingURL=index.js.map