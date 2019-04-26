import { SpaceTypeTypeInfo } from "../common/space_type";

export class PComponent<spaceType extends keyof SpaceTypeTypeInfo> {
    public constructor() {

    }
}