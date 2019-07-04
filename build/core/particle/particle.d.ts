import * as common from "../common";
export interface Particle {
    /**
     * The position of the Particle
     */
    pos?: common.Vector;
    /**
     * The color of the Particle
     */
    color?: common.Color;
    /**
     * The size of the Particle.
     */
    size?: common.Vector;
    /**
     * The angle of the particle.
     */
    angle?: number;
}
