import { SpaceID } from "../common/space_type";
import { PSComponent } from "./component";
import { Emitter2D, Emitter3D } from "../emitter/emitter";
import { DrawData } from "../render/draw_data";
export interface ParticleSystem {
    drawData: DrawData;
}
export declare class ParticleSystem2D implements ParticleSystem {
    space: SpaceID;
    drawData: DrawData;
    components: PSComponent[];
    emitters: Emitter2D[];
    constructor();
}
export declare class ParticleSystem3D implements ParticleSystem {
    space: SpaceID;
    drawData: DrawData;
    components: PSComponent[];
    emitters: Emitter3D[];
}
