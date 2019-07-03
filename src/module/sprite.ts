import * as common from "../common";
import * as render from "../render";
import { ModRender, Module, IEmitter } from "./module";

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

    public fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number; //used as idxValueOffset
    }): void {
        let owner = this.owner;
        let particles = owner.particles;
        let particleCount = owner.particleCount;
        // todo 
        // let origin = owner.origin;
        // let useLocal = owner.useLocalSpace; 

        let vtxBufferByteOffset = offsets.idxBufferByteOffset;

        let idxBufferByteOffset = offsets.idxBufferByteOffset;
        let idxValueOffset = offsets.lastVertexCount;

        //Traverse all particles.
        for (let particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            let particle = particles[particleIndex];
            let size = particle.size;
            let color = particle.color || common.WHITE;
            let angle = particle.angle || 0;
            let cos = angle ? Math.cos(angle) : 1;
            let sin = angle ? Math.sin(angle) : 0;
            let halfW = size ? size.x / 2 : 0;
            let halfH = size ? size.y / 2 : 0;
            let halfWNegative = - halfW;
            let halfHNegative = - halfH;
            //Vertex 0 left top
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                posX: cos * halfWNegative - sin * halfH,
                posY: sin * halfWNegative + sin * halfH,
                uv0X: 0,
                uv0Y: 0,
                colorR: color.r, 
                colorG: color.g, 
                colorB: color.b, 
                colorA: color.a, 
            }, vtxBufferByteOffset);
            //Vertex 1 right top
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                posX: cos * halfW - sin * halfH,
                posY: sin * halfW + sin * halfH,
                uv0X: 1,
                uv0Y: 0,
                colorR: color.r, 
                colorG: color.g, 
                colorB: color.b, 
                colorA: color.a, 
            }, vtxBufferByteOffset);
            //Vertex 2 left bottom
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                posX: cos * halfWNegative - sin * halfHNegative,
                posY: sin * halfWNegative + sin * halfHNegative,
                uv0X: 0,
                uv0Y: 1,
                colorR: color.r, 
                colorG: color.g, 
                colorB: color.b, 
                colorA: color.a,
            }, vtxBufferByteOffset);
            //Vertex 3 right bottom
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                posX: cos * halfW - sin * halfHNegative,
                posY: sin * halfW + sin * halfHNegative,
                uv0X: 1,
                uv0Y: 1,
                colorR: color.r, 
                colorG: color.g, 
                colorB: color.b, 
                colorA: color.a,
            }, vtxBufferByteOffset);

            //Index
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
        }
        
    }
}