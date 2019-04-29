import { Vector2, Vector3, Vector } from "../common/vector";
import { PComponent } from "./component";
export interface Particle {
    pos: Vector;
    components: PComponent[];
}
export declare class Particle2D implements Particle {
    pos: Vector2;
    components: PComponent[];
    constructor(x: number, y: number);
}
export declare class Particle3D implements Particle {
    pos: Vector3;
    components: PComponent[];
    constructor(x: number, y: number, z: number);
}
