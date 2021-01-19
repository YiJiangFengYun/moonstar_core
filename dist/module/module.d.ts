import * as material from "../material";
import * as emitterPlayer from "../emitter_player";
import * as render from "../render";
export interface IModule {
    name: string;
    typeID: number;
    player: emitterPlayer.EmitterPlayer;
    id: number;
}
export declare class Module implements IModule {
    name: string;
    typeID: number;
    player: emitterPlayer.EmitterPlayer;
    private _id;
    constructor(player: emitterPlayer.EmitterPlayer);
    get id(): number;
    init(info: any): void;
    ready(): void;
    update(dt: number): void;
    postUpdate(): void;
    reset(): void;
}
export interface ModuleStatic {
    NAME: string;
}
export interface ModRender extends IModule {
    material: material.Material;
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    getMaxVtxCount(): number;
    getMaxIdxCount(): number;
    /**
     *
     * @param drawData The draw data.
     * @param offsets The buffer offsets.
     * @param resCmds The Result of draw cmds.
     * @returns The count of the result of draw cmds.
     */
    fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number;
        lastIndexCount: number;
    }, batchInfo?: {
        lastBatchVertexCount: number;
        lastDrawCmd: render.DrawCmd;
    }): render.DrawCmd;
}
