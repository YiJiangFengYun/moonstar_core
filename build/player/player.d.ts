export interface Player {
    elapsedTime: number;
    isPlay: boolean;
    play(): void;
    pause(): void;
    stop(): void;
}
export declare class Player {
    elapsedTime: number;
    isPlay: boolean;
    constructor();
    update(dt: number): void;
}
