import { Vector } from "../common/vector";
import { Color } from "../common/color";

export interface Particle {
    /**
     * The position of the Particle
     */
    pos?: Vector;
    
    /**
     * The color of the Particle
     */
    color?: Color;

    /**
     * The size of the Particle.
     */
    size?: Vector;

    /**
     * The angle of the particle.
     */
    angle?: number;
}