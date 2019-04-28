"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var space_type_1 = require("../common/space_type");
var ParticleSystem2D = /** @class */ (function () {
    function ParticleSystem2D() {
        this.space = space_type_1.SpaceID.SPACE_2D;
        this.components = [];
        this.emitters = [];
    }
    return ParticleSystem2D;
}());
exports.ParticleSystem2D = ParticleSystem2D;
var ParticleSystem3D = /** @class */ (function () {
    function ParticleSystem3D() {
        this.space = space_type_1.SpaceID.SPACE_3D;
        this.components = [];
        this.emitters = [];
    }
    return ParticleSystem3D;
}());
exports.ParticleSystem3D = ParticleSystem3D;
//# sourceMappingURL=particle_system.js.map