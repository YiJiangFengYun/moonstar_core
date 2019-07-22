import * as log from "loglevel";
import * as common from "../common";
import * as module from "../module";
import * as emitter_player from "../emitter_player";
import * as psData from "../ps_data";

export interface EmitterInfo extends emitter_player.EmitterPlayerInfo {
    name?: string;
    parent?: string; //If it is root, parent is empty, it will play directly after the parent particle system inited.
    modules?: ({
        name: string;
    } | any)[];
}

export class Emitter {
    public name: string;
    public player: emitter_player.EmitterPlayer;
    public modules: module.Module[] = [];
    public mapModules: {[name: string]: module.Module} = {};
    public renderModule: module.ModRender;
    private _id: number;
    public constructor(psData: psData.PSData) {
        this._id = common.gainID();
        this.player = new emitter_player.EmitterPlayer(psData);
    }

    public get id() {
        return this._id;
    }

    public init(info: EmitterInfo) {
        this.name = info.name;
        this.player.init(info, ! info.parent);
        let modules = this.modules;
        let mapModules = this.mapModules;
        let newModCount = info.modules ? info.modules.length : 0;
        modules.length = newModCount;
        for (let i = 0; i < newModCount; ++i) {
            let moduleConfig = info.modules[i];
            let name = moduleConfig.name;
            modules[i] = module.createModule(name, this.player);
            modules[i].init(moduleConfig);
            if (mapModules[name]) {
                log.warn(`There are multiple modules with the same name applied to the emitter.`);
            }
            mapModules[name] = modules[i];
            if (module.renderModules.indexOf(name) >= 0) {
                if (this.renderModule) {
                    log.warn(`There are multiple render modules applied to the emitter.`);
                }
                this.renderModule = modules[i] as any as module.ModRender;
            }
        }
        this.player.stop();
    }

    public ready() {
        let modules = this.modules;
        modules.forEach(mod => {
            mod.ready();
        });
    }

    public update(dt: number) {
        this.player.update(dt);
        if (this.player.isPlay) {
            this.modules.forEach(mod => {
                mod.update(dt);
            });
        }
    }

    public play() {
        this.player.play();
    }

    public stop() {
        this.player.stop();
    }

    public reset() {
        this.player.reset();
        this.modules.forEach(mod => {
            mod.reset();
        });
    }

    public getModule<T>(type: {
        prototype: T;
    }): T {
        return this.mapModules[(type as any).NAME] as any as T;
    }
}