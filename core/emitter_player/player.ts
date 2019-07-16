import * as log from "loglevel";
import * as common from "../common";
import * as particle from "../particle";
import { EmitterPlayerInfo } from "./info";
import { EVENT_START_EMITT, EVENT_END_EMITT, EVENT_COMPLETE, EVENT_CHANGE_POSITION, EVENT_CREATED_PARTICLE, EVENT_DESTROYED_PARTICLE } from "./events";

const DEFAULT_MAX_PARTICLE_COUNT = 100;

export class EmitterPlayer extends common.Player {
    public particles: particle.Particle[] = [];
    public particleCount: number = 0;
    public players: EmitterPlayer[] = [];
    public playerCount: number = 0;
    public position: common.Vector = common.Vector.create();
    public rotation: number = 0;
    public useLocalSpace: boolean;
    public bounds: common.Bounds = common.Bounds.create();

    /**
     * This bounds is in the cordinate system of the particle system.
     */
    public rootBounds: common.Bounds = common.Bounds.create();

    public emitted: boolean;
    public emitComplete: boolean;
    public completed: boolean;
    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;

    private _id: number;
    public constructor() {
        super();
        this._id = common.gainID();
    }

    public get id() {
        return this._id;
    }

    public init(info: EmitterPlayerInfo) {
        this._maxParticleCount = info.maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
        this._prepareParticles();
        let boundsInfo = info.bounds;
        if (boundsInfo) common.Bounds.set(this.bounds, boundsInfo[0], boundsInfo[1], boundsInfo[2], boundsInfo[3]);
        this._reset();
        this._updateRootBounds();
    }

    public get maxParticleCount() {
        return this._maxParticleCount;
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

    public setPosition(value: common.Vector | number[]) {
        common.Vector.copy(this.position, value);
        this._updateRootBounds();
        this.emit(EVENT_CHANGE_POSITION, this);
    }

    public createParticle(){
        let particle: particle.Particle;
        if (this.particleCount < this.maxParticleCount) {
            particle = this.particles[this.particleCount];
            if (! particle) this.particles[this.particleCount] = 
                particle = { pos: common.Vector.create()};
            ++this.particleCount;
            if (particle.pos) {
                common.Vector.set(particle.pos, 0, 0);
            } else {
                particle.pos = common.Vector.fromValues(0, 0);
            }
            this.emit(EVENT_CREATED_PARTICLE, particle);
        }
        return particle;
    }

    public deleteParticle(particle: particle.Particle) {
        let particles = this.particles;
        let index = particles.indexOf(particle);
        if (index >= 0) {
            let end = --this.particleCount;
            let endParticle = particles[end];
            particles[end] = particles[index];
            particles[index] = endParticle;
            this.emit(EVENT_DESTROYED_PARTICLE, particle);
            return true;
        } else {
            log.error("Can't find the particle from the particles for delete the particle.");
            return false;
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
        this.particles.length = this.particleCount;
        for (let i = 0; i < particleCount; ++i) {
            if (! particles[i]) particles[i] = {
                pos: common.Vector.create(),
            };
        }
    }

    private _updateRootBounds() {
        common.Bounds.translate(this.rootBounds, this.bounds, this.position);
    }
}