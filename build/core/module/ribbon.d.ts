import * as particle from "../particle";
import * as material from "../material";
import * as render from "../render";
import * as emitterPlayer from "../emitter_player";
import * as util from "../util";
import { ModRender, Module } from "./module";
export declare class ModRibbon extends Module implements ModRender {
    static NAME: string;
    /**
     * A queue (FIFO) to store the particles created sequentially.
     */
    queueParticles: util.QueueArrayFixed<particle.Particle>;
    material: material.Material;
    private _vecDirectHelper;
    private _vecDirectHelper2;
    private _vecPerpendicularHelper;
    private _posHelper;
    private _uvHelper;
    private _cmdHelper;
    constructor(player: emitterPlayer.EmitterPlayer);
    init(info: any): void;
    reset(): void;
    getTotalVtxCount(): number;
    getTotalIdxCount(): number;
    getMaxVtxCount(): number;
    getMaxIdxCount(): number;
    fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number;
        lastIndexCount: number;
    }, batchInfo?: {
        lastBatchVertexCount: number;
        lastDrawCmd: render.DrawCmd;
    }): render.DrawCmd;
    private _onCreatedParticle;
    private _onDestroyedParticle;
    private _onReset;
}
