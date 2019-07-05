import { context } from "./context";

export function init() {
    return Promise.resolve()
    .then(() => {
        return context.init();
    });
}