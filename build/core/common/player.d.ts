import * as eventEmitter from "eventemitter3";
export interface Player {
    elapsedTime: number;
    isPlay: boolean;
    play(): void;
    pause(): void;
    stop(): void;
}
export declare class Player extends eventEmitter.EventEmitter {
    elapsedTime: number;
    isPlay: boolean;
    constructor();
    update(dt: number): void;
}
