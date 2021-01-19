"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
var common = require("../common");
var module = require("../module");
var emitter_player = require("../emitter_player");
var Emitter = /** @class */ (function () {
    function Emitter(psData) {
        this.modules = [];
        this.mapModules = {};
        this._id = common.gainID();
        this.player = new emitter_player.EmitterPlayer(psData);
    }
    Object.defineProperty(Emitter.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Emitter.prototype.init = function (info) {
        this.name = info.name;
        this.player.init(info, !info.parent);
        var modules = this.modules;
        var mapModules = this.mapModules;
        var newModCount = info.modules ? info.modules.length : 0;
        modules.length = newModCount;
        for (var i = 0; i < newModCount; ++i) {
            var moduleConfig = info.modules[i];
            var name_1 = moduleConfig.name;
            modules[i] = module.createModule(name_1, this.player);
            modules[i].init(moduleConfig);
            if (mapModules[name_1]) {
                console.warn("There are multiple modules with the same name applied to the emitter.");
            }
            mapModules[name_1] = modules[i];
            if (module.renderModules.indexOf(name_1) >= 0) {
                if (this.renderModule) {
                    console.warn("There are multiple render modules applied to the emitter.");
                }
                this.renderModule = modules[i];
            }
        }
        this.player.stop();
    };
    Emitter.prototype.ready = function () {
        var modules = this.modules;
        modules.forEach(function (mod) {
            mod.ready();
        });
    };
    Emitter.prototype.update = function (dt) {
        this.player.update(dt);
        if (this.player.isPlaying) {
            this.modules.forEach(function (mod) {
                mod.update(dt);
            });
            this.modules.forEach(function (mod) {
                mod.postUpdate();
            });
        }
    };
    /**
     * Use to reset players and all modules from particle system.
     */
    Emitter.prototype.reset = function () {
        this.player.reset();
        this.modules.forEach(function (mod) {
            mod.reset();
        });
    };
    Emitter.prototype.getModule = function (type) {
        return this.mapModules[type.NAME];
    };
    return Emitter;
}());
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map