import { SpaceTypeTypeInfo } from "../common/space_type";
import { Emitter } from "../emitter/emitter";
import { Particle } from "../particle/particle";
import { PSComponent } from "./component";

export class ParticleSystem<spaceType extends keyof SpaceTypeTypeInfo> {

    public components: PSComponent<spaceType>[] = [];
    public emitters: Emitter<spaceType>[] = [];
    public particles: Particle<spaceType>[] = [];

    public constructor() {
    }
}
