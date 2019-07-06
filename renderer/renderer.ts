import * as core from "../core";
import * as glMatrix from "gl-matrix";
import { ParticleSystem } from "./particle_system";
import { context } from "./context";
import { RenderData } from "./render_data";

export interface RendererInfo {
    width: number;
    height: number;
}

export class Renderer {
    public renderData: RenderData;
    public particleSystems: ParticleSystem[] = [];

    public constructor() {
        this.renderData = {
            projectionMatrix: core.Matrix.create(),
            projectionMatrix4x4: glMatrix.mat4.create(),
            clearColor: core.Color.create(),
        };
    }

    public init(info: {
        width: number;
        height: number;
        depth?: number;
        clearColor: { r: number; g: number; b: number; a: number; }
    }) {
        let renderData = this.renderData;
        let projectionMatrix = renderData.projectionMatrix;
        let projectionMatrix4x4 = renderData.projectionMatrix4x4;
        glMatrix.mat4.identity(projectionMatrix4x4);
        glMatrix.mat3.fromScaling(
            projectionMatrix,
            [1 / info.width || 1, 1 / info.height || 1],
        );
        glMatrix.mat4.fromScaling(
            projectionMatrix4x4,
            [1 / (info.width || 1), 1 / (info.height || 1), 1 / (info.depth || 1)],
        );
        let infoClearColor = info.clearColor;
        glMatrix.vec4.copy(
            renderData.clearColor,
            [infoClearColor.r, infoClearColor.g, infoClearColor.b, infoClearColor.a],
        );
    }

    public addParticleSystem(ps: ParticleSystem) {
        let index = this.particleSystems.indexOf(ps);
        if (index < 0) {
            ps._setRenderData(this.renderData);
            this.particleSystems.push(ps);
        }
    }

    public removeParticleSystem(ps: ParticleSystem) {
        let index = this.particleSystems.indexOf(ps);
        if (index >= 0) {
            ps._setRenderData(null);
            this.particleSystems.splice(index, 1);
        }
    }

    public update(dt) {
        this.particleSystems.forEach(ps => {
            ps.update(dt);
        });
    }

    public render() {
        let gl = context.gl;
        let renderData = this.renderData;
        let clearColor = renderData.clearColor;
        gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        // gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        // gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.particleSystems.forEach(ps => {
            ps.render();
        });


    }
}