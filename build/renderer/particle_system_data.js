"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticleSystemData = void 0;
var core = require("../core");
var context_1 = require("./context");
var ParticleSystemData = /** @class */ (function () {
    function ParticleSystemData() {
        this.psCore = new core.ParticleSystem();
    }
    ParticleSystemData.prototype.init = function (info) {
        var psCore = this.psCore;
        //Initialize the core particle system.
        psCore.init(info);
        //Initialize the buffers from the draw data of the particle system.
        this._initBuffers();
    };
    ParticleSystemData.prototype.changePos = function (pos) {
        this.psCore.data.setPosition(pos);
    };
    ParticleSystemData.prototype.refreshBuffers = function () {
        this._refreshBuffers();
    };
    //
    // initBuffers
    //
    ParticleSystemData.prototype._initBuffers = function () {
        var gl = context_1.context.gl;
        var drawData = this.psCore.drawData;
        //Vertex buffer.
        var vertexBuffer = gl.createBuffer();
        this.vertexBuffer = vertexBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, drawData.vtxBuffer, gl.DYNAMIC_DRAW);
        //Index buffer
        var indexBuffer = gl.createBuffer();
        this.indexBuffer = indexBuffer;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawData.idxBuffer, gl.DYNAMIC_DRAW);
    };
    ParticleSystemData.prototype._refreshBuffers = function () {
        var gl = context_1.context.gl;
        var drawData = this.psCore.drawData;
        if (drawData.totalIdxCount > 0) {
            //Vertex buffer.
            var vertexBuffer = this.vertexBuffer;
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, drawData.vtxBuffer, gl.DYNAMIC_DRAW);
            //Index buffer
            var indexBuffer = this.indexBuffer;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawData.idxBuffer, gl.DYNAMIC_DRAW);
        }
    };
    return ParticleSystemData;
}());
exports.ParticleSystemData = ParticleSystemData;
//# sourceMappingURL=particle_system_data.js.map