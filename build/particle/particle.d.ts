import { Vector2, Vector3, Vector } from "../common/vector";
export interface Particle {
    pos: Vector;
}
export declare class Particle2D implements Particle {
    pos: Vector2;
    constructor(x: number, y: number);
}
export declare class Particle3D implements Particle {
    pos: Vector3;
    constructor(x: number, y: number, z: number);
}
