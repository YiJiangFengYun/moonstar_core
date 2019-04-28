import { SpaceID } from "../common/space_type";
import { PSComponent } from "./component";
import { Emitter2D, Emitter3D } from "../emitter/emitter";
export interface ParticleSystem {
}
export declare class ParticleSystem2D implements ParticleSystem {
    space: SpaceID;
    components: PSComponent[];
    emitters: Emitter2D[];
    constructor();
}
export declare class ParticleSystem3D implements ParticleSystem {
    space: SpaceID;
    components: PSComponent[];
    emitters: Emitter3D[];
}
