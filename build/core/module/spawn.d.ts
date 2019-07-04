import { Module, IEmitter } from "./module";
export declare const EVENT_CREATE_PARTICLE = "create_particle";
export declare class ModSpawn extends Module {
    static NAME: string;
    interval: number;
    private _remainTime;
    constructor(owner: IEmitter);
    init(): void;
    update(dt: number): void;
    private _createParticle;
}
