import * as log from "loglevel";
import * as common from "../common";
import * as emitter from "../emitter";
import * as render from "../render";
import { Emitter } from "../emitter";

export type ParticleSystemInfo = {
    emitters: {
        maxParticleCount?: number;
        root?: boolean; //If it is root, it will play directly after the parent particle system inited.
        modules: any[];
    }[]
};

/**
 * Note: All emitters should be created when the ParticleSystem init.
 * If a emitter play latter, you should stop the emitter, and then play it.
 */
export class ParticleSystem extends common.Player {
    public drawData: render.DrawData = new render.DrawData();
    public emitters: emitter.Emitter[] = [];
    public emitterCount: number = 0;

    private _id: number;
    public constructor() {
        super();
        this._id = common.gainID();
    }

    public get id() {
        return this._id;
    }

    public init(info: ParticleSystemInfo) {
        let newCount = info.emitters ? info.emitters.length : 0;
        this.emitterCount = newCount;
        let emitters = this.emitters;
        if (emitters.length < newCount) {
            emitters.length = newCount;
        }
        for (let i = 0; i < newCount; ++i) {
            if (!emitters[i]) emitters[i] = new Emitter();
            emitters[i].init(info.emitters[i]);
            if (info.emitters[i].root) emitters[i].play();
        }


        let maxVtxCount = 0;
        let maxIdxCount = 0;
        //Get totalVtxCount and totalIdxCount.
        for (let i = 0; i < newCount; ++i) {
            let eRenderCpt = emitters[i].renderModule;
            if (eRenderCpt) {
                maxVtxCount += eRenderCpt.getMaxVtxCount();
                maxIdxCount += eRenderCpt.getMaxIdxCount();
            } else {
                log.warn("The emitter don't own a render component.");
            }
        }

        this.drawData.init({
            maxVtxCount: maxVtxCount,
            maxIdxCount: maxIdxCount,
        });
    }

    /**
     * 
     * @param dt Passed time (s)
     */
    public update(dt: number): void {
        super.update(dt);
        if (this.isPlay) {
            let emitterCount = this.emitterCount;
            let emitters = this.emitters;
            for (let i = 0; i < emitterCount; ++i) {
                emitters[i].update(dt);
            }
        }
    }

    public render(): void {
        let emitterCount = this.emitterCount;
        let emitters = this.emitters;
        let drawData = this.drawData;
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
        //Update data.
        drawData.updateData({
            totalVtxCount: totalVtxCount,
            totalIdxCount: totalIdxCount,
        });

        drawData.clearCmds();

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

    // public _createEmitter() {
    //     let emitter = new Emitter2D();
    //     emitter.
    // }
}