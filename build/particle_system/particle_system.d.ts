import { SpaceID } from "../common/space_type";
import { DrawData } from "../render/draw_data";
import { Player } from "../common/player";
import { Emitter } from "../emitter/emitter";
export interface ParticleSystem {
    space: SpaceID;
    drawData: DrawData;
    emitters: Emitter[];
    update(dt: number): void;
    render(): void;
}
export declare class ParticleSystem extends Player implements ParticleSystem {
    space: SpaceID;
    drawData: DrawData;
    emitters: Emitter[];
    constructor();
}
