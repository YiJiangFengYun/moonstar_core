import { Vector2, Vector3, Vector } from "../common/vector";

export interface Particle {
    pos: Vector;
}

export class Particle2D implements Particle {
    public pos: Vector2;
    public constructor(x: number, y: number) {
        this.pos = { x: x, y: y };
    }
}

export class Particle3D implements Particle {
    public pos: Vector3;

    public constructor(x: number, y: number, z: number) {
        this.pos =  { x: x, y: y, z: z };
    }
}