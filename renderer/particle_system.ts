import * as log from "loglevel";
import * as core from "../core";
import { Material, createMaterial } from "./material";
import { renderData } from "./render_data";
import { ParticleSystemData } from "./particle_system_data";
import { Bounds } from "../core";
import { emitterBoundsOutline } from "./emitter_bounds_outline";
/**
 * A particle system class is for a draw data state of a particle system of the core.
 */

export class ParticleSystem implements core.IPlayer {
    public data: ParticleSystemData = new ParticleSystemData();
    public mapMaterials: {[id: number]: Material} = {};
    public mapGlobalBoundsOfEmitter: {[id: number]: Bounds} = {};

    private _boundsSizeHelper: core.Vector = core.Vector.create();
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
            let renderModule = emitters[i].renderModule;
            let matCore = renderModule.material;
            let material = createMaterial(matCore, this.data);
            mapMaterials[matCore.id] = material;

            let player = emitters[i].player;
            let bounds = this.mapGlobalBoundsOfEmitter[player.id] = core.Bounds.create();
            core.Bounds.copy(bounds, player.rootBounds);
            core.Bounds.translate(bounds, bounds, psCore.position);
            player.on(core.EVENT_CHANGE_POSITION, this._onEmitterChangePos, this);
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

    public get isPlay() {
        return this.data.psCore.isPlay;
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
        let mapBounds = this.mapGlobalBoundsOfEmitter;
        let boundsSizeHelper = this._boundsSizeHelper;
        for (let i = 0; i < cmdCount; ++i) {
            let cmd = cmdList[i];
            if (cmd.indexCount > 0) {
                let bounds = mapBounds[cmd.emitterPlayer];
                if (core.Bounds.isEmpty(bounds) || core.Bounds.intersecting(bounds, rData.viewBounds)) {
                    let material = mapMaterials[cmd.material];
                    if (material) {
                        material.render(cmd);
                    }
                    if (! core.Bounds.isEmpty(bounds)) {
                        core.Vector.set(boundsSizeHelper, bounds[2] - bounds[0], bounds[3] - bounds[1]);
                        emitterBoundsOutline.render(cmd, data.modelViewMatrix, boundsSizeHelper);
                    }
                }
            }
        }
    }

    private _onEmitterChangePos(player: core.EmitterPlayer) {
        let bounds = this.mapGlobalBoundsOfEmitter[player.id];
        core.Bounds.copy(bounds, player.rootBounds);
        core.Bounds.translate(bounds, bounds, this.data.psCore.position);
    }

    
}