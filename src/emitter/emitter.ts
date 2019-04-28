import { Particle2D, Particle3D } from "../particle/particle";

export interface Emitter {

}

export class Emitter2D implements Emitter {
    public particles: Particle2D[] = [];
    public constructor() {

    }
}

export class Emitter3D implements Emitter {
    public particles: Particle3D[] = [];
    public constructor() {

    }
}