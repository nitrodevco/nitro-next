import { IGraphicAssetPalette } from '@nitrodevco/nitro-api';
import { Sprite, Texture, TextureSource } from 'pixi.js';

import { isCpuReadable, TextureUtils } from '../utils';

/** A texture's pixels as `applyPalette` colours them: RGBA, row by row. */
interface PalettePixels {
    pixels: Uint8ClampedArray<ArrayBuffer>;
    width: number;
    height: number;
}

const BLACK: [number, number, number] = [ 0, 0, 0 ];

/** Port of Flash `GraphicAssetPalette`. */
export class GraphicAssetPalette implements IGraphicAssetPalette {
    /** The 2D canvas frames are copied on (`readFramePixels`): made on first use, kept for the next. */
    private static _scratch: CanvasRenderingContext2D | null | undefined = undefined;

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
     * The frame's pixels are copied from the decoded sheet on a 2D canvas (`readFramePixels`), with
     * no GPU readback: reading a frame back from the GPU waited for it to finish, a stall each time a
     * pet first showed a frame in a palette. Only a frame whose pixels are not on the CPU any more,
     * or that drawing would resample, is drawn and read back (`readRenderedPixels`).
     */
    public applyPalette(texture: Texture): Texture {
        const { pixels, width, height } = GraphicAssetPalette.readFramePixels(texture) ?? GraphicAssetPalette.readRenderedPixels(texture);

        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        if (!ctx) return texture;

        const imageData = new ImageData(this.colorize(pixels), width, height);

        ctx.putImageData(imageData, 0, 0);

        const newTexture = Texture.from(canvas);

        // the RGBA `ExtendedSprite.readFrameAlpha` hit-tests against: this canvas has no alpha to read back
        (newTexture.source as TextureSource & { hitMap?: Uint8ClampedArray }).hitMap = imageData.data;

        return newTexture;
    }

    /**
     * `colorizeBitmap`'s `paletteMap` (green picks the RGB) and `copyChannel` of the alpha it kept,
     * in place.
     */
    private colorize(rgba: Uint8ClampedArray<ArrayBuffer>): Uint8ClampedArray<ArrayBuffer> {
        for (let i = 0; i < rgba.length; i += 4) {
            const paletteColor = this._palette[rgba[i + 1]] ?? BLACK;

            rgba[i] = paletteColor[0];
            rgba[i + 1] = paletteColor[1];
            rgba[i + 2] = paletteColor[2];
        }

        return rgba;
    }

    /**
     * The texture as `readRenderedPixels` draws it - `orig` in size, the frame at its trim offset -
     * copied from the decoded image on a 2D canvas, so nothing waits for the GPU. Nothing when the
     * image is not on the CPU (a sheet whose bitmap was closed once uploaded,
     * `TextureUtils.makeGpuResident`) or when drawing would resample the frame: rotated, scaled, off
     * the pixel grid, or a source at another resolution than the 1 the frame is drawn at.
     */
    private static readFramePixels(texture: Texture): PalettePixels | undefined {
        const source = texture.source;
        const resource = source?.resource;

        if (!source || texture.rotate || (source.resolution !== 1) || !isCpuReadable(resource)) return undefined;

        const { frame, orig, trim } = texture;
        const left = trim ? trim.x : 0;
        const top = trim ? trim.y : 0;

        // A sprite draws the frame over the trim, or over `orig` when there is none: 1:1 only when they are its size.
        if ((frame.width !== (trim ? trim.width : orig.width)) || (frame.height !== (trim ? trim.height : orig.height))) return undefined;

        if (![ frame.x, frame.y, frame.width, frame.height, left, top ].every(Number.isInteger)) return undefined;

        if ((frame.x < 0) || (frame.y < 0) || ((frame.x + frame.width) > source.pixelWidth) || ((frame.y + frame.height) > source.pixelHeight)) return undefined;

        // `GenerateTextureSystem`'s size for the sprite's bounds, which are `orig`.
        const width = Math.max(orig.width, 1) | 0;
        const height = Math.max(orig.height, 1) | 0;
        // The part of the frame inside them.
        const x0 = Math.max(left, 0);
        const y0 = Math.max(top, 0);
        const copyWidth = Math.min(left + frame.width, width) - x0;
        const copyHeight = Math.min(top + frame.height, height) - y0;

        if ((copyWidth <= 0) || (copyHeight <= 0)) return { pixels: new Uint8ClampedArray(width * height * 4), width, height };

        const ctx = GraphicAssetPalette.scratchContext(copyWidth, copyHeight);

        if (!ctx) return undefined;

        let read: Uint8ClampedArray<ArrayBuffer>;

        try {
            ctx.drawImage(resource, frame.x + x0 - left, frame.y + y0 - top, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);

            read = ctx.getImageData(0, 0, copyWidth, copyHeight).data;
        } catch {
            // A cross-origin image taints the canvas: draw it on the GPU instead.
            return undefined;
        }

        if ((copyWidth === width) && (copyHeight === height)) return { pixels: read, width, height };

        const pixels = new Uint8ClampedArray(width * height * 4);

        for (let row = 0; row < copyHeight; row++) pixels.set(read.subarray(row * copyWidth * 4, (row + 1) * copyWidth * 4), (((y0 + row) * width) + x0) * 4);

        return { pixels, width, height };
    }

    /**
     * The texture drawn and read back from the GPU, for a frame `readFramePixels` cannot copy. The
     * frame lives in a sheet that may be only on the GPU, so it is drawn: extracting the texture
     * itself would hand back the whole sheet - and on WebGPU as a canvas with no 2D context, which
     * left every palette drawing the unpaletted art. The sprite drawn is destroyed after: a drawn
     * container keeps a render group, and the renderer its batchers, until it is destroyed.
     */
    private static readRenderedPixels(texture: Texture): PalettePixels {
        const sprite = new Sprite(texture);
        const { pixels, width, height } = TextureUtils.getPixels({ target: sprite, resolution: 1, antialias: false });

        sprite.destroy();

        return { pixels: new Uint8ClampedArray(pixels), width, height };
    }

    /** The scratch canvas, `width` x `height` and clear, read often (a CPU canvas, so its reads wait on no GPU). */
    private static scratchContext(width: number, height: number): CanvasRenderingContext2D | undefined {
        if (GraphicAssetPalette._scratch === undefined) GraphicAssetPalette._scratch = document.createElement('canvas').getContext('2d', { willReadFrequently: true });

        const ctx = GraphicAssetPalette._scratch;

        if (!ctx) return undefined;

        if ((ctx.canvas.width !== width) || (ctx.canvas.height !== height)) {
            ctx.canvas.width = width;
            ctx.canvas.height = height;
        } else {
            ctx.clearRect(0, 0, width, height);
        }

        // Reset with the canvas size; a 1:1 copy on whole pixels is exact either way.
        ctx.imageSmoothingEnabled = false;

        return ctx;
    }

    public get primaryColor(): number {
        return this._primaryColor;
    }

    public get secondaryColor(): number {
        return this._secondaryColor;
    }
}
