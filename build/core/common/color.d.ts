export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}
export declare const WHITE: Color;
export declare const BLACK: Color;
export declare const ZERO: Color;
export declare function copyColor(src: Color, tgt: Color): void;
