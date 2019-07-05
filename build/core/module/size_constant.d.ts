import * as common from "../common";
import { Module, IEmitter } from "./module";
export declare class ModSizeConstant extends Module {
    static NAME: string;
    size: common.Vector;
    constructor(owner: IEmitter);
    init(info: any): void;
    private _onCreateParticle;
}