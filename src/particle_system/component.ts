import { Emitter } from "../emitter/emitter";
import { SpaceTypeTypeInfo } from "../common/space_type";

export class PSComponent<spaceType extends keyof SpaceTypeTypeInfo> {
    public emitter: Emitter<spaceType>;
    public constructor() {

    }
}