import { SpaceTypeTypeInfo } from "./space_type";
import { VectorTypes } from "./vector";

export class Particle<spaceType extends keyof SpaceTypeTypeInfo> {
    public pos:VectorTypes[SpaceTypeTypeInfo[spaceType]];
    public constructor() {

    }
}