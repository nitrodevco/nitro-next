import type { IGraphicAssetPalette } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { GetRenderer } from '../utils';

export class GraphicAssetPalette implements IGraphicAssetPalette {
    private _palette: [number, number, number][];
    private _primaryColor: number;
    private _secondaryColor: number;

    constructor(palette: [number, number, number][], primaryColor: number, secondaryColor: number) {
        this._palette = palette;

        while (this._palette.length < 256) this._palette.push([0, 0, 0]);

        this._primaryColor = primaryColor;
        this._secondaryColor = secondaryColor;
    }

    public applyPalette(texture: Texture): Texture {
        const canvas = GetRenderer().texture.generateCanvas(texture);
        const ctx = canvas.getContext('2d');

        if (!ctx) return texture;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            let paletteColor = this._palette[imageData.data[i + 1]];

            if (paletteColor === undefined) paletteColor = [0, 0, 0];

            imageData.data[i] = paletteColor[0];
            imageData.data[i + 1] = paletteColor[1];
            imageData.data[i + 2] = paletteColor[2];
        }

        ctx.putImageData(imageData, 0, 0);

        const newTexture = Texture.from(canvas);

        //@ts-expect-error - Pixi doesn't officially support hitmaps on textures, but it works regardless
        newTexture.source.hitMap = imageData.data;

        return newTexture;
    }

    public get primaryColor(): number {
        return this._primaryColor;
    }

    public get secondaryColor(): number {
        return this._secondaryColor;
    }
}
