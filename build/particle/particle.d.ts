import { SpaceTypeTypeInfo } from "../common/space_type";
import { VectorTypes } from "../common/vector";
export declare class Particle<spaceType extends keyof SpaceTypeTypeInfo> {
    pos: VectorTypes[SpaceTypeTypeInfo[spaceType]];
    constructor();
}
