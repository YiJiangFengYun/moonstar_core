import * as renderMod from "../../renderer";
import * as core from "../../core";
import * as sampleSpriteSheetSimple from "./sample_spritesheet_simple";
import * as sampleRadiantStars from "./sample_radiant_stars";
import * as sampleSubplayers from "./sample_subplayers";
import * as sampleSizeInitialRandom from "./sample_size_initial_random";
import * as sampleCircleBorder from "./sample_circle_border";
import * as sampleLocationRectangle from "./sample_location_rectangle";
import * as sampleSizeOverLife from "./sample_size_over_life";
import * as sampleColorInitial from "./sample_color_initial";
import * as sampleColorInitialRandom from "./sample_color_initial_random";
import * as sampleLifeRandom from "./sample_life_random";
import * as smapleVelocityRandom from "./sample_velocity_random";
import * as sampleRotation from "./sample_rotation";
import * as sampleRotationRandom from "./sample_rotation_random";
import * as sampleRibbon from "./sample_ribbon";
import { stats } from "../../renderer/stat";
import { renderData } from "../../renderer/render_data";

const tests: { name: string; info: core.ParticleSystemInfo; moveable?: boolean }[] = [
    { name: sampleRadiantStars.name, info: sampleRadiantStars.psInfo },
    { name: sampleSpriteSheetSimple.name, info: sampleSpriteSheetSimple.psInfo },
    { name: sampleSubplayers.name, info: sampleSubplayers.psInfo },
    { name: sampleSizeInitialRandom.name, info: sampleSizeInitialRandom.psInfo },
    { name: sampleCircleBorder.name, info: sampleCircleBorder.psInfo },
    { name: sampleLocationRectangle.name, info: sampleLocationRectangle.psInfo },
    { name: sampleSizeOverLife.name, info: sampleSizeOverLife.psInfo },
    { name: sampleColorInitial.name, info: sampleColorInitial.psInfo },
    { name: sampleColorInitialRandom.name, info: sampleColorInitialRandom.psInfo },
    { name: sampleLifeRandom.name, info: sampleLifeRandom.psInfo },
    { name: smapleVelocityRandom.name, info: smapleVelocityRandom.psInfo },
    { name: sampleRotation.name, info: sampleRotation.psInfo },
    { name: sampleRotationRandom.name, info: sampleRotationRandom.psInfo },
    { name: sampleRibbon.name, info: sampleRibbon.psInfo, moveable: true },
];

const FRAME_INTERVAL = 20;

class App {
    private _canvas: HTMLCanvasElement;
    private _width: number;
    private _height: number;
    private _intervalI: number;
    private _lastTime: number;
    private _renderer: renderMod.Renderer;
    private _particleSystem: renderMod.ParticleSystem;
    // private _stats: stats;
    private _selectedIndex = 0;
    private _mousePressed: boolean;
    private _moveable: boolean;
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
                let canvas = this._canvas = document.getElementById("glCanvas") as HTMLCanvasElement;
                let width = canvas.scrollWidth;
                let height = canvas.scrollHeight;
                canvas.width = width;
                canvas.height = height;
                this._width = width;
                this._height = height;
            })
            .then(() => {
                let canvas = context._canvas;
                let width = this._width;
                let height = this._height;
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
                context._initSelectOptions();
                context._initSecondaryInteraction();
            })
            .then(() => {
                context._updateParticleSystem();
                context._initPlayerBtns();
            })
            .then(() => {
                context._initMouseEventHandlers();
            });
    }

    private _initSelectOptions() {
        let selectElement = document.getElementById("select");
        tests.forEach(test => {
            let newElement = document.createElement("option");
            newElement.innerText = test.name;
            selectElement.appendChild(newElement);
        });
        selectElement.addEventListener("change", this._onChangeSelect.bind(this));
    }

    private _initSecondaryInteraction() {
        let checkShowBoundsElement = document.getElementById("checkShowBounds");
        checkShowBoundsElement.addEventListener("change", this._onChangeShowBounds.bind(this));
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

    private _initMouseEventHandlers() {
        let canvas = this._canvas;
        canvas.addEventListener("mousedown", this._onMouseDown.bind(this));
        canvas.addEventListener("mousemove", this._onMouseMove.bind(this));
        canvas.addEventListener("mouseup", this._onMouseUp.bind(this));
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
        this._moveable = tests[this._selectedIndex].moveable || false;
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

    /**
     * Get coordinate from local (DOM content) coordinates.
     */
    private _getCoordinate(clientX: number, clientY: number) {
        return core.Vector.fromValues(clientX - this._width / 2, - clientY + this._height / 2 );
    }

    private _onChangeSelect() {
        let selectElement: HTMLSelectElement = document.getElementById("select") as HTMLSelectElement;
        let name = selectElement.value;
        this._selectedIndex = tests.findIndex((value) => {
            if (value.name === name) return true;
            else return false;
        });
        this._updateParticleSystem();
        this._updatePlayerBtns();
    }

    private _onChangeShowBounds(e: Event) {
        let checkShowBoundsElement: HTMLInputElement = e.target as HTMLInputElement;
        renderData.showBounds = checkShowBoundsElement.checked;
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

    private _onMouseDown(e: MouseEvent) {
        this._mousePressed = true;
        if (this._moveable) {
            let pos = this._getCoordinate(e.clientX, e.clientY);
            this._particleSystem.changePos(pos);
        }
    }

    private _onMouseMove(e: MouseEvent) {
        if (this._mousePressed && this._moveable) {
            let pos = this._getCoordinate(e.clientX, e.clientY);
            this._particleSystem.changePos(pos);
        }
    }

    private _onMouseUp() {
        this._mousePressed = false;
    }
}

new App();