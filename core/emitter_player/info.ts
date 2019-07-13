export interface EmitterPlayerInfo {
    maxParticleCount?: number;
    /**
     * Bounds local
     * First two value is minX and minY
     * Last two value is maxX and MaxY
     */
    bounds?: [number, number, number, number];
}