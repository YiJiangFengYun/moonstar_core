import { Emitter } from "./emitter";
import { SpaceTypeTypeInfo } from "./space_type";

export class Component<spaceType extends keyof SpaceTypeTypeInfo> {
    public emitter: Emitter<spaceType>;
    public constructor() {

    }
}