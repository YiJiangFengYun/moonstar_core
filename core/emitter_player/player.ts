import * as common from "../common";
import * as particle from "../particle";
import { EmitterPlayerInfo } from "./info";
import { EVENT_START_EMITT, EVENT_END_EMITT, EVENT_COMPLETE } from "./events";

const DEFAULT_MAX_PARTICLE_COUNT = 100;

export class EmitterPlayer extends common.Player {
    public particles: particle.Particle[] = [];
    public particleCount: number = 0;
    public players: EmitterPlayer[] = [];
    public playerCount: number = 0;
    public origin: common.Vector = common.Vector.create();
    public rotation: number = 0;
    public useLocalSpace: boolean;

    public emitted: boolean;
    public emitComplete: boolean;
    public completed: boolean;
    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;

    public constructor() {
        super();
    }

    public init(info: EmitterPlayerInfo) {
        this.maxParticleCount = info.maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
        this._reset();
    }

    public get maxParticleCount() {
        return this._maxParticleCount;
    }

    public set maxParticleCount(value: number) {
        value = value || DEFAULT_MAX_PARTICLE_COUNT;
        this.particles.length = value;
        this._maxParticleCount = value;
        this._prepareParticles();
    }

    public stop() {
        super.stop();
    }

    public addPlayer(player: EmitterPlayer) {
        this.players[this.playerCount ++] = player;
    }

    public startEmit() {
        if ( ! this.emitted ) {
            this.emitted = true;
            this.emitComplete = false;
            this.completed = false;
            this.emit(EVENT_START_EMITT, this);
        }
    }

    public endEmit() {
        if (this.emitComplete) {
            this.emitComplete = true;
            this.emit(EVENT_END_EMITT, this);
        }
    }

    public checkComplete() {
        if ( this.emitted && this.emitComplete && this.particleCount <= 0) return true;
        return false;
    }

    public complete() {
        if (! this.completed) {
            this.completed = true;
            this.emit(EVENT_COMPLETE, this);
        }
    }

    protected _reset() {
        super._reset();
        this.emitted = false;
        this.emitComplete = false;
        this.completed = false;
        this.particleCount = 0;
    }

    private _prepareParticles() {
        let particleCount = this._maxParticleCount;
        let particles = this.particles;
        for (let i = 0; i < particleCount; ++i) {
            if (! particles[i]) particles[i] = {
                pos: common.Vector.create(),
            };
        }
    }
}