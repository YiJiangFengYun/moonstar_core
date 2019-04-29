import { Particle2D, Particle3D } from "../particle/particle";
import { Material } from "../material/material";
import { EComponent, ERenderComponent } from "./component";
import { DrawData } from "../render/draw_data";
export interface Emitter {
    material: Material;
    maxParticleCount: number;
    components: EComponent[];
    renderComponent: ERenderComponent;
    update(dt: number): void;
}
export declare class Emitter2D implements Emitter {
    material: Material;
    particles: Particle2D[];
    components: EComponent[];
    renderComponent: ERenderComponent;
    private _maxParticleCount;
    constructor(material?: Material, maxParticleCount?: number);
    maxParticleCount: number;
    update(dt: number): void;
}
export declare class Emitter3D implements Emitter {
    drawData: DrawData;
    material: Material;
    particles: Particle3D[];
    components: EComponent[];
    renderComponent: ERenderComponent;
    private _maxParticleCount;
    constructor(material?: Material, maxParticleCount?: number);
    maxParticleCount: number;
    update(dt: number): void;
}
