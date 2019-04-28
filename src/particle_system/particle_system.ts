import { SpaceID } from "../common/space_type";
import { PSComponent } from "./component";
import { Emitter2D, Emitter3D } from "../emitter/emitter";

export interface ParticleSystem {

}

export class ParticleSystem2D implements ParticleSystem {
    public space: SpaceID = SpaceID.SPACE_2D;
    public components: PSComponent[] = [];
    public emitters: Emitter2D[] = [];

    public constructor() {
    }
}


export class ParticleSystem3D implements ParticleSystem {
    public space: SpaceID = SpaceID.SPACE_3D;
    public components: PSComponent[] = [];
    public emitters: Emitter3D[] = [];
}