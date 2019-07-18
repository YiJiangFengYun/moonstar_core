"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("loglevel");
var common = require("../common");
var module = require("../module");
var emitter_player = require("../emitter_player");
var Emitter = /** @class */ (function () {
    function Emitter(psData) {
        this.modules = [];
        this._id = common.gainID();
        this.player = new emitter_player.EmitterPlayer(psData);
    }
    Object.defineProperty(Emitter.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Emitter.prototype.init = function (info) {
        this.name = info.name;
        this.player.init(info, !info.parent);
        var modules = this.modules;
        var newModCount = info.modules ? info.modules.length : 0;
        modules.length = newModCount;
        for (var i = 0; i < newModCount; ++i) {
            var moduleClass = module.mapModules[info.modules[i].name];
            if (!moduleClass)
                throw new Error("The module " + info.modules[i].name + " is invalid.");
            modules[i] = new moduleClass(this.player);
            modules[i].init(info.modules[i]);
            if (module.renderModules.indexOf(moduleClass) >= 0) {
                if (this.renderModule) {
                    log.warn("There multiple render modules applied to the emitter.");
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
        if (this.player.isPlay) {
            this.modules.forEach(function (mod) {
                mod.update(dt);
            });
        }
    };
    Emitter.prototype.play = function () {
        this.player.play();
    };
    Emitter.prototype.stop = function () {
        this.player.stop();
    };
    Emitter.prototype.reset = function () {
        this.player.reset();
        this.modules.forEach(function (mod) {
            mod.reset();
        });
    };
    return Emitter;
}());
exports.Emitter = Emitter;
