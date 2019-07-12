export interface Stats {
    /**
     * The average count of draw call of a frame.
     */
    drawCall: number;
    /**
     * The average cost time of a frame.
     */
    costTime: number;
    drawCallBuffer: number[];
    drawCallBufferIndex: number;
    costTimeBuffer: number[];
    costTimeBufferIndex: number;
    /**
     * The count of draw call of a frame.
     */
    drawCallFrame: number;
    /**
     * The cost time of a frame.
     */
    costTimeFrame: number;
    /**
     * The begin time of a frame.
     */
    beginTime: number;
    init(frameRate: number): void;
    /**
     * Calling this function means a frame begin.
     * It will clear all statistics of a frame for a new begin.
     */
    begin(): void;
    /**
     * Calling this function means a frame end.
     * It will caculate the cost time of a frame.
     * It will use the statistics of a frame to cacluate the relevant avarage result.
     */
    end(): void;
    /**
     * When renderer call WebGL draw, it call this function to add a draw call to the count of draw call.
     */
    addDrawCall(): void;
}
export declare const stats: Stats;
