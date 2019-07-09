import { Module, IEmitter } from "./module";
export declare class ModLocationInitialCircle extends Module {
    static NAME: string;
    radius: number;
    constructor(owner: IEmitter);
    init(info: any): void;
    private _onCreateParticle;
}
