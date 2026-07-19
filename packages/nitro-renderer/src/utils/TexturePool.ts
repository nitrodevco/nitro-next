import { NitroLogger } from "@nitrodevco/nitro-api";
import { RenderTexture } from "pixi.js";

import { ExtendedSprite } from "./ExtendedSprite";
import { GetTicker } from "./GetTicker";

export class TexturePool {
    private static _texturePool: Record<number, Record<number, RenderTexture[]>> = {};
    private static _totalTextures: number = 0;
    private static _runCount: number = 0;
    private static _maxIdle: number = 3600;
    private static _checkInterval: number = 600;
    private static _framesSinceCheck: number = 0;
    private static _tickerFn: (() => void) | null = null;

    public static startAutoCleanup(): void {
        if (this._tickerFn) return;

        this._tickerFn = () => {
            this._framesSinceCheck++;

            if (this._framesSinceCheck >= this._checkInterval) {
                this._framesSinceCheck = 0;
                this.cleanUpTextures();
            }
        };

        GetTicker().add(this._tickerFn);
    }

    public static stopAutoCleanup(): void {
        if (!this._tickerFn) return;

        GetTicker().remove(this._tickerFn);
        this._tickerFn = null;
    }

    public static createRenderTexture(width: number, height: number): RenderTexture | undefined {
        if (!this._texturePool[width]) this._texturePool[width] = {};

        if (!this._texturePool[width][height]) this._texturePool[width][height] = [];

        if (this._texturePool[width][height].length > 0) {
            const texture = this._texturePool[width][height].shift();

            if (texture) {
                this._totalTextures--;

                return texture;
            }
        }

        return RenderTexture.create({ width, height });
    }

    public static releaseTexture(texture: RenderTexture): void {
        const width = texture.width;
        const height = texture.height;

        if (!this._texturePool[width]) this._texturePool[width] = {};

        if (!this._texturePool[width][height]) this._texturePool[width][height] = [];

        texture.source.label = '';

        (texture.source as unknown as { _touched: number })._touched = this._runCount;

        ExtendedSprite.removeHitmap(texture.source);

        this._texturePool[width][height].push(texture);

        this._totalTextures++;
    }

    public static cleanUpTextures(): void {
        this._runCount++;

        if (!this._totalTextures) return;

        for (const width in this._texturePool) {
            for (const height in this._texturePool[width]) {
                const textures = this._texturePool[width][height];

                for (let i = textures.length - 1; i >= 0; i--) {
                    const texture = textures[i];
                    const source = texture.source;
                    const touchCount = (source as unknown as { _touched: number })._touched;

                    if ((touchCount > -1) && (this._runCount - touchCount) > this._maxIdle) {
                        textures.splice(i, 1);

                        ExtendedSprite.removeHitmap(source);

                        if (!texture.destroyed) texture.destroy();

                        if (!source.destroyed) source.destroy();

                        this._totalTextures--;

                        NitroLogger.log(`[TexturePool] Destroyed idle texture: ${width}x${height}`);
                    }
                }

                if (textures.length === 0) delete this._texturePool[width][height];
            }

            if (Object.keys(this._texturePool[width]).length === 0) delete this._texturePool[width];
        }
    }
}