export interface Vector {
    x?: number;
    y?: number;
}

export function copyVector(src: Vector, target: Vector) {
    target.x = src.x;
    target.y = src.y;
}

export function cloneVector(src: Vector) {
    let newVector: Vector = {} as any;
    copyVector(src, newVector);
    return newVector;
}