import { Particle } from "./particle";
export declare class PComponent {
    owner: Particle;
    constructor(owner: Particle);
    update(dt: number): void;
}
