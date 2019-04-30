import { Vector2, Vector3, Vector } from "../common/vector";
export interface Particle {
    pos?: Vector;
    size?: number;
}
export interface Particle2D {
    pos: Vector2;
}
export interface Particle3D {
    pos: Vector3;
}
