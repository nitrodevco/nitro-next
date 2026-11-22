import { ToInt32 } from '@nitrodevco/nitro-api';

/**
 * The Variable FX renderers are a port of the Flash client's BitmapData-based pipeline: every
 * layer is composed on the CPU and only the finished frame is uploaded as a texture. A plain
 * canvas stands in for `BitmapData` here.
 */
export type VariableFxBitmap = HTMLCanvasElement;

/** AS3 `int()`: truncates toward zero, NaN/Infinity become 0 - nitro-api's `ToInt32`, under the name the renderers use. */
export const toInt = ToInt32;

/** `new BitmapData(width, height, true, 0)` - a canvas is never allowed to be 0x0, so sizes clamp to 1. */
export const createTransparentBitmap = (width: number, height: number): VariableFxBitmap => {
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, toInt(width));
    canvas.height = Math.max(1, toInt(height));

    return canvas;
};

/** Each bitmap's draw count: one more every time its context is handed out (`getBitmapVersion`). */
const bitmapVersions = new WeakMap<VariableFxBitmap, number>();

/**
 * The bitmap's context, to draw into. Every draw takes its context here (a composer takes it as it
 * is built, one per render), so handing it out marks the bitmap as possibly changed.
 */
export const getBitmapContext = (bitmap: VariableFxBitmap): CanvasRenderingContext2D => {
    const context = bitmap.getContext('2d');

    if (!context) throw new Error('Variable FX bitmap has no 2d context.');

    context.imageSmoothingEnabled = false;

    bitmapVersions.set(bitmap, (bitmapVersions.get(bitmap) ?? 0) + 1);

    return context;
};

/**
 * Not Flash's: a number that changes whenever the bitmap may have been drawn into since it was last
 * read, so a bitmap composed from it (`StackedAdditionStack`) is drawn again only when it moved.
 */
export const getBitmapVersion = (bitmap: VariableFxBitmap): number => bitmapVersions.get(bitmap) ?? 0;

export const disposeBitmap = (bitmap: VariableFxBitmap | undefined): void => {
    if (!bitmap) return;

    // Releasing the backing store right away rather than waiting for GC.
    bitmap.width = 0;
    bitmap.height = 0;
};
