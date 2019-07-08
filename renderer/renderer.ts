import * as glMatrix from "gl-matrix";
import { ParticleSystem } from "./particle_system";
import { context } from "./context";
import { renderData } from "./render_data";

export interface RendererInfo {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    depth?: number;
    clearColor?: { r: number; g: number; b: number; a: number; }
}

export class Renderer {
    public particleSystems: ParticleSystem[] = [];

    public constructor() {
    }

    public init(info: RendererInfo) {
        context.init(info.canvas);
        let rD = renderData;
        let projectionMatrix = rD.projectionMatrix;
        let projectionMatrix4x4 = rD.projectionMatrix4x4;
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
            rD.clearColor,
            [infoClearColor.r, infoClearColor.g, infoClearColor.b, infoClearColor.a],
        );
    }

    public addParticleSystem(ps: ParticleSystem) {
        let index = this.particleSystems.indexOf(ps);
        if (index < 0) {
            this.particleSystems.push(ps);
        }
    }

    public removeParticleSystem(ps: ParticleSystem) {
        let index = this.particleSystems.indexOf(ps);
        if (index >= 0) {
            this.particleSystems.splice(index, 1);
        }
    }

    public update(dt: number) {
        this.particleSystems.forEach(ps => {
            ps.update(dt);
        });
    }

    public render() {
        let gl = context.gl;
        let rData = renderData;
        let clearColor = rData.clearColor;
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

export const renderer = new Renderer();