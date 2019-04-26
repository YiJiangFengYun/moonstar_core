import { SpaceTypeTypeInfo } from "./space_type";
import { VectorTypes } from "./vector";
export declare class Particle<spaceType extends keyof SpaceTypeTypeInfo> {
    pos: VectorTypes[SpaceTypeTypeInfo[spaceType]];
    constructor();
}
