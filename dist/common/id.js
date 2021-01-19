"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gainID = void 0;
var id = 0;
function gainID() {
    return ++id;
}
exports.gainID = gainID;
