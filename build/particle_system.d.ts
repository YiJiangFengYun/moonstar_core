import { Component } from "./component";
import { SpaceTypeTypeInfo } from "./space_type";
import { Emitter } from "./emitter";
import { Particle } from "./particle";
export declare class ParticleSystem<spaceType extends keyof SpaceTypeTypeInfo> {
    components: Component<spaceType>[];
    emitters: Emitter<spaceType>[];
    particles: Particle<spaceType>[];
    constructor();
}
