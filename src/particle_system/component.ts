import * as log from "loglevel";
import { ParticleSystem } from "./particle_system";

export class PSComponent {
    public owner: ParticleSystem;
    public constructor(owner: ParticleSystem) {
        this.owner = owner;
    }

    public update(dt: number):void {

    }
}

export class PSRenderComponent extends PSComponent {

    public render(): void {
        let owner = this.owner;
        let emitters = owner.emitters;
        let emitterCount = emitters.length;
        let totalVtxCount = 0;
        let totalIdxCount = 0;
        //Get totalVtxCount and totalIdxCount.
        for (let i = 0; i < emitterCount; ++i) {
            let eRenderCpt = emitters[i].renderComponent;
            if (eRenderCpt) {
                totalVtxCount += eRenderCpt.getTotalVtxCount();
                totalIdxCount += eRenderCpt.getTotalIdxCount();
            } else {
                log.warn("The emitter don't own a render component.");
            }
        }

        //Reset draw data.
        let drawData = owner.drawData;
        drawData.init(totalVtxCount, totalIdxCount);

        let vtxBufferOffset: number = 0;
        let idxBufferOffset: number = 0;
        let idxOffset: number = 0;
        for (let i = 0; i < emitterCount; ++i) {
            let eRenderCpt = emitters[i].renderComponent;
            if (eRenderCpt) {
                eRenderCpt.fillVtxBuffer(
                    drawData.vtxBuffer, 
                    vtxBufferOffset, 
                    drawData.vertexFormat,
                    drawData.vtxSize,
                );
                vtxBufferOffset += drawData.vtxSize * eRenderCpt.getTotalVtxCount();
                eRenderCpt.fillIdxBuffer(
                    drawData.idxBuffer,
                    idxBufferOffset,
                    idxOffset,
                    drawData.idxSize,
                );
                idxBufferOffset += drawData.idxSize * eRenderCpt.getTotalIdxCount();
                idxOffset += eRenderCpt.getTotalVtxCount();
            }
        }
    }
}