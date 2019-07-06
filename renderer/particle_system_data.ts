import * as glMatrix from "gl-matrix";
import * as log from "loglevel";
import * as core from "../core";
import { RenderData } from "./render_data";
import { context } from "./context";

export class ParticleSystemData {
    public psCore: core.ParticleSystem = new core.ParticleSystem();
    public vertexBuffer: WebGLBuffer;
    public indexBuffer: WebGLBuffer;
    public modelViewMatrix: glMatrix.mat4 = glMatrix.mat4.create();
    public renderData: RenderData;

    public init(info: core.ParticleSystemInfo) {
        let psCore = this.psCore;
        //Initialize the core particle system.
        psCore.init(info);
        //Initialize the buffers from the draw data of the particle system.
        this._initBuffers();
    }

    //
    // initBuffers
    //
    private _initBuffers() {
        let gl = context.gl;
        let drawData = this.psCore.drawData;

        //Vertex buffer.
        const vertexBuffer = gl.createBuffer();
        this.vertexBuffer = vertexBuffer;

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);


        gl.bufferData(gl.ARRAY_BUFFER, drawData.vtxBuffer, gl.STATIC_DRAW);

        //Index buffer
        const indexBuffer = gl.createBuffer();
        this.indexBuffer = indexBuffer;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawData.idxBuffer, gl.STATIC_DRAW);

    }
}