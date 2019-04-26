import { Component } from "./component";
import { SpaceTypeTypeInfo } from "../common/space_type";
import { Emitter } from "../emitter/emitter";
import { Particle } from "../particle/particle";

export class ParticleSystem<spaceType extends keyof SpaceTypeTypeInfo> {

    public components: Component<spaceType>[] = [];
    public emitters: Emitter<spaceType>[] = [];
    public particles: Particle<spaceType>[] = [];

    public constructor() {
    }
}
