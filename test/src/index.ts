import * as renderMod from "../../renderer";
import * as core from "../../core";

const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 1000,
        modules: [
            {
                name: "life_time",
                life: 2,
            },
            {
                name: "sprite",
                texturePath: "./res/star.png",
            },
            {
                name: "spawn",
                rate: 100,
            },
            {
                name: "size_constant",
                width: 20,
                height: 20,
            },
            {
                name: "velocity_constant",
                x: 10,
                y: 10,
            }
        ]
    }],
}

class App {
    private _intervalI: number;
    private _lastTime: number;
    private _renderer: renderMod.Renderer;
    private _particleSystem: renderMod.ParticleSystem;
    public constructor() {
        this._init()
    }

    public destructor() {
        window.clearInterval(this._intervalI);
        this._intervalI = 0;
    }

    private _init() {
        let context = this;
        return Promise.resolve()
        .then(() => {
            let canvas = document.getElementById("glCanvas") as HTMLCanvasElement;
            return renderMod.init({
                canvas: canvas,
                width: canvas.width,
                height: canvas.height,
            });
        })
        .then((renderer) => {
            context._renderer = renderer;
        })
        .then(() => {
            this._particleSystem = new renderMod.ParticleSystem();
            this._particleSystem.init(psInfo);
            context._renderer.addParticleSystem(this._particleSystem);
        })
        .then(() => {
            context._intervalI = window.setInterval(this._update.bind(this), 20);
            context._lastTime = new Date().getTime();
        })
        .then(() => {
            context._particleSystem.play();
        });
    }

    private _update() {
        let now = new Date().getTime();
        let dt = now - this._lastTime;
        this._lastTime = now;

        this._renderer.update(dt / 1000);

        this._preRender();

        this._renderer.render();

        this._postRender();
    }

    private _preRender() {

    }

    private _postRender() {

    }
}

new App();