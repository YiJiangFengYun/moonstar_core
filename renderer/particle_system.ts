import * as log from "loglevel";
import * as core from "../core";
import { Material, MaterialNormal } from "./material";
import { renderData } from "./render_data";
import { ParticleSystemData } from "./particle_system_data";
import { emitterBoundsOutline } from "./emitter_bounds_outline";
/**
 * A particle system class is for a draw data state of a particle system of the core.
 */

export class ParticleSystem implements core.IPlayer {
    public data: ParticleSystemData = new ParticleSystemData();
    public mapMaterials: {[id: number]: Material} = {};
    public mapMaterialRenders: {[name: string]: Material} = {};
    private _boundsPosHelper: core.Vector = core.Vector.create();
    private _boundsSizeHelper: core.Vector = core.Vector.create();
    public constructor() {
    }

    public init(info: core.ParticleSystemInfo) {
        this.data.init(info);
        //Initialize the map of the all materials.
        const psCore = this.data.psCore;
        const emitters = psCore.emitters;
        const emitterCount = psCore.emitterCount;
        const mapMaterials = this.mapMaterials;
        const mapMaterialRenders = this.mapMaterialRenders;
        for (let i = 0; i < emitterCount; ++i) {
            const renderModule = emitters[i].renderModule;
            let material: Material = mapMaterialRenders[renderModule.name];
            if (! material) {
                switch (renderModule.name) {
                    // case "..." //others type material
                    default: {
                        material = new MaterialNormal();
                        material.init(renderModule.material, this.data);
                    }
            
                }
                mapMaterialRenders[renderModule.name] = material;
            }
            mapMaterials[renderModule.material.id] = material;
        }

    }

    public update(dt: number) {
        let psCore = this.data.psCore;
        psCore.update(dt);
    }

    public render() {
        let psCore = this.data.psCore;
        psCore.render();
        this.data.refreshBuffers();
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

    public get isPlaying() {
        return this.data.psCore.isPlaying;
    }

    public changePos(pos: core.Vector) {
        this.data.changePos(pos);
    }

    private _draw() {
        let rData = renderData;
        if (! rData) {
            log.error(`The render data of the particle system is invalid.`);
            return;
        }
        let data = this.data;
        let psCore = data.psCore;
        let drawData = psCore.drawData;
        let cmdList = drawData.cmdList;
        let cmdCount = drawData.cmdCount;
        let mapMaterials = this.mapMaterials;
        let boundsPosHelper = this._boundsPosHelper;
        let boundsSizeHelper = this._boundsSizeHelper;
        for (let i = 0; i < cmdCount; ++i) {
            let cmd = cmdList[i];
            if (cmd.indexCount > 0) {
                let bounds = cmd.bounds || core.BOUNDS_EMPTY;
                if (core.Bounds.isEmpty(bounds) || core.Bounds.intersecting(bounds, rData.viewBounds)) {
                    let material = mapMaterials[cmd.material];
                    if (material) {
                        material.render(cmd);
                    }
                    if (rData.showBounds && ! core.Bounds.isEmpty(bounds)) {
                        let width = bounds[2] - bounds[0];
                        let height = bounds[3] - bounds[1];
                        core.Vector.set(boundsPosHelper, bounds[0] + width / 2, bounds[1] + height / 2);
                        core.Vector.set(boundsSizeHelper, width, height);
                        emitterBoundsOutline.render(boundsPosHelper, boundsSizeHelper);
                    }
                }
            }
        }
    }
}