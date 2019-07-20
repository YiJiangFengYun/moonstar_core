import * as emitterPlayer from "../emitter_player";

export interface ModulePartConstructor<T extends ModulePart> {
    new (player: emitterPlayer.EmitterPlayer): T;
}

export interface ModulePart {
    init(info: any):void;
    ready():void;
    reset():void;
}

export function createModulePart<T extends ModulePart>(ctor: ModulePartConstructor<T>, player: emitterPlayer.EmitterPlayer): T {
    return new ctor(player);
}