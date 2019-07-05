import * as common from "../common";
import * as material from "../material";
import * as render from "../render";
import { ModRender, Module, IEmitter } from "./module";

export class ModSprite extends Module implements ModRender {
    public static NAME = "sprite";

    public material: material.Material;

    public constructor(owner: IEmitter) {
        super(owner);
        this.name = ModSprite.NAME;
        this.material = new material.Material(material.MaterialType.SPRITE);
    }

    public init(info: any) {
        super.init(info);
        this.material.init(info);
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

    public getMaxVtxCount(): number {
        return this.owner.maxParticleCount * 4;
    }

    public getMaxIdxCount(): number {
        return this.owner.maxParticleCount * 6;
    }

    public fillBuffers(drawData: render.DrawData, offsets: {
        vtxBufferByteOffset: number;
        idxBufferByteOffset: number;
        lastVertexCount: number; //used as idxValueOffset
        lastIndexCount: number; // used as index offset of cmd.
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

        let posHelper: common.Vector = common.Vector.create();
        let uvHelper: common.Vector = common.Vector.create();

        //Traverse all particles.
        for (let particleIndex = 0; particleIndex < particleCount; ++particleIndex) {
            let particle = particles[particleIndex];
            let pos = particle.pos;
            let size = particle.size;
            let color = particle.color || common.WHITE;
            let angle = particle.angle || 0;
            let cos = angle ? Math.cos(angle) : 1;
            let sin = angle ? Math.sin(angle) : 0;
            let halfW = size ? size[0] / 2 : 0;
            let halfH = size ? size[1] / 2 : 0;
            let halfWNegative = - halfW;
            let halfHNegative = - halfH;
            //Vertex 0 left top
            posHelper[0] = pos[0] + cos * halfWNegative - sin * halfH;
            posHelper[1] = pos[1] + sin * halfWNegative + sin * halfH;
            uvHelper[0] = 0;
            uvHelper[1] = 0;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 1 right top
            posHelper[0] = pos[0] + cos * halfW - sin * halfH;
            posHelper[1] = pos[1] + sin * halfW + sin * halfH;
            uvHelper[0] = 1;
            uvHelper[1] = 0;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 2 left bottom
            posHelper[0] = pos[0] + cos * halfWNegative - sin * halfHNegative;
            posHelper[1] = pos[1] + sin * halfWNegative + sin * halfHNegative;
            uvHelper[0] = 0;
            uvHelper[1] = 1;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);
            //Vertex 3 right bottom
            posHelper[0] = pos[0] + cos * halfW - sin * halfHNegative;
            posHelper[1] = pos[1] + sin * halfW + sin * halfHNegative;
            uvHelper[0] = 1;
            uvHelper[1] = 1;
            vtxBufferByteOffset = vtxBufferByteOffset = drawData.fillVertex({
                pos: posHelper,
                uv: uvHelper,
                color: color,
            }, vtxBufferByteOffset);

            //Index
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 0, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 1, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 3, idxBufferByteOffset);
            idxBufferByteOffset = drawData.fillIndex(idxValueOffset + 2, idxBufferByteOffset);
        }

        drawData.fillDrawCmd({
            indexOffset: offsets.lastIndexCount,
            indexCount: particleCount * 6,
            material: this.material,
        });
        
    }
}