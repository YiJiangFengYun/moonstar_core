import * as common from "../common";
import { Module, IEmitter } from "./module";
export declare class ModInitialSize extends Module {
    static NAME: string;
    size: common.Vector;
    constructor(owner: IEmitter);
    init(): void;
    private _onCreateParticle;
}
