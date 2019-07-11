import * as common from "../common";

export interface Particle {
    /**
     * The position of the Particle relative to its emitter space.
     */
    pos?: common.Vector;

    /**
     * The scale of the Particle used by Sprite and so on.
     */
    scale?: common.Vector;

    /**
     * The rotation of the particle used by Sprite and so on.
     * (Radian)
     */
    rotation?: number;
    
    /**
     * The color of the Particle used by Sprite and so on.
     */
    color?: common.Color;

    /**
     * The size of the Particle used by Sprite and so on.
     */
    size?: common.Vector;

    /**
     * The orientation of the Particle.
     * It is specify the orientation of the x-axis of the Particle relative to its emitter space.
     * (Radian)
     */
    orientation?: number;

    /**
     * The sub uv of the texture of the Particle for animated sprite sheets to be displayed on a particle.
     * First two value is left-top of the texture and last two is right-bottom of the texture.
     */
    subUV?: common.Vector4;
}