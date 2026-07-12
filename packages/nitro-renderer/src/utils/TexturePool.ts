import { RenderTexture } from "pixi.js";

export class TexturePool {
    private static _texturePool: Map<string, RenderTexture> = new Map();

    public static createRenderTexture(width: number, height: number): RenderTexture | undefined {
        const key = `${width}x${height}`;

        if (this._texturePool.has(key)) {
            const texture = this._texturePool.get(key);

            this._texturePool.delete(key);

            return texture
        }

        return RenderTexture.create({ width, height });
    }

    public static releaseTexture(texture: RenderTexture): void {
        this._texturePool.set(`${texture.width}x${texture.height}`, texture);
    }
}