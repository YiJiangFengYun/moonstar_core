import { ParticleSystem } from "./particle_system";
export declare class PSComponent {
    owner: ParticleSystem;
    constructor(owner: ParticleSystem);
    update(dt: number): void;
}
export declare class PSRenderComponent extends PSComponent {
    render(): void;
}
