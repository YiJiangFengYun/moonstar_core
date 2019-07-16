import * as eventEmitter from "eventemitter3";
export interface IPlayer {
    elapsedTime: number;
    isPlay: boolean;
    play(): void;
    pause(): void;
    stop(): void;
}
export declare class Player extends eventEmitter.EventEmitter implements IPlayer {
    elapsedTime: number;
    isPlay: boolean;
    constructor();
    play(): void;
    pause(): void;
    stop(): void;
    reset(): void;
    protected _reset(): void;
    update(dt: number): void;
    readonly time: number;
}
