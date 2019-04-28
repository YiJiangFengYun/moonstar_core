import { Particle2D, Particle3D } from "../particle/particle";
import { Material } from "../material/material";

export interface Emitter {
    material: Material;
}

export class Emitter2D implements Emitter {
    public material: Material;
    public particles: Particle2D[] = [];
    public constructor(material?: Material) {
        this.material = material;
    }
}

export class Emitter3D implements Emitter {
    public material: Material;
    public particles: Particle3D[] = [];
    public constructor(material?: Material) {
        this.material = material;
    }
}