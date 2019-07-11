import * as common from "../common";
import * as particle from "../particle";
import { EmitterPlayerInfo } from "./info";
export declare class EmitterPlayer extends common.Player {
    particles: particle.Particle[];
    particleCount: number;
    players: EmitterPlayer[];
    playerCount: number;
    origin: common.Vector;
    rotation: number;
    useLocalSpace: boolean;
    emitted: boolean;
    emitComplete: boolean;
    completed: boolean;
    private _maxParticleCount;
    constructor();
    init(info: EmitterPlayerInfo): void;
    maxParticleCount: number;
    stop(): void;
    addPlayer(player: EmitterPlayer): void;
    startEmit(): void;
    endEmit(): void;
    checkComplete(): boolean;
    complete(): void;
    protected _reset(): void;
    private _prepareParticles;
}
