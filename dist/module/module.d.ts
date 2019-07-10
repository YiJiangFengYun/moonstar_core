import * as material from "../material";
import * as emitterPlayer from "../emitter_player";
import * as render from "../render";
export declare class Module {
    name: string;
    player: emitterPlayer.EmitterPlayer;
    private _id;
    constructor(player: emitterPlayer.EmitterPlayer);
    readonly id: number;
    init(info: any): void;
    ready(): void;
    update(dt: number): void;
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
        lastVertexCount: number;
        lastIndexCount: number;
    }): void;
}
