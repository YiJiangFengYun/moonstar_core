"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var space_type_1 = require("../common/space_type");
var draw_data_1 = require("../render/draw_data");
var ParticleSystem2D = /** @class */ (function () {
    function ParticleSystem2D() {
        this.space = space_type_1.SpaceID.SPACE_2D;
        this.drawData = new draw_data_1.DrawData(this.space);
        this.components = [];
        this.emitters = [];
    }
    return ParticleSystem2D;
}());
exports.ParticleSystem2D = ParticleSystem2D;
var ParticleSystem3D = /** @class */ (function () {
    function ParticleSystem3D() {
        this.space = space_type_1.SpaceID.SPACE_3D;
        this.drawData = new draw_data_1.DrawData(this.space);
        this.components = [];
        this.emitters = [];
    }
    return ParticleSystem3D;
}());
exports.ParticleSystem3D = ParticleSystem3D;
//# sourceMappingURL=particle_system.js.map