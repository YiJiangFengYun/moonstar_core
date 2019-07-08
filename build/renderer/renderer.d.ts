import { ParticleSystem } from "./particle_system";
import { RenderData } from "./render_data";
export interface RendererInfo {
    width: number;
    height: number;
}
export declare class Renderer {
    renderData: RenderData;
    particleSystems: ParticleSystem[];
    constructor();
    init(info: {
        width: number;
        height: number;
        depth?: number;
        clearColor: {
            r: number;
            g: number;
            b: number;
            a: number;
        };
    }): void;
    addParticleSystem(ps: ParticleSystem): void;
    removeParticleSystem(ps: ParticleSystem): void;
    update(dt: number): void;
    render(): void;
}
