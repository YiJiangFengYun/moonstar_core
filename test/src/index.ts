import * as stats from "stats.js";
import * as renderMod from "../../renderer";
import * as core from "../../core";
import * as sampleSpriteSheetSimple from "./sample_spritesheet_simple";
import * as sampleTest from "./sample_test";

const tests: { name: string; info: core.ParticleSystemInfo }[] = [
    { name: sampleTest.name, info: sampleTest.psInfo },
    { name: sampleSpriteSheetSimple.name, info: sampleSpriteSheetSimple.psInfo },
];

class App {
    private _intervalI: number;
    private _lastTime: number;
    private _renderer: renderMod.Renderer;
    private _particleSystem: renderMod.ParticleSystem;
    private _stats: stats;
    private _selectedIndex = 0;
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
                context._intervalI = window.setInterval(context._update.bind(context), 20);
                context._lastTime = new Date().getTime();
            })
            .then(() => {
                var st = new stats();
                st.showPanel(1);
                let statsElement = document.getElementById("stats");
                statsElement.appendChild(st.dom);
                context._stats = st;
            })
            .then(() => {
                let selectElement = document.getElementById("select");
                tests.forEach(test => {
                    let newElement = document.createElement("option");
                    newElement.innerText = test.name;
                    selectElement.appendChild(newElement);
                });
                selectElement.onchange = context._onChangeSelect.bind(context);
            })
            .then(() => {
                context._updateParticleSystem();
            });
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

    private _updateParticleSystem() {
        if (this._particleSystem) {
            this._renderer.removeParticleSystem(this._particleSystem);
        }
        this._particleSystem = new renderMod.ParticleSystem();
        this._particleSystem.init(tests[this._selectedIndex].info);
        this._renderer.addParticleSystem(this._particleSystem);
        this._particleSystem.play();
    }

    private _onChangeSelect() {
        let selectElement: HTMLSelectElement = document.getElementById("select") as HTMLSelectElement;
        let name = selectElement.value;
        this._selectedIndex = tests.findIndex((value) => {
            if (value.name === name) return true;
            else return false;
        });
        this._updateParticleSystem();
    }
}

new App();