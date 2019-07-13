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
    frameRate?: number;
}
export declare class Renderer {
    particleSystems: ParticleSystem[];
    constructor();
    init(info: RendererInfo): Promise<void>;
    addParticleSystem(ps: ParticleSystem): void;
    removeParticleSystem(ps: ParticleSystem): void;
    begin(): void;
    update(dt: number): void;
    render(): void;
    end(): void;
}
export declare const renderer: Renderer;
