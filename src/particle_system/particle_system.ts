import * as log from "loglevel";
import { SpaceID } from "../common/space_type";
import { PSComponent, PSRenderComponent } from "./component";
import { Emitter2D, Emitter3D, Emitter } from "../emitter/emitter";
import { DrawData } from "../render/draw_data";
import { Player } from "../common/player";

export interface ParticleSystem {
    space: SpaceID;
    drawData: DrawData;
    components: PSComponent[];
    emitters: Emitter[];
    renderComponent: PSRenderComponent;

    update(dt: number):void;
    render(): void;
}

export class ParticleSystem2D extends Player implements ParticleSystem {
    public space: SpaceID = SpaceID.SPACE_2D;
    public drawData: DrawData = new DrawData(this.space);
    public components: PSComponent[] = [];
    public emitters: Emitter2D[] = [];
    public renderComponent: PSRenderComponent;
    
    public constructor() {
        super();
    }

    public update(dt: number):void {

    }

    public render(): void {
        if (this.renderComponent) {
            this.renderComponent.render();
        } else {
            log.warn("The particle system don't own a render component.");
            
        }
    }

    // public _createEmitter() {
    //     let emitter = new Emitter2D();
    //     emitter.
    // }
}


export class ParticleSystem3D extends Player implements ParticleSystem {
    public space: SpaceID = SpaceID.SPACE_3D;
    public drawData: DrawData = new DrawData(this.space);
    public components: PSComponent[] = [];
    public emitters: Emitter3D[] = [];
    public renderComponent: PSRenderComponent;

    public constructor() {
        super();
    }

    public update(dt: number):void {

    }

    public render(): void {
        if (this.renderComponent) {
            this.renderComponent.render();
        } else {
            log.warn("The particle system don't own a render component.");
            
        }
    }
}