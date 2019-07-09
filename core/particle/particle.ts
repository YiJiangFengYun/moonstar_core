import * as common from "../common";

export interface Particle {
    /**
     * The position of the Particle
     */
    pos?: common.Vector;

    /**
     * The scale of the Particle
     */
    scale?: common.Vector;

    /**
     * The orientation of the Particle.
     * It is specify the orientation of the x-axis of the Particle relative to its emitter space.
     * (Radian)
     */
    orientation: number;
    
    /**
     * The color of the Particle used by Sprite and so on.
     */
    color?: common.Color;

    /**
     * The size of the Particle used by Sprite and so on.
     */
    size?: common.Vector;

    /**
     * The rotation of the particle used by Sprite and so on.
     * (Radian)
     */
    rotation?: number;
}