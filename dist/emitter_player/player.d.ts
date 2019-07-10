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
    private _maxParticleCount;
    constructor();
    init(info: EmitterPlayerInfo): void;
    maxParticleCount: number;
    stop(): void;
    addPlayer(player: EmitterPlayer): void;
}
