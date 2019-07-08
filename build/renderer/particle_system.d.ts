import * as core from "../core";
import { Material } from "./material";
import { RenderData } from "./render_data";
import { ParticleSystemData } from "./particle_system_data";
/**
 * A particle system class is for a draw data state of a particle system of the core.
 */
export declare class ParticleSystem implements core.IPlayer {
    data: ParticleSystemData;
    mapMaterials: {
        [id: number]: Material;
    };
    constructor();
    init(info: core.ParticleSystemInfo): void;
    update(dt: number): void;
    render(): void;
    play(): void;
    pause(): void;
    stop(): void;
    readonly elapsedTime: number;
    readonly isPlay: boolean;
    _setRenderData(renderData: RenderData): void;
    private _draw;
}
