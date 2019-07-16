"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glMatrix = require("gl-matrix");
var core = require("../core");
var context_1 = require("./context");
var ParticleSystemData = /** @class */ (function () {
    function ParticleSystemData() {
        this.psCore = new core.ParticleSystem();
        this.modelViewMatrix = glMatrix.mat4.create();
    }
    ParticleSystemData.prototype.init = function (info) {
        var psCore = this.psCore;
        //Initialize the core particle system.
        psCore.init(info);
        var pos = psCore.position;
        glMatrix.mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [pos[0], pos[1], 0]);
        //Initialize the buffers from the draw data of the particle system.
        this._initBuffers();
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