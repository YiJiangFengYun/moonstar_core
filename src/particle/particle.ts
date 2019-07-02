import { Vector2, Vector3, Vector } from "../common/vector";
import { Color } from "../common/color";

export interface Particle {
    pos?: Vector;
    color?: Color;
    size?: number;
}

export interface Particle2D {
    pos: Vector2;
}

export interface Particle3D {
    pos: Vector3;
}