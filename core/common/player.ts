import * as eventEmitter from "eventemitter3";

export interface IPlayer {
    elapsedTime: number;
    isPlaying: boolean;
    play(): void;
    pause(): void;
    stop(): void;
}

export class Player extends eventEmitter.EventEmitter implements IPlayer {
    public elapsedTime: number = 0;
    private _isPlaying: boolean = false;

    public constructor() {
        super();
    }

    public get isPlaying() { return this._isPlaying; }

    public play(): void {
        this._isPlaying = true;
    }

    public pause(): void {
        this._isPlaying = false;
    }

    public stop(): void {
        this._isPlaying = false;
        this._reset();
    }

    public reset() {
        this._reset();
    }

    protected _reset() {
        this.elapsedTime = 0;
    }

    public update(dt: number) {
        if (this._isPlaying) {
            this.elapsedTime += dt;
        }
    }

    public get time() {
        return this.elapsedTime;
    }
}