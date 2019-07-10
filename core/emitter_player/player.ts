import * as common from "../common";
import * as particle from "../particle";
import { EmitterPlayerInfo } from "./info";

const DEFAULT_MAX_PARTICLE_COUNT = 100;

export class EmitterPlayer extends common.Player {
    public particles: particle.Particle[] = [];
    public particleCount: number = 0;
    public players: EmitterPlayer[] = [];
    public playerCount: number = 0;
    public origin: common.Vector = common.Vector.create();
    public rotation: number = 0;
    public useLocalSpace: boolean;
    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;

    public constructor() {
        super();
    }

    public init(info: EmitterPlayerInfo) {
        this.maxParticleCount = info.maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
    }

    public get maxParticleCount() {
        return this._maxParticleCount;
    }

    public set maxParticleCount(value: number) {
        value = value || DEFAULT_MAX_PARTICLE_COUNT;
        this.particles.length = value;
        this._maxParticleCount = value;
    }

    public stop() {
        super.stop();
        this.particleCount = 0;
    }

    public addPlayer(player: EmitterPlayer) {
        this.players[this.playerCount ++] = player;
    }
}