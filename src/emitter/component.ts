import { SpaceTypeTypeInfo } from "../common/space_type";

export class EComponent<spaceType extends keyof SpaceTypeTypeInfo> {
    public constructor() {

    }
}