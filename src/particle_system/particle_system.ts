import * as log from "loglevel";
import { DrawData } from "../render/draw_data";
import { Player } from "../common/player";
import { Emitter } from "../emitter/emitter";

export interface ParticleSystem {
    drawData: DrawData;
    emitters: Emitter[];

    update(dt: number):void;
    render(): void;
}

function render(emitters: Emitter[], drawData: DrawData) {
    let emitterCount = emitters.length;
    let totalVtxCount = 0;
    let totalIdxCount = 0;
    //Get totalVtxCount and totalIdxCount.
    for (let i = 0; i < emitterCount; ++i) {
        let eRenderCpt = emitters[i].renderModule;
        if (eRenderCpt) {
            totalVtxCount += eRenderCpt.getTotalVtxCount();
            totalIdxCount += eRenderCpt.getTotalIdxCount();
        } else {
            log.warn("The emitter don't own a render component.");
        }
    }
    //Reset draw data.
    drawData.init(totalVtxCount, totalIdxCount);
    let vtxBufferByteOffset: number = 0;
    let idxBufferByteOffset: number = 0;
    let lastVertexCount: number = 0;
    for (let i = 0; i < emitterCount; ++i) {
        let eRenderCpt = emitters[i].renderModule;
        if (eRenderCpt) {
            eRenderCpt.fillBuffers(drawData, {
                vtxBufferByteOffset: vtxBufferByteOffset,
                idxBufferByteOffset: idxBufferByteOffset,
                lastVertexCount: lastVertexCount,
            });
           
            vtxBufferByteOffset += drawData.vtxSize * eRenderCpt.getTotalVtxCount();
            idxBufferByteOffset += drawData.idxSize * eRenderCpt.getTotalIdxCount();
            lastVertexCount += eRenderCpt.getTotalVtxCount();
        }
    }
}

export class ParticleSystem extends Player implements ParticleSystem {
    public drawData: DrawData = new DrawData();
    public emitters: Emitter[] = [];
    
    public constructor() {
        super();
    }

    public update(dt: number):void {
        super.update(dt);
    }

    public render(): void {
        render(this.emitters, this.drawData);
    }

    // public _createEmitter() {
    //     let emitter = new Emitter2D();
    //     emitter.
    // }
}