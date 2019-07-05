export const context: {
    gl: WebGLRenderingContext;
    init(): Promise<void>;
} = {
    gl: null,
    init: function() {
        return Promise.resolve()
        .then(() => {
            if (! document) {
                return Promise.reject(new Error("Unable to initialize WebGL, the document is invalid."));
            }
            const canvas: HTMLCanvasElement = document.querySelector("#glCanvas");
            if (! canvas) {
                return Promise.reject(new Error(`Unable to initialize WebGL, 
                the canvas with id ${"#glCanvas"} is invalid.`));
            }
            // Initialize the GL context
            const gl = canvas.getContext("webgl");
            // Only continue if WebGL is available and working
            if (gl === null) {
                return Promise.reject("Unable to initialize WebGL. Your browser or machine may not support it.");
            }
            this.gl = gl;
            return Promise.resolve();
        });
    }
}