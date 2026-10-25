import { Canvas } from '@napi-rs/canvas';
import gifenc, { Palette } from 'gifenc';

import { ImageFormat } from '../avatar/avatarRequest';

/** A gif pixel is drawn or not: anything at least half opaque is drawn. */
const GIF_ALPHA_THRESHOLD = 128;

/** A gif has 256 palette entries; the first is the transparent one. */
const GIF_COLORS = 255;

/** `GIF disposal 2`: a frame's transparent pixels show the background, not the frame before. */
const DISPOSE_TO_BACKGROUND = 2;

export const CONTENT_TYPES: Record<ImageFormat, string> = {
    png: 'image/png',
    gif: 'image/gif',
};

/**
 * The frames as one image file. A png is the first frame, with its alpha; a gif is every frame,
 * looping, `frameDelay` ms apart.
 *
 * A gif's palette is the frames' own colours when they fit in one - an avatar's or a badge's
 * pixel art nearly always does, so it is written exactly - and quantized only when they don't.
 * Its transparency is one bit, as Habbo's own gifs are.
 */
export const encodeImage = async (frames: Canvas[], format: ImageFormat, frameDelay: number = 0): Promise<Buffer> => {
    if (!frames.length) throw new Error('No frames to encode');

    if (format === 'png') return frames[0].encode('png');

    const { width, height } = frames[0];
    const pixels = frames.map(frame => clampAlpha(frame.getContext('2d').getImageData(0, 0, width, height).data));
    const palette = exactPalette(pixels) ?? quantizedPalette(pixels);
    const encoder = gifenc.GIFEncoder();

    pixels.forEach((rgba, i) => encoder.writeFrame(indexPixels(rgba, palette), width, height, {
        palette: palette.colors,
        transparent: true,
        transparentIndex: 0,
        delay: frameDelay,
        repeat: (i === 0) ? 0 : undefined,
        dispose: (frames.length > 1) ? DISPOSE_TO_BACKGROUND : undefined,
    }));

    encoder.finish();

    return Buffer.from(encoder.bytes());
};

interface IndexedPalette {
    colors: Palette;
    /** The palette index of an opaque `0xRRGGBB`. */
    indexOf: (rgb: number) => number;
}

/** Every pixel fully opaque or fully transparent (and black), as a gif will show it. */
const clampAlpha = (data: Uint8ClampedArray): Uint8ClampedArray => {
    const out = new Uint8ClampedArray(data);

    for (let i = 0; i < out.length; i += 4) {
        if (out[i + 3] >= GIF_ALPHA_THRESHOLD) {
            out[i + 3] = 255;
        } else {
            out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
        }
    }

    return out;
};

/** The frames' own colours, when there are few enough for one palette. */
const exactPalette = (frames: Uint8ClampedArray[]): IndexedPalette | undefined => {
    const indices = new Map<number, number>();
    const colors: Palette = [ [ 0, 0, 0 ] ];

    for (const data of frames) {
        for (let i = 0; i < data.length; i += 4) {
            if (!data[i + 3]) continue;

            const rgb = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];

            if (indices.has(rgb)) continue;
            if (indices.size === GIF_COLORS) return undefined;

            indices.set(rgb, colors.length);
            colors.push([ data[i], data[i + 1], data[i + 2] ]);
        }
    }

    return { colors, indexOf: rgb => indices.get(rgb) ?? 0 };
};

/** A palette quantized from every frame's opaque pixels, for frames with too many colours for one. */
const quantizedPalette = (frames: Uint8ClampedArray[]): IndexedPalette => {
    const opaque: number[] = [];

    for (const data of frames) {
        for (let i = 0; i < data.length; i += 4) if (data[i + 3]) opaque.push(data[i], data[i + 1], data[i + 2], 255);
    }

    const quantized = gifenc.quantize(new Uint8Array(opaque), GIF_COLORS, { format: 'rgb565' });
    const colors: Palette = [ [ 0, 0, 0 ], ...quantized.map(color => color.slice(0, 3)) ];
    const nearest = new Map<number, number>();

    const indexOf = (rgb: number): number => {
        let index = nearest.get(rgb);

        if (index === undefined) {
            const r = (rgb >> 16) & 0xff, g = (rgb >> 8) & 0xff, b = rgb & 0xff;
            let best = Infinity;

            for (let i = 1; i < colors.length; i++) {
                const [ pr, pg, pb ] = colors[i];
                const distance = ((pr - r) ** 2) + ((pg - g) ** 2) + ((pb - b) ** 2);

                if (distance < best) {
                    best = distance;
                    index = i;
                }
            }

            nearest.set(rgb, index ?? 1);
        }

        return index ?? 1;
    };

    return { colors, indexOf };
};

const indexPixels = (data: Uint8ClampedArray, palette: IndexedPalette): Uint8Array => {
    const index = new Uint8Array(data.length / 4);

    for (let i = 0, p = 0; i < data.length; i += 4, p++) {
        index[p] = data[i + 3] ? palette.indexOf((data[i] << 16) | (data[i + 1] << 8) | data[i + 2]) : 0;
    }

    return index;
};
