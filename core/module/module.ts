import * as common from "../common";
import * as material from "../material";
import * as emitterPlayer from "../emitter_player";
import * as render from "../render";

export class Module {
    public name: string;
    public typeID: number;
    public player: emitterPlayer.EmitterPlayer;

    private _id: number;
    public constructor(player: emitterPlayer.EmitterPlayer) {
        this.player = player;
        this._id = common.gainID();
    }

    public get id() {
        return this._id;
    }

    public init(info: any): void {

    }

    public ready(): void {
        
    }

    public update(dt: number):void {

    }

    public reset(): void {

    }
}

export interface ModuleStatic {
    NAME: string;
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