import * as core from "../core";
import { Material } from "./material";
import { ParticleSystemData } from "./particle_system_data";
/**
 * A particle system class is for a draw data state of a particle system of the core.
 */
export declare class ParticleSystem implements core.IPlayer {
    data: ParticleSystemData;
    mapMaterials: {
        [id: number]: Material;
    };
    private _boundsPosHelper;
    private _boundsSizeHelper;
    constructor();
    init(info: core.ParticleSystemInfo): void;
    update(dt: number): void;
    render(): void;
    play(): void;
    pause(): void;
    stop(): void;
    readonly elapsedTime: number;
    readonly isPlay: boolean;
    changePos(pos: core.Vector): void;
    private _draw;
}
