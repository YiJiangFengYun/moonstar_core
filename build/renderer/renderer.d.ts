import { ParticleSystem } from "./particle_system";
export interface RendererInfo {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    depth?: number;
    clearColor?: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
export declare class Renderer {
    particleSystems: ParticleSystem[];
    constructor();
    init(info: RendererInfo): void;
    addParticleSystem(ps: ParticleSystem): void;
    removeParticleSystem(ps: ParticleSystem): void;
    update(dt: number): void;
    render(): void;
}
export declare const renderer: Renderer;
