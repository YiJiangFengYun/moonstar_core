import { context } from "./context";

export function init(canvas: HTMLCanvasElement) {
    return Promise.resolve()
    .then(() => {
        return context.init(canvas);
    });
}