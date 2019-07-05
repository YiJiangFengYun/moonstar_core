import * as core from "../core";
export declare const shaderLibs: {
    vert: string;
    frag: string;
}[];
/**
 * A material class is for a material state of a emiter of the core
 */
export declare class Material {
    matCore: core.Material;
    shaderProgram: WebGLProgram;
    locations: {
        aVertexPos?: number;
        avertexUV?: number;
        aVertexColor?: number;
        uModelViewMatrix?: WebGLUniformLocation;
        uEmitterModelMatrix?: WebGLUniformLocation;
    };
    constructor();
    init(matCore: core.Material): void;
    private _initShaderProgram;
    private _loadShader;
}
