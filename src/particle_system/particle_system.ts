import { SpaceID } from "../common/space_type";
import { PSComponent } from "./component";
import { Emitter2D, Emitter3D } from "../emitter/emitter";
import { DrawData } from "../render/draw_data";

export interface ParticleSystem {
    drawData: DrawData;
}

export class ParticleSystem2D implements ParticleSystem {
    public space: SpaceID = SpaceID.SPACE_2D;
    public drawData: DrawData = new DrawData(this.space);
    public components: PSComponent[] = [];
    public emitters: Emitter2D[] = [];

    public constructor() {
    }
}


export class ParticleSystem3D implements ParticleSystem {
    public space: SpaceID = SpaceID.SPACE_3D;
    public drawData: DrawData = new DrawData(this.space);
    public components: PSComponent[] = [];
    public emitters: Emitter3D[] = [];
}