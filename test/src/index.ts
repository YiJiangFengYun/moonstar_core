import * as renderMod from "../../renderer";
import * as core from "../../core";
import * as sampleSpriteSheetSimple from "./sample_spritesheet_simple";
import * as sampleRadiantStars from "./sample_radiant_stars";
import * as sampleSubplayers from "./sample_subplayers";
import * as sampleSizeInitialRandom from "./sample_size_initial_random";
import * as sampleCircleBorder from "./sample_circle_border";
import { stats } from "../../renderer/stat";

const tests: { name: string; info: core.ParticleSystemInfo }[] = [
    { name: sampleRadiantStars.name, info: sampleRadiantStars.psInfo },
    { name: sampleSpriteSheetSimple.name, info: sampleSpriteSheetSimple.psInfo },
    { name: sampleSubplayers.name, info: sampleSubplayers.psInfo },
    { name: sampleSizeInitialRandom.name, info: sampleSizeInitialRandom.psInfo },
    { name: sampleCircleBorder.name, info: sampleCircleBorder.psInfo },
];

const FRAME_INTERVAL = 20;

class App {
    private _intervalI: number;
    private _lastTime: number;
    private _renderer: renderMod.Renderer;
    private _particleSystem: renderMod.ParticleSystem;
    // private _stats: stats;
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
                    },
                    frameRate: 1000 / FRAME_INTERVAL,
                });
            })
            .then((renderer) => {
                context._renderer = renderer;
            })
            .then(() => {
                context._intervalI = window.setInterval(context._update.bind(context), FRAME_INTERVAL);
                context._lastTime = new Date().getTime();
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
                context._initPlayerBtns();
            });
    }

    private _initPlayerBtns() {
        let stopBtnElement = document.getElementById("stopbtn");
        let playBtnElement = document.getElementById("playbtn");
        let pauseBtnElement = document.getElementById("pausebtn");
        stopBtnElement.onclick = this._onClickStop.bind(this);
        playBtnElement.onclick = this._onClickPlay.bind(this);
        pauseBtnElement.onclick = this._onClickPause.bind(this);
        this._updatePlayerBtns();
    }

    private _update() {
        this._renderer.begin();
        let now = new Date().getTime();
        let dt = now - this._lastTime;
        this._lastTime = now;

        dt = Math.min(dt, FRAME_INTERVAL);
        this._renderer.update(dt / 1000);

        this._preRender();

        this._renderer.render();

        this._postRender();
        this._renderer.end();
        this._updateStats();
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

    private _updatePlayerBtns() {
        let ps = this._particleSystem;
        if (ps) {
            let stopBtnElement = document.getElementById("stopbtn");
            let playBtnElement = document.getElementById("playbtn");
            let pauseBtnElement = document.getElementById("pausebtn");
            stopBtnElement.hidden = false;
            if (ps.isPlay) {
                playBtnElement.hidden = true;
                pauseBtnElement.hidden = false;
            } else {
                playBtnElement.hidden = false;
                pauseBtnElement.hidden = true;
            }
        } else {
            let elements = document.getElementsByClassName("playerbtns");
            let len = elements.length;
            for (let i = 0; i < len; ++i) {
                (elements[i] as HTMLElement).hidden = true;
            }
        }
    }

    private _updateStats() {
        let ss = stats;
        let drawcallElement = document.getElementById("drawcall");
        drawcallElement.innerText = `draw call: ${ss.drawCall.toString()}` ;
        let costTimeElement = document.getElementById("frame_cost_time");
        costTimeElement.innerText = `cost time: ${ss.costTime.toString()}ms`;
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

    private _onClickStop() {
        let ps = this._particleSystem;
        if (ps) {
            ps.stop();
            this._updatePlayerBtns();
        }
    }

    private _onClickPlay() {
        let ps = this._particleSystem;
        if (ps && ! ps.isPlay) {
            ps.play();
            this._updatePlayerBtns();
        }
    } 

    private _onClickPause() {
        let ps = this._particleSystem;
        if (ps && ps.isPlay) {
            ps.pause();
            this._updatePlayerBtns();
        }
    }
}

new App();