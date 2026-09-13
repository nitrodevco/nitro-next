/**
 * The Variable FX renderers are a port of the Flash client's BitmapData-based pipeline: every
 * layer is composed on the CPU and only the finished frame is uploaded as a texture. A plain
 * canvas stands in for `BitmapData` here.
 */
export type VariableFxBitmap = HTMLCanvasElement;

/** AS3 `int()`: truncates toward zero, NaN/Infinity become 0. */
export const toInt = (value: number): number => (Number.isFinite(value) ? Math.trunc(value) : 0);

/** `new BitmapData(width, height, true, 0)` - a canvas is never allowed to be 0x0, so sizes clamp to 1. */
export const createTransparentBitmap = (width: number, height: number): VariableFxBitmap => {
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, toInt(width));
    canvas.height = Math.max(1, toInt(height));

    return canvas;
};

export const getBitmapContext = (bitmap: VariableFxBitmap): CanvasRenderingContext2D => {
    const context = bitmap.getContext('2d');

    if (!context) throw new Error('Variable FX bitmap has no 2d context.');

    context.imageSmoothingEnabled = false;

    return context;
};

export const disposeBitmap = (bitmap: VariableFxBitmap | undefined): void => {
    if (!bitmap) return;

    // Releasing the backing store right away rather than waiting for GC.
    bitmap.width = 0;
    bitmap.height = 0;
};
