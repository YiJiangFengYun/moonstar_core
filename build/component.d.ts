import { Emitter } from "./emitter";
import { SpaceTypeTypeInfo } from "./space_type";
export declare class Component<spaceType extends keyof SpaceTypeTypeInfo> {
    emitter: Emitter<spaceType>;
    constructor();
}
