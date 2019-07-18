import * as log from "loglevel";
import * as common from "../common";
import * as emitter from "../emitter";
import * as psData from "../ps_data";
import * as render from "../render";


export type ParticleSystemInfo = {
    /**
     * Bounds local
     * First two value is minX and minY
     * Last two value is maxX and MaxY
     */
    bounds?: [number, number, number, number];
    emitters: (emitter.EmitterInfo & { count?: number; } ) []
};

/**
 * Note: All emitters should be created when the ParticleSystem init.
 * If a emitter play latter, you should stop the emitter, and then play it.
 */
export class ParticleSystem extends common.Player {
    public data: psData.PSData = new psData.PSData();
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
        this.data.init(info);
        let len = info.emitters ? info.emitters.length : 0;
        let newCount: number = 0;
        for (let i = 0; i < len; ++i) {
            newCount += (info.emitters[i].count || 1);
        }
        let emitterInfos: emitter.EmitterInfo[] = [];
        emitterInfos.length = newCount;
        let emitterInfoIndex = 0;
        for (let i = 0; i < len; ++i) {
            let count = info.emitters[i].count || 1;
            for (let j = 0; j < count; ++j) {
                emitterInfos[emitterInfoIndex] = info.emitters[i];
                ++emitterInfoIndex;
            }
        }

        this.emitterCount = newCount;
        let emitters = this.emitters;
        if (emitters.length < newCount) {
            emitters.length = newCount;
        }
        // Create emitters
        let mapEmitters: {[name: string]: emitter.Emitter} = {};

        for (let i = 0; i < newCount; ++i) {
            let et = emitters[i];
            let etInfo = emitterInfos[i];
            if (! et) emitters[i] = et = new emitter.Emitter(this.data);
            et.init(etInfo);
            if (! et.name) {
                et.name = `emitter_${i + 1}`;
            }
            mapEmitters[et.name] = et;
        }

        // Initialize the hierarchy of the emiiters
        for (let i = 0; i < newCount; ++i) {
            let et = emitters[i];
            let etInfo = emitterInfos[i];
            if (etInfo.parent) {
                let parentEt = mapEmitters[etInfo.parent];
                let parentPlayer = parentEt.player;
                parentPlayer.addPlayer(et.player);
            }
        }

        // Ready and player the emitters
        for (let i = 0; i < newCount; ++i) {
            emitters[i].ready();
            if ( ! emitterInfos[i].parent) emitters[i].play();
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

    public setPosition(pos: common.Vector) {
        this.data.setPosition(pos);
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

    protected _reset() {
        super._reset();
        let emitterCount = this.emitterCount;
        let emitters = this.emitters;
        for (let i = 0; i < emitterCount; ++i) {
            emitters[i].reset();
        }
    }
}