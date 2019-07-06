import * as log from "loglevel";
import * as core from "../core";
import * as glMatrix from "gl-matrix";
import { context } from "./context";
import { Material } from "./material";
import { RenderData } from "./render_data";
import { ParticleSystemData } from "./particle_system_data";
/**
 * A particle system class is for a draw data state of a particle system of the core.
 */

export class ParticleSystem implements core.IPlayer {
    public data: ParticleSystemData = new ParticleSystemData();
    public mapMaterials: {[id: number]: Material} = {};
    public constructor() {
    }

    public init(info: core.ParticleSystemInfo) {
        this.data.init(info);
        //Initialize the map of the all materials.
        let psCore = this.data.psCore;
        let emitters = psCore.emitters;
        let emitterCount = psCore.emitterCount;
        let mapMaterials = this.mapMaterials;
        for (let i = 0; i < emitterCount; ++i) {
            let material = new Material();
            let renderModule = emitters[i].renderModule;
            let matCore = renderModule.material
            material.init(matCore, this.data);
            mapMaterials[matCore.id] = material;
        }
    }

    public update(dt: number) {
        let psCore = this.data.psCore;
        psCore.update(dt);
    }

    public render() {
        let psCore = this.data.psCore;
        psCore.render();
        this._draw();
    }

    public play(): void {
        return this.data.psCore.play();
    }

    public pause(): void {
        return this.data.psCore.pause();
    }

    public stop(): void {
        return this.data.psCore.stop();
    }

    public get elapsedTime() {
        return this.data.psCore.elapsedTime;
    }

    public get isPlay() {
        return this.data.psCore.isPlay;
    }

    public _setRenderData(renderData: RenderData) {
        this.data.renderData = renderData;
    }

    private _draw() {
        let renderData = this.data.renderData;
        if (! renderData) {
            log.error(`The render data of the particle system is invalid.`);
            return;
        }
        let data = this.data;
        let psCore = data.psCore;
        let drawData = psCore.drawData;
        let cmdList = drawData.cmdList;
        let cmdCount = drawData.cmdCount;
        let mapMaterials = this.mapMaterials;
        for (let i = 0; i < cmdCount; ++i) {
            let cmd = cmdList[i];
            let material = mapMaterials[cmd.material.type];
            material.render(cmd);
        }
    }

    
}