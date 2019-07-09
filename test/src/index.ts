import * as stats from "stats.js";
import * as renderMod from "../../renderer";
import * as core from "../../core";

const psInfo: core.ParticleSystemInfo = {
    emitters: [{
        maxParticleCount: 1000,
        root: true,
        modules: [
            {
                name: "life_time",
                life: 5,
            },
            {
                name: "sprite",
                texturePath: "./res/star.png",
            },
            {
                name: "spawn",
                rate: 50,
                duration: 3
            },
            {
                name: "size_initial",
                width: 32,
                height: 32,
            },
            {
                name: "velocity_constant",
                x: 100,
                y: 100,
            },
            {
                name: "color_over_life",
                beginColorR: 1,
                beginColorG: 1,
                beginColorB: 1,
                beginColorA: 1,
                endColorR: 1,
                endColorG: 1,
                endColorB: 1,
                endColorA: 0,

            }
        ]
    }],
}

class App {
    private _intervalI: number;
    private _lastTime: number;
    private _renderer: renderMod.Renderer;
    private _particleSystem: renderMod.ParticleSystem;
    private _stats: stats;
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
                var width = canvas.scrollWidth;
                var height = canvas.scrollHeight;
                canvas.width = width;
                canvas.height = height;
                return renderMod.init({
                    canvas: canvas,
                    width: width,
                    height: height,
                    clearColor: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1,
                    }
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
            })
            .then(() => {
                var st =  new stats();
                st.showPanel(1);
                document.body.appendChild(st.dom);
                context._stats = st;
            })
    }

    private _update() {
        this._stats.begin();
        let now = new Date().getTime();
        let dt = now - this._lastTime;
        this._lastTime = now;

        this._renderer.update(dt / 1000);

        this._preRender();

        this._renderer.render();

        this._postRender();
        this._stats.end();
    }

    private _preRender() {

    }

    private _postRender() {

    }
}

new App();