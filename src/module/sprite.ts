import { ModRender, Module, IEmitter } from "./module";
import { VertexFormat, AttrName } from "../common/vertex";
import { WHITE } from "../common/color";

export class ModSprite extends Module implements ModRender {
    public static NAME = "sprite";

    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModSprite.NAME;
    }

    public getTotalVtxCount(): number {
        let owner = this.owner;
        let particleCount = owner.particleCount;
        return particleCount * 4;
    }

    public getTotalIdxCount(): number {
        let owner = this.owner;
        let particleCount = owner.particleCount;
        return particleCount * 6;
    }

    public fillBuffers(data: {
        vtxBuffer: ArrayBuffer;
        vtxBufferByteOffset: number;
        vtxFormat: VertexFormat;
        vtxSize: number;
        idxBuffer: ArrayBuffer;
        idxBufferByteOffset: number;
        idxValueOffset: number;
        idxSize: number;
    }): void {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        // let origin = owner.origin;
        let useLocal = owner.useLocalSpace;

        let vtxBuffer = data.vtxBuffer;
        let vtxFormat = data.vtxFormat;
        let vtxBufferByteOffset = data.idxBufferByteOffset;
        let vtxSize = data.vtxSize;

        let idxBuffer = data.idxBuffer;
        let idxBufferByteOffset = data.idxBufferByteOffset;
        let idxValueOffset = data.idxValueOffset;
        let idxSize = data.idxSize;
        //Traverse all particles.
        for (let particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            let particle = particles[particleIndex];
            //Vertex
            let vtxByteOffset = vtxBufferByteOffset;
            for (let i = 0; i < 4; ++i) {
                let attrCount = vtxFormat.length;
                for (let j = 0; j < attrCount; ++j) {
                    let attrFormat = vtxFormat[j];
                    let byteSize: number = 0;
                    switch (attrFormat.name) {
                        case AttrName.POSITION: {
                            byteSize = 4 * attrFormat.count;
                            let floatArray = new Float32Array(
                                vtxBuffer, 
                                vtxByteOffset, 
                                byteSize,
                            );
                            let pos = particle.pos;
                            if (useLocal) {
                                //todo
                            }
                            floatArray[0] = pos.x;
                            floatArray[1] = pos.y;
                            break;
                        }
                        case AttrName.UV0: {
                            byteSize = 8; //4 * 2
                            let floatArray = new Float32Array(
                                vtxBuffer,
                                vtxByteOffset,
                                byteSize,
                            );
                            floatArray[0] = i % 2; //0, 1, 0, 1
                            floatArray[1] = Math.floor(i / 2); //0, 0, 1, 1
                            break;
                        }
                        case AttrName.COLOR: {
                            byteSize = 4; //1 * 4
                            let unit8Array = new Uint8Array(
                                vtxBuffer,
                                vtxByteOffset,
                                byteSize,
                            );
                            let color = particle.color || WHITE;
                            unit8Array[0] = color.r * 255;
                            unit8Array[0] = color.g * 255;
                            unit8Array[0] = color.b * 255;
                            unit8Array[0] = color.a * 255;
                            break;
                        }
                    }
                    vtxByteOffset += byteSize;
                }
            }
            vtxBufferByteOffset += vtxSize * 4;
            //Index idxSize === 4byte
            let unit32Array = new Uint32Array(idxBuffer, idxBufferByteOffset);
            unit32Array[0] = idxValueOffset + 0;
            unit32Array[0] = idxValueOffset + 1;
            unit32Array[0] = idxValueOffset + 2;
            unit32Array[0] = idxValueOffset + 1;
            unit32Array[0] = idxValueOffset + 3;
            unit32Array[0] = idxValueOffset + 2;
            idxBufferByteOffset += idxSize * 6;
        }
        
    }
}