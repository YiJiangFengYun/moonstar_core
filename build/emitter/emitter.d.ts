import { Particle2D, Particle3D } from "../particle/particle";
import { Material } from "../material/material";
export interface Emitter {
    material: Material;
}
export declare class Emitter2D implements Emitter {
    material: Material;
    particles: Particle2D[];
    constructor(material?: Material);
}
export declare class Emitter3D implements Emitter {
    material: Material;
    particles: Particle3D[];
    constructor(material?: Material);
}
