import { SpaceTypeTypeInfo } from "../common/space_type";
import { Emitter } from "../emitter/emitter";
import { Particle } from "../particle/particle";
import { PSComponent } from "./component";
export declare class ParticleSystem<spaceType extends keyof SpaceTypeTypeInfo> {
    components: PSComponent<spaceType>[];
    emitters: Emitter<spaceType>[];
    particles: Particle<spaceType>[];
    constructor();
}
