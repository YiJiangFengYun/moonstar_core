export interface Player {
    elapsedTime: number;
    isPlay: boolean;
    play(): void;
    pause(): void;
    stop(): void;
}

export class Player {
    public elapsedTime: number = 0;
    public isPlay: boolean = false;

    public constructor() {
    }

    public play(): void {
        this.isPlay = true;
    }

    public pause(): void {
        this.isPlay = false;
    }

    public stop(): void {
        this.isPlay = false;
        this.elapsedTime = 0;
    }

    public update(dt: number) {
        this.elapsedTime += dt;
    }
}