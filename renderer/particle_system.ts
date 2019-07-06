import * as core from "../core";
import { context } from "./context";
import { Material } from "./material";
/**
 * A particle system class is for a draw data state of a particle system of the core.
 */

export class ParticleSystem implements core.IPlayer {
    public psCore: core.ParticleSystem = new core.ParticleSystem();
    public vertexBuffer: WebGLBuffer;
    public indexBuffer: WebGLBuffer;
    public mapMaterials: {[id: number]: Material} = {};
    public constructor() {
    }

    public init(info: core.ParticleSystemInfo) {
        let psCore = this.psCore;
        //Initialize the core particle system.
        psCore.init(info);

        //Initialize the map of the all materials.
        let emitters = psCore.emitters;
        let emitterCount = psCore.emitterCount;
        let mapMaterials = this.mapMaterials;
        for (let i = 0; i < emitterCount; ++i) {
            let material = new Material();
            let renderModule = emitters[i].renderModule;
            let matCore = renderModule.material
            material.init(matCore);
            mapMaterials[matCore.id] = material;
        }

        //Initialize the buffers from the draw data of the particle system.
        this._initBuffers();
    }

    public update(dt: number) {
        this.psCore.update(dt);
    }

    public render() {
        this.psCore.render();
        this._draw();
    }

    public play(): void {
        return this.psCore.play();
    }

    public pause(): void {
        return this.psCore.pause();
    }

    public stop(): void {
        return this.psCore.stop();
    }

    public get elapsedTime() {
        return this.psCore.elapsedTime;
    }

    public get isPlay() {
        return this.psCore.isPlay;
    }

    private _draw() {

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