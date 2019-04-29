import { SpaceID } from "../common/space_type";
import { PSComponent, PSRenderComponent } from "./component";
import { Emitter2D, Emitter3D, Emitter } from "../emitter/emitter";
import { DrawData } from "../render/draw_data";
import { Player } from "../common/player";
export interface ParticleSystem {
    space: SpaceID;
    drawData: DrawData;
    components: PSComponent[];
    emitters: Emitter[];
    renderComponent: PSRenderComponent;
    update(dt: number): void;
    render(): void;
}
export declare class ParticleSystem2D extends Player implements ParticleSystem {
    space: SpaceID;
    drawData: DrawData;
    components: PSComponent[];
    emitters: Emitter2D[];
    renderComponent: PSRenderComponent;
    constructor();
    update(dt: number): void;
    render(): void;
}
export declare class ParticleSystem3D extends Player implements ParticleSystem {
    space: SpaceID;
    drawData: DrawData;
    components: PSComponent[];
    emitters: Emitter3D[];
    renderComponent: PSRenderComponent;
    constructor();
    update(dt: number): void;
    render(): void;
}
