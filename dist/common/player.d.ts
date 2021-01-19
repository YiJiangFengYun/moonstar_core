import * as eventEmitter from "eventemitter3";
export interface IPlayer {
    elapsedTime: number;
    isPlaying: boolean;
    play(): void;
    pause(): void;
    stop(): void;
}
export declare class Player extends eventEmitter.EventEmitter implements IPlayer {
    elapsedTime: number;
    private _isPlaying;
    constructor();
    get isPlaying(): boolean;
    play(): void;
    pause(): void;
    stop(): void;
    reset(): void;
    protected _reset(): void;
    update(dt: number): void;
    get time(): number;
}
