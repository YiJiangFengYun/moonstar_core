import { Emitter } from "../emitter/emitter";
import { SpaceTypeTypeInfo } from "../common/space_type";
export declare class Component<spaceType extends keyof SpaceTypeTypeInfo> {
    emitter: Emitter<spaceType>;
    constructor();
}
