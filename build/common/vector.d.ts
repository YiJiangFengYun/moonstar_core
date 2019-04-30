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
export declare function copyVector(src: Vector, target: Vector): void;
export declare function cloneVector(src: Vector): Vector;
