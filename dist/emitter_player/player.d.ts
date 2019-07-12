import * as common from "../common";
import * as particle from "../particle";
import { EmitterPlayerInfo } from "./info";
export declare class EmitterPlayer extends common.Player {
    particles: particle.Particle[];
    particleCount: number;
    players: EmitterPlayer[];
    playerCount: number;
    position: common.Vector;
    rotation: number;
    useLocalSpace: boolean;
    bounds: common.Bounds;
    /**
     * This bounds is in the cordinate system of the particle system.
     */
    rootBounds: common.Bounds;
    emitted: boolean;
    emitComplete: boolean;
    completed: boolean;
    private _maxParticleCount;
    private _id;
    constructor();
    readonly id: number;
    init(info: EmitterPlayerInfo): void;
    maxParticleCount: number;
    stop(): void;
    addPlayer(player: EmitterPlayer): void;
    startEmit(): void;
    endEmit(): void;
    checkComplete(): boolean;
    complete(): void;
    setPosition(value: common.Vector | number[]): void;
    protected _reset(): void;
    private _prepareParticles;
    private _updateRootBounds;
}
