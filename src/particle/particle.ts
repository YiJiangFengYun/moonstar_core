import { SpaceTypeTypeInfo } from "../common/space_type";
import { VectorTypes } from "../common/vector";

export class Particle<spaceType extends keyof SpaceTypeTypeInfo> {
    public pos:VectorTypes[SpaceTypeTypeInfo[spaceType]];
    public constructor() {

    }
}