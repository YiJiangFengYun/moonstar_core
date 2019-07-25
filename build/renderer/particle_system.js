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
        this._boundsPosHelper = core.Vector.create();
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
    ParticleSystem.prototype.changePos = function (pos) {
        this.data.changePos(pos);
    };
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
        var boundsPosHelper = this._boundsPosHelper;
        var boundsSizeHelper = this._boundsSizeHelper;
        for (var i = 0; i < cmdCount; ++i) {
            var cmd = cmdList[i];
            if (cmd.indexCount > 0) {
                var bounds = cmd.bounds || core.BOUNDS_EMPTY;
                if (core.Bounds.isEmpty(bounds) || core.Bounds.intersecting(bounds, rData.viewBounds)) {
                    var material = mapMaterials[cmd.material];
                    if (material) {
                        material.render(cmd);
                    }
                    if (rData.showBounds && !core.Bounds.isEmpty(bounds)) {
                        var width = bounds[2] - bounds[0];
                        var height = bounds[3] - bounds[1];
                        core.Vector.set(boundsPosHelper, bounds[0] + width / 2, bounds[1] + height / 2);
                        core.Vector.set(boundsSizeHelper, width, height);
                        emitter_bounds_outline_1.emitterBoundsOutline.render(boundsPosHelper, boundsSizeHelper);
                    }
                }
            }
        }
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
//# sourceMappingURL=particle_system.js.map