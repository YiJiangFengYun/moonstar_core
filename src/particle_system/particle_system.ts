import * as log from "loglevel";
import { SpaceID } from "../common/space_type";
import { DrawData } from "../render/draw_data";
import { Player } from "../common/player";
import { Emitter } from "../emitter/emitter";

export interface ParticleSystem {
    space: SpaceID;
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
    let vtxBufferOffset: number = 0;
    let idxBufferOffset: number = 0;
    let idxOffset: number = 0;
    for (let i = 0; i < emitterCount; ++i) {
        let eRenderCpt = emitters[i].renderModule;
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

export class ParticleSystem extends Player implements ParticleSystem {
    public space: SpaceID = SpaceID.SPACE_2D;
    public drawData: DrawData = new DrawData(this.space);
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