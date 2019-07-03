import * as log from "loglevel";
import * as common from "../common";
import * as emitter from "../emitter";
import * as render from "../render";

export interface ParticleSystem {
    drawData: render.DrawData;
    emitters: emitter.Emitter[];

    update(dt: number):void;
    render(): void;
}

function doRender(emitters: emitter.Emitter[], drawData: render.DrawData) {
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

export class ParticleSystem extends common.Player implements ParticleSystem {
    public drawData: render.DrawData = new render.DrawData();
    public emitters: emitter.Emitter[] = [];
    
    public constructor() {
        super();
    }

    public update(dt: number):void {
        super.update(dt);
    }

    public render(): void {
        doRender(this.emitters, this.drawData);
    }

    // public _createEmitter() {
    //     let emitter = new Emitter2D();
    //     emitter.
    // }
}