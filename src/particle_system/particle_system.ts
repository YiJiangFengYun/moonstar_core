import * as log from "loglevel";
import * as common from "../common";
import * as emitter from "../emitter";
import * as render from "../render";
import { Emitter } from "../emitter";

export interface ParticleSystem {
    drawData: render.DrawData;
    emitters: emitter.Emitter[];

    update(dt: number):void;
    render(): void;
}

function doRender(emitters: emitter.Emitter[], emitterCount: number, drawData: render.DrawData) {
    emitterCount = emitterCount || 0;
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
    let lastIndexCount: number = 0;
    for (let i = 0; i < emitterCount; ++i) {
        let eRenderCpt = emitters[i].renderModule;
        if (eRenderCpt) {
            eRenderCpt.fillBuffers(drawData, {
                vtxBufferByteOffset: vtxBufferByteOffset,
                idxBufferByteOffset: idxBufferByteOffset,
                lastVertexCount: lastVertexCount,
                lastIndexCount: lastIndexCount,
            });
             
            let vtxCount = eRenderCpt.getTotalVtxCount();
            let idxCount = eRenderCpt.getTotalIdxCount();
            lastVertexCount += vtxCount;
            lastIndexCount += idxCount;
            vtxBufferByteOffset += drawData.vtxSize * vtxCount;
            idxBufferByteOffset += drawData.idxSize * idxCount;
        }
    }
}

export interface ParticleSystemInfo {
    emitters: {
        maxParticleCount?: number;
    }[]
}

export class ParticleSystem extends common.Player implements ParticleSystem {
    public drawData: render.DrawData = new render.DrawData();
    public emitters: emitter.Emitter[] = [];
    public emitterCount: number = 0;
    
    public constructor() {
        super();
    }

    public init(info: ParticleSystemInfo) {
        let newCount = info.emitters ? info.emitters.length : 0;
        this.emitterCount = newCount;
        let emitters = this.emitters;
        if (emitters.length < newCount) {
            emitters.length = newCount;
        }
        for (let i = 0; i < newCount; ++i) {
            if (! emitters[i]) emitters[i] = new Emitter();
            emitters[i].init(info.emitters[i]);
        }
    }

    public update(dt: number):void {
        super.update(dt);
    }

    public render(): void {
        doRender(this.emitters, this.emitterCount, this.drawData);
    }

    // public _createEmitter() {
    //     let emitter = new Emitter2D();
    //     emitter.
    // }
}