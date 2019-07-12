"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("loglevel");
var core = require("../core");
var material_1 = require("./material");
var render_data_1 = require("./render_data");
var particle_system_data_1 = require("./particle_system_data");
var emitter_bounds_outline_1 = require("./emitter_bounds_outline");
/**
 * A particle system class is for a draw data state of a particle system of the core.
 */
var ParticleSystem = /** @class */ (function () {
    function ParticleSystem() {
        this.data = new particle_system_data_1.ParticleSystemData();
        this.mapMaterials = {};
        this.mapGlobalBoundsOfEmitter = {};
        this._boundsSizeHelper = core.Vector.create();
    }
    ParticleSystem.prototype.init = function (info) {
        this.data.init(info);
        //Initialize the map of the all materials.
        var psCore = this.data.psCore;
        var emitters = psCore.emitters;
        var emitterCount = psCore.emitterCount;
        var mapMaterials = this.mapMaterials;
        for (var i = 0; i < emitterCount; ++i) {
            var renderModule = emitters[i].renderModule;
            var matCore = renderModule.material;
            var material = material_1.createMaterial(matCore, this.data);
            mapMaterials[matCore.id] = material;
            var player = emitters[i].player;
            var bounds = this.mapGlobalBoundsOfEmitter[player.id] = core.Bounds.create();
            core.Bounds.copy(bounds, player.rootBounds);
            core.Bounds.translate(bounds, bounds, psCore.position);
            player.on(core.EVENT_CHANGE_POSITION, this._onEmitterChangePos, this);
        }
    };
    ParticleSystem.prototype.update = function (dt) {
        var psCore = this.data.psCore;
        psCore.update(dt);
    };
    ParticleSystem.prototype.render = function () {
        var psCore = this.data.psCore;
        psCore.render();
        this.data.refreshBuffers();
        this._draw();
    };
    ParticleSystem.prototype.play = function () {
        return this.data.psCore.play();
    };
    ParticleSystem.prototype.pause = function () {
        return this.data.psCore.pause();
    };
    ParticleSystem.prototype.stop = function () {
        return this.data.psCore.stop();
    };
    Object.defineProperty(ParticleSystem.prototype, "elapsedTime", {
        get: function () {
            return this.data.psCore.elapsedTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "isPlay", {
        get: function () {
            return this.data.psCore.isPlay;
        },
        enumerable: true,
        configurable: true
    });
    ParticleSystem.prototype._draw = function () {
        var rData = render_data_1.renderData;
        if (!rData) {
            log.error("The render data of the particle system is invalid.");
            return;
        }
        var data = this.data;
        var psCore = data.psCore;
        var drawData = psCore.drawData;
        var cmdList = drawData.cmdList;
        var cmdCount = drawData.cmdCount;
        var mapMaterials = this.mapMaterials;
        var mapBounds = this.mapGlobalBoundsOfEmitter;
        var boundsSizeHelper = this._boundsSizeHelper;
        for (var i = 0; i < cmdCount; ++i) {
            var cmd = cmdList[i];
            if (cmd.indexCount > 0) {
                var bounds = mapBounds[cmd.emitterPlayer];
                if (core.Bounds.isEmpty(bounds) || core.Bounds.intersecting(bounds, rData.viewBounds)) {
                    var material = mapMaterials[cmd.material];
                    if (material) {
                        material.render(cmd);
                    }
                    if (!core.Bounds.isEmpty(bounds)) {
                        core.Vector.set(boundsSizeHelper, bounds[2] - bounds[0], bounds[3] - bounds[1]);
                        emitter_bounds_outline_1.emitterBoundsOutline.render(cmd, data.modelViewMatrix, boundsSizeHelper);
                    }
                }
            }
        }
    };
    ParticleSystem.prototype._onEmitterChangePos = function (player) {
        var bounds = this.mapGlobalBoundsOfEmitter[player.id];
        core.Bounds.copy(bounds, player.rootBounds);
        core.Bounds.translate(bounds, bounds, this.data.psCore.position);
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
//# sourceMappingURL=particle_system.js.map