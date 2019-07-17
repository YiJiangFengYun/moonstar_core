import * as log from "loglevel";
import * as common from "../common";
import * as particle from "../particle";
import * as psDataMod from "../ps_data";
import { EmitterPlayerInfo } from "./info";
import { EVENT_START_EMITT, EVENT_END_EMITT, EVENT_COMPLETE, EVENT_CHANGE_POSITION, EVENT_CREATED_PARTICLE, EVENT_DESTROYED_PARTICLE } from "./events";

const DEFAULT_MAX_PARTICLE_COUNT = 100;

export class EmitterPlayer extends common.Player {
    public root: boolean;
    public psData: psDataMod.PSData;
    public particles: particle.Particle[] = [];
    public particleCount: number = 0;
    public players: EmitterPlayer[] = [];
    public playerCount: number = 0;
    
    public bounds: common.Bounds = common.Bounds.create();
    public globalBounds: common.Bounds = common.Bounds.create();

    private _position: common.Vector = common.Vector.create();
    private _rotation: number = 0;

    public emitted: boolean;
    public emitComplete: boolean;
    public completed: boolean;
    private _maxParticleCount: number = DEFAULT_MAX_PARTICLE_COUNT;

    private _globalPositionHelper: common.Vector = common.Vector.create();

    private _id: number;
    public constructor(psData: psDataMod.PSData) {
        super();
        this._id = common.gainID();
        this.psData = psData;

        this.psData.on(psDataMod.EVENT_CHANGE_POSITION, this._onPSDataChangePos, this);
        this._updateGlobalPosition();
    }

    public get id() {
        return this._id;
    }

    public init(info: EmitterPlayerInfo, root: boolean) {
        this.root = root;
        this._maxParticleCount = info.maxParticleCount || DEFAULT_MAX_PARTICLE_COUNT;
        this._prepareParticles();
        let boundsInfo = info.bounds;
        if (boundsInfo) common.Bounds.set(this.bounds, boundsInfo[0], boundsInfo[1], boundsInfo[2], boundsInfo[3]);
        this._reset();
        this._updateGlobalBounds();
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

    public get position() {
        let psData = this.psData;
        if (psData.useLocalSpace) {
            // If use local space, the position of the emitter is relative to the particle system.
            return this._position;
        } else {
            // If not use local space, the position of the emitter is global, but the _position
            // of the root emiiter is relative to the particle system.
            if (this.root) {
                return this._globalPositionHelper;
            } else {
                return this._position;
            }
        }
    }

    public get rotation() {
        let psData = this.psData;
        if (psData.useLocalSpace) {
            // If use local space, the rotation of the emitter is relative to the particle system.
            return this._rotation;
        } else {
            // If not use local space, the position of the emitter is global, but the _rotation of the
            // the root emitter is relative to the particle system.
            if (this.root) {
                // Now the particle system don't own its rotation.
                // return 0 + this._rotation;
                return this._rotation;
            } else {
                return this._rotation;
            }
        }
    }

    public setPosition(value: common.Vector | number[]) {
        common.Vector.copy(this._position, value);
        this._updateGlobalBounds();
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
                common.Vector.copy(particle.pos, this.position);
                // common.Vector.set(particle.pos, 0, 0);
            } else {
                particle.pos = common.Vector.clone(this.position);
                // particle.pos = common.Vector.fromValues(0, 0);
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

    private _updateGlobalBounds() {
        let psData = this.psData;
        let pos: common.Vector;
        if (psData.useLocalSpace) {
            pos = common.Vector.create();
            common.Vector.transformMat2d(pos, this._position, psData.matrix);
        } else {
            pos = this.position;
        }
        common.Bounds.translate(this.globalBounds, this.bounds, pos);
    }

    private _updateGlobalPosition() {
        let psData = this.psData;
        if ( ! psData.useLocalSpace && this.root) {
            common.Vector.transformMat2d(this._globalPositionHelper, this._position, psData.matrix);
            this._updateGlobalBounds();
        } 
    }

    private _onPSDataChangePos() {
        this._updateGlobalPosition();
    }
}