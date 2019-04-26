import { Component } from "./component";
import { SpaceTypeTypeInfo } from "./space_type";
import { Emitter } from "./emitter";
import { Particle } from "./particle";

export class ParticleSystem<spaceType extends keyof SpaceTypeTypeInfo> {

    public components: Component<spaceType>[] = [];
    public emitters: Emitter<spaceType>[] = [];
    public particles: Particle<spaceType>[] = [];

    public constructor() {
    }
}
