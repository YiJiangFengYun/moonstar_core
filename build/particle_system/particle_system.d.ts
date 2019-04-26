import { Component } from "./component";
import { SpaceTypeTypeInfo } from "../common/space_type";
import { Emitter } from "../emitter/emitter";
import { Particle } from "../particle/particle";
export declare class ParticleSystem<spaceType extends keyof SpaceTypeTypeInfo> {
    components: Component<spaceType>[];
    emitters: Emitter<spaceType>[];
    particles: Particle<spaceType>[];
    constructor();
}
