import { Vector2, Vector3, Vector } from "../common/vector";

export interface Particle {
    pos: Vector;
}

export interface Particle2D {
    pos: Vector2;
}

export interface Particle3D {
    pos: Vector3;
}

// export interface Particle {
//     pos: Vector;
//     components: PComponent[];
// }

// export class Particle2D implements Particle {
//     public pos: Vector2;
//     public components: PComponent[] = [];
//     public constructor(x: number, y: number) {
//         this.pos = { x: x, y: y };
//     }
// }

// export class Particle3D implements Particle {
//     public pos: Vector3;
//     public components: PComponent[] = [];
//     public constructor(x: number, y: number, z: number) {
//         this.pos =  { x: x, y: y, z: z };
//     }
// }