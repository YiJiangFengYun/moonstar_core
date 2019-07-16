export declare class Texture {
    glTexture: WebGLTexture;
    constructor();
    init(info: {
        url?: string;
    }): void;
    private _createTexture;
    private _loadTexture;
}
