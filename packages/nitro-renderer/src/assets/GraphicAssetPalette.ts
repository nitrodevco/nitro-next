import { IGraphicAssetPalette } from '@nitrodevco/nitro-api';
import { Sprite, Texture, TextureSource } from 'pixi.js';

import { TextureUtils } from '../utils';

/** Port of Flash `GraphicAssetPalette`. */
export class GraphicAssetPalette implements IGraphicAssetPalette {
    private _palette: [number, number, number][];
    private _primaryColor: number;
    private _secondaryColor: number;

    constructor(palette: [number, number, number][], primaryColor: number, secondaryColor: number) {
        this._palette = palette;

        while (this._palette.length < 256) this._palette.push([ 0, 0, 0 ]);

        this._primaryColor = primaryColor;
        this._secondaryColor = secondaryColor;
    }

    /**
     * Flash `GraphicAssetPalette.colorizeBitmap`: each pixel's green channel picks its colour.
     *
     * The asset is a frame of a sheet that lives only on the GPU (its bitmap is closed once uploaded,
     * `TextureUtils.makeGpuResident`), so its pixels are read back by drawing it: extracting the
     * texture itself would hand back the whole sheet - and on WebGPU as a canvas with no 2D context,
     * which left every palette drawing the unpaletted art. The sprite drawn is destroyed after: a
     * drawn container keeps a render group, and the renderer its batchers, until it is destroyed.
     */
    public applyPalette(texture: Texture): Texture {
        const sprite = new Sprite(texture);
        const { pixels, width, height } = TextureUtils.getPixels({ target: sprite, resolution: 1, antialias: false });

        sprite.destroy();

        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        if (!ctx) return texture;

        const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            let paletteColor = this._palette[imageData.data[i + 1]];

            if (paletteColor === undefined) paletteColor = [ 0, 0, 0 ];

            imageData.data[i] = paletteColor[0];
            imageData.data[i + 1] = paletteColor[1];
            imageData.data[i + 2] = paletteColor[2];
        }

        ctx.putImageData(imageData, 0, 0);

        const newTexture = Texture.from(canvas);

        // the RGBA `ExtendedSprite.readFrameAlpha` hit-tests against: this canvas has no alpha to read back
        (newTexture.source as TextureSource & { hitMap?: Uint8ClampedArray }).hitMap = imageData.data;

        return newTexture;
    }

    public get primaryColor(): number {
        return this._primaryColor;
    }

    public get secondaryColor(): number {
        return this._secondaryColor;
    }
}
