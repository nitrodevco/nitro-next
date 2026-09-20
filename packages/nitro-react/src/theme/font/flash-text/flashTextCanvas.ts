/**
 * A rendered text block as a canvas - what both render targets show: Pixi as a texture, the DOM
 * by drawing it onto its own `<canvas>`. A drop shadow is the same block rendered once more in
 * the shadow's colour and composited underneath, so the two targets bake identical pixels.
 */
import { FlashTextBlock, FlashTextBlockOptions, FlashTextRun, renderTextBlock } from './flashTextBlock';
import { FlashTextFormat, normalizeFlashTextFormat } from './flashTextFormat';
import { FlashTextRenderer } from './FlashTextRenderer';

export interface FlashTextShadow {
    /** `0xRRGGBB`. */
    color: number;
    alpha: number;
    offsetX: number;
    offsetY: number;
}

export interface FlashTextCanvasOptions extends FlashTextBlockOptions {
    shadow?: FlashTextShadow;
}

export interface FlashTextCanvas {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    /** The laid-out text's own extent - Flash's `TextField.textWidth` / `textHeight`. */
    textWidth: number;
    textHeight: number;
    lineHeight: number;
    baseline: number;
    gutter: number;
}

const toShadowFormat = (format: FlashTextFormat, color: number): FlashTextFormat => ({ ...format, color, colorTransform: null, etchingColor: null, etchingPosition: null });

/** Premultiplied `source`, scaled by `alpha`, under whatever `destination` already holds. */
const compositeUnder = (source: FlashTextBlock, alpha: number, offsetX: number, offsetY: number, destination: Uint8ClampedArray, destinationWidth: number, destinationHeight: number): void => {
    for (let sourceY = 0; sourceY < source.height; sourceY++) {
        const destinationY = sourceY + offsetY;

        if (destinationY < 0 || destinationY >= destinationHeight) continue;

        for (let sourceX = 0; sourceX < source.width; sourceX++) {
            const destinationX = sourceX + offsetX;

            if (destinationX < 0 || destinationX >= destinationWidth) continue;

            const sourceOffset = (sourceY * source.width + sourceX) * 4;

            if (source.pixels[sourceOffset + 3] === 0) continue;

            const destinationOffset = (destinationY * destinationWidth + destinationX) * 4;
            const remaining = 1 - destination[destinationOffset + 3] / 255;

            for (let channel = 0; channel < 4; channel++) destination[destinationOffset + channel] += source.pixels[sourceOffset + channel] * alpha * remaining;
        }
    }
};

/**
 * Renders plain text or rich-text runs onto a fresh canvas. Returns `null` when the exact
 * renderer cannot take the text; the caller falls back to the browser's own text.
 */
export const renderFlashTextCanvas = (content: string | readonly FlashTextRun[], format: Partial<FlashTextFormat> | null | undefined, options: FlashTextCanvasOptions = {}): FlashTextCanvas | null => {
    const blockFormat = normalizeFlashTextFormat(format);
    const block = renderTextBlock(content, blockFormat, options);

    if (!block) return null;

    const shadow = options.shadow;
    // The gutter already leaves room for a shadow of up to its own size; a longer one widens the canvas.
    const width = block.width + Math.max(0, (shadow?.offsetX ?? 0) - block.gutter);
    const height = block.height + Math.max(0, (shadow?.offsetY ?? 0) - block.gutter);
    const pixels = new Uint8ClampedArray(width * height * 4);

    for (let row = 0; row < block.height; row++) pixels.set(block.pixels.subarray(row * block.width * 4, (row + 1) * block.width * 4), row * width * 4);

    if (shadow) {
        const shadowContent = (typeof content === 'string') ? content : content.map(run => ({ text: run.text, format: toShadowFormat(run.format, shadow.color) }));
        const shadowBlock = renderTextBlock(shadowContent, toShadowFormat(blockFormat, shadow.color), options);

        if (shadowBlock) compositeUnder(shadowBlock, shadow.alpha, shadow.offsetX, shadow.offsetY, pixels, width, height);
    }

    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    if (!context) return null;

    FlashTextRenderer.unpremultiply(pixels);
    context.putImageData(new ImageData(pixels, width, height), 0, 0);

    return { canvas, width, height, textWidth: block.textWidth, textHeight: block.textHeight, lineHeight: block.lineHeight, baseline: block.baseline, gutter: block.gutter };
};
