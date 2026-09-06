import { ImageLike, Texture } from 'pixi.js';

export interface IGetImageListener {
    imageReady(result: ImageLike): void;
    imageFailed(): void;
    /**
     * Preferred over `imageReady` when implemented: the render as a texture (a Pixi consumer
     * draws it directly, no GPU read-back into a base64 `<img>`). The listener owns the
     * texture and must destroy it.
     */
    textureReady?(texture: Texture): void;
}
