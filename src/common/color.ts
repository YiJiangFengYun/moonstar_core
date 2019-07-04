export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export const WHITE: Color = {
    r: 1,
    g: 1,
    b: 1,
    a: 1,
};

export const BLACK: Color = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
};

export const ZERO: Color = {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
};

export function copyColor(src: Color, tgt: Color) {
    tgt.r = src.r;
    tgt.g = src.g;
    tgt.b = src.b;
    tgt.a = src.a;
}