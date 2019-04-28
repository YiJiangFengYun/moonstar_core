import { Particle2D, Particle3D } from "../particle/particle";
export interface Emitter {
}
export declare class Emitter2D implements Emitter {
    particles: Particle2D[];
    constructor();
}
export declare class Emitter3D implements Emitter {
    particles: Particle3D[];
    constructor();
}
