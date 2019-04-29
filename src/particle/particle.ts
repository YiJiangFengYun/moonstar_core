import { Vector2, Vector3, Vector } from "../common/vector";
import { PComponent } from "./component";

export interface Particle {
    pos: Vector;
    components: PComponent[];
}

export class Particle2D implements Particle {
    public pos: Vector2;
    public components: PComponent[] = [];
    public constructor(x: number, y: number) {
        this.pos = { x: x, y: y };
    }
}

export class Particle3D implements Particle {
    public pos: Vector3;
    public components: PComponent[] = [];
    public constructor(x: number, y: number, z: number) {
        this.pos =  { x: x, y: y, z: z };
    }
}