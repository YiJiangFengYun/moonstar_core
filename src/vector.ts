export interface Vector2D {
    x: number;
    y: number;
}

export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export type Vector = Vector2D | Vector3D;
export type VectorTypes = [Vector2D, Vector3D];