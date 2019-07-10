import * as common from "../common";
import * as material from "../material";
import * as emitterPlayer from "../emitter_player";
import * as render from "../render";

export class Module {
    public name: string;
    public owner: emitterPlayer.EmitterPlayer;

    private _id: number;
    public constructor(owner: emitterPlayer.EmitterPlayer) {
        this.owner = owner;
        this._id = common.gainID();
    }

    public get id() {
        return this._id;
    }

    public init(info: any): void {

    }

    public update(dt: number):void {

    }

    
}

export interface ModRender {
    material: material.Material;

    getTotalVtxCount(): number;

    getTotalIdxCount(): number;

    getMaxVtxCount(): number;

    getMaxIdxCount(): number;

    fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number; //used as idxValueOffset
        lastIndexCount: number; // used as index offset of cmd.
    }): void;
}