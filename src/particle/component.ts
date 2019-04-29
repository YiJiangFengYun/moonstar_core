import { Particle } from "./particle";

export class PComponent {
    public owner: Particle;
    public constructor(owner: Particle) {
        this.owner = owner;
    }

    public update(dt: number):void {

    }
}