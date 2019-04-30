import { Module, IEmitter } from "./module";
export declare class ModInitialSize extends Module {
    static NAME: string;
    size: number;
    constructor(owner: IEmitter);
    init(): void;
    private _onCreateParticle;
}
