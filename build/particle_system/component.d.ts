import { Emitter } from "../emitter/emitter";
import { SpaceTypeTypeInfo } from "../common/space_type";
export declare class PSComponent<spaceType extends keyof SpaceTypeTypeInfo> {
    emitter: Emitter<spaceType>;
    constructor();
}
