export interface Vector {
    x?: number;
    y?: number;
    z?: number;
}

export interface Vector2 {
    x: number;
    y: number;
}

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export function copyVector(src: Vector, target: Vector) {
    target.x = src.x;
    target.y = src.y;
    target.z = src.z;
}

export function cloneVector(src: Vector) {
    let newVector: Vector = {} as any;
    copyVector(src, newVector);
    return newVector;
}