import { createTransparentBitmap, getBitmapContext, toInt, VariableFxBitmap } from './VariableFxBitmap';
import { VariableFxClipRect } from './VariableFxClipRect';

export type VariableFxBlendMode = 'normal' | 'multiply' | 'add';

/** The multiplier half of a Flash `ColorTransform` (offsets are never used by the Variable FX renderers). */
export interface VariableFxColorMultipliers {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

interface TargetBounds {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

const BLEND_OPERATIONS: Record<VariableFxBlendMode, GlobalCompositeOperation> = {
    normal: 'source-over',
    multiply: 'multiply',
    add: 'lighter',
};

const clampOpacity = (opacity: number): number => {
    if (opacity <= 0) return 0;
    if (opacity >= 255) return 255;

    return opacity;
};

const argbToCss = (argb: number): string => {
    const alpha = ((argb >>> 24) & 0xff) / 255;

    return `rgba(${(argb >>> 16) & 0xff}, ${(argb >>> 8) & 0xff}, ${argb & 0xff}, ${alpha})`;
};

/** `new ColorTransform(r/255, g/255, b/255, a * opacity / 65025)` for an ARGB tint. */
export const createTintMultipliers = (argb: number, opacity: number = 255): VariableFxColorMultipliers => {
    return {
        red: ((argb >>> 16) & 0xff) / 255,
        green: ((argb >>> 8) & 0xff) / 255,
        blue: (argb & 0xff) / 255,
        alpha: ((argb >>> 24) & 0xff) * clampOpacity(opacity) / 65025,
    };
};

/** Applies colour multipliers per pixel (what `BitmapData.draw` does with a ColorTransform) into a new bitmap. */
export const applyColorMultipliers = (source: VariableFxBitmap, multipliers: VariableFxColorMultipliers): VariableFxBitmap => {
    const bitmap = createTransparentBitmap(source.width, source.height);
    const context = getBitmapContext(bitmap);

    context.drawImage(source, 0, 0);

    const imageData = context.getImageData(0, 0, bitmap.width, bitmap.height);
    const pixels = imageData.data;
    const { red, green, blue, alpha } = multipliers;

    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) continue;

        pixels[i] = pixels[i] * red;
        pixels[i + 1] = pixels[i + 1] * green;
        pixels[i + 2] = pixels[i + 2] * blue;
        pixels[i + 3] = pixels[i + 3] * alpha;
    }

    context.putImageData(imageData, 0, 0);

    return bitmap;
};

const redChannelMasks = new WeakMap<VariableFxBitmap, VariableFxBitmap>();

/** A copy of `mask` whose alpha is its red channel (what `copyChannel(mask, RED, ALPHA)` produces); cached per mask bitmap. */
const redChannelAsAlpha = (mask: VariableFxBitmap): VariableFxBitmap => {
    const existing = redChannelMasks.get(mask);

    if (existing) return existing;

    const bitmap = createTransparentBitmap(mask.width, mask.height);
    const context = getBitmapContext(bitmap);

    context.drawImage(mask, 0, 0);

    const imageData = context.getImageData(0, 0, bitmap.width, bitmap.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) pixels[i + 3] = pixels[i];

    context.putImageData(imageData, 0, 0);

    redChannelMasks.set(mask, bitmap);

    return bitmap;
};

/**
 * Port of the Flash client's `VariableFxBitmapComposer`: every draw call clips to the target
 * bitmap (and an optional clip rect), uses integer placement, no smoothing, and one of the
 * three blend modes the renderers rely on.
 */
export class VariableFxBitmapComposer {
    private _bitmap: VariableFxBitmap;
    private _context: CanvasRenderingContext2D;

    constructor(bitmap: VariableFxBitmap) {
        this._bitmap = bitmap;
        this._context = getBitmapContext(bitmap);
    }

    public get bitmap(): VariableFxBitmap {
        return this._bitmap;
    }

    public clear(argb: number): void {
        this.fillRect(0, 0, this._bitmap.width, this._bitmap.height, argb);
    }

    /** `BitmapData.fillRect` - replaces the pixels, no blending. */
    public fillRect(x: number, y: number, width: number, height: number, argb: number): void {
        const bounds = this.getTargetBounds(x, y, width, height);

        if (bounds.left >= bounds.right || bounds.top >= bounds.bottom) return;

        const w = bounds.right - bounds.left;
        const h = bounds.bottom - bounds.top;
        const context = this._context;

        context.save();
        context.globalCompositeOperation = 'source-over';
        context.globalAlpha = 1;
        context.clearRect(bounds.left, bounds.top, w, h);

        if (((argb >>> 24) & 0xff) > 0) {
            context.fillStyle = argbToCss(argb);
            context.fillRect(bounds.left, bounds.top, w, h);
        }

        context.restore();
    }

    public drawLayer(source: VariableFxBitmap, x: number, y: number, blendMode: VariableFxBlendMode = 'normal', opacity: number = 255, clip?: VariableFxClipRect): void {
        this.drawBitmap(source, x, y, blendMode, opacity, clip);
    }

    public drawTintedLayer(source: VariableFxBitmap, x: number, y: number, argb: number, blendMode: VariableFxBlendMode = 'normal', opacity: number = 255, clip?: VariableFxClipRect): void {
        const tinted = applyColorMultipliers(source, createTintMultipliers(argb, opacity));

        this.drawImage(tinted, toInt(x), toInt(y), blendMode, 1, clip ? this.clipToBounds(clip) : undefined);
    }

    /**
     * Draws `source` at (x, y) keeping only the pixels where `mask` (placed at maskX, maskY) is
     * bright: the Flash code copies the mask's RED channel into the alpha channel
     * (`copyChannel(mask, ..., RED, ALPHA)`), so a black/white mask image masks by luminance,
     * not by its own (fully opaque) alpha.
     */
    public drawMaskedLayer(source: VariableFxBitmap, mask: VariableFxBitmap, x: number, y: number, maskX: number, maskY: number, blendMode: VariableFxBlendMode, opacity: number, clip?: VariableFxClipRect): void {
        const bounds = this.getTargetBounds(x, y, source.width, source.height, clip);
        const sourceX = toInt(x);
        const sourceY = toInt(y);
        const maskLeft = toInt(maskX);
        const maskTop = toInt(maskY);
        const left = Math.max(bounds.left, maskLeft);
        const top = Math.max(bounds.top, maskTop);
        const right = Math.min(bounds.right, maskLeft + mask.width);
        const bottom = Math.min(bounds.bottom, maskTop + mask.height);
        const width = right - left;
        const height = bottom - top;

        if (width <= 0 || height <= 0) return;

        const masked = createTransparentBitmap(width, height);
        const context = getBitmapContext(masked);

        context.drawImage(source, sourceX - left, sourceY - top);
        context.globalCompositeOperation = 'destination-in';
        context.drawImage(redChannelAsAlpha(mask), maskLeft - left, maskTop - top);

        this.drawBitmap(masked, left, top, blendMode, opacity);
    }

    /** Left cap, horizontally stretched middle, right cap; `tint` (ARGB) recolours the whole slice. */
    public drawThreeSlice(source: VariableFxBitmap, leftWidth: number, rightWidth: number, targetWidth: number, x: number, y: number, blendMode: VariableFxBlendMode, opacity: number, clip?: VariableFxClipRect, tint?: number): void {
        const left = Math.max(0, toInt(leftWidth));
        const right = Math.max(0, toInt(rightWidth));
        const target = Math.max(0, toInt(targetWidth));
        const middleSourceWidth = Math.max(0, source.width - left - right);
        const middleTargetWidth = Math.max(0, target - left - right);
        const image = tint === undefined ? source : applyColorMultipliers(source, createTintMultipliers(tint, opacity));
        const alpha = tint === undefined ? clampOpacity(opacity) / 255 : 1;

        this.drawSourceRegionWithAlpha(image, 0, 0, Math.min(left, target), source.height, x, y, blendMode, alpha, clip);

        if (middleSourceWidth > 0 && middleTargetWidth > 0) {
            this.drawScaledHorizontalRegion(image, left, middleSourceWidth, source.height, x + left, y, middleTargetWidth, blendMode, alpha, clip);
        }

        const rightDrawWidth = Math.min(right, Math.max(0, target - left - middleTargetWidth));

        if (rightDrawWidth > 0) {
            this.drawSourceRegionWithAlpha(image, source.width - rightDrawWidth, 0, rightDrawWidth, source.height, x + target - rightDrawWidth, y, blendMode, alpha, clip);
        }
    }

    /** Left cap, tiled (not stretched) middle, right cap. */
    public drawRepeatedThreeSlice(source: VariableFxBitmap, leftWidth: number, rightWidth: number, targetWidth: number, x: number, y: number, blendMode: VariableFxBlendMode, opacity: number, clip?: VariableFxClipRect): void {
        const left = Math.max(0, toInt(leftWidth));
        const right = Math.max(0, toInt(rightWidth));
        const target = Math.max(0, toInt(targetWidth));
        const middleSourceWidth = Math.max(0, source.width - left - right);
        const middleTargetWidth = Math.max(0, target - left - right);

        this.drawSourceRegion(source, 0, 0, Math.min(left, target), source.height, x, y, blendMode, opacity, clip);

        if (middleSourceWidth > 0 && middleTargetWidth > 0) {
            this.drawTiledChunk(source, new VariableFxClipRect(left, 0, middleSourceWidth, source.height), x + left, y, middleTargetWidth, source.height, blendMode, opacity, clip);
        }

        const rightDrawWidth = Math.min(right, Math.max(0, target - left - middleTargetWidth));

        if (rightDrawWidth > 0) {
            this.drawSourceRegion(source, source.width - rightDrawWidth, 0, rightDrawWidth, source.height, x + target - rightDrawWidth, y, blendMode, opacity, clip);
        }
    }

    /** Tiles `sourceRect` of `source` across the target rectangle. */
    public drawTiledChunk(source: VariableFxBitmap, sourceRect: VariableFxClipRect, x: number, y: number, width: number, height: number, blendMode: VariableFxBlendMode, opacity: number, clip?: VariableFxClipRect): void {
        const sourceX = sourceRect.x;
        const sourceY = sourceRect.y;
        const chunkWidth = Math.max(0, sourceRect.width);
        const chunkHeight = Math.max(0, sourceRect.height);
        const targetX = toInt(x);
        const targetY = toInt(y);
        const bounds = this.getTargetBounds(targetX, targetY, Math.max(0, toInt(width)), Math.max(0, toInt(height)), clip);

        if (chunkWidth <= 0 || chunkHeight <= 0 || bounds.left >= bounds.right || bounds.top >= bounds.bottom) return;

        const startX = targetX + Math.floor((bounds.left - targetX) / chunkWidth) * chunkWidth;
        const startY = targetY + Math.floor((bounds.top - targetY) / chunkHeight) * chunkHeight;
        const tileClip = this.boundsToClipRect(bounds);

        for (let tileY = startY; tileY < bounds.bottom; tileY += chunkHeight) {
            for (let tileX = startX; tileX < bounds.right; tileX += chunkWidth) {
                this.drawSourceRegion(source, sourceX, sourceY, chunkWidth, chunkHeight, tileX, tileY, blendMode, opacity, tileClip);
            }
        }
    }

    public drawSourceRegion(source: VariableFxBitmap, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number, x: number, y: number, blendMode: VariableFxBlendMode, opacity: number, clip?: VariableFxClipRect, colorTransform?: VariableFxColorMultipliers): void {
        if (colorTransform) {
            const transformed = applyColorMultipliers(source, {
                red: colorTransform.red,
                green: colorTransform.green,
                blue: colorTransform.blue,
                alpha: colorTransform.alpha * clampOpacity(opacity) / 255,
            });

            this.drawSourceRegionWithAlpha(transformed, sourceX, sourceY, sourceWidth, sourceHeight, x, y, blendMode, 1, clip);

            return;
        }

        this.drawSourceRegionWithAlpha(source, sourceX, sourceY, sourceWidth, sourceHeight, x, y, blendMode, clampOpacity(opacity) / 255, clip);
    }

    private drawBitmap(source: VariableFxBitmap, x: number, y: number, blendMode: VariableFxBlendMode, opacity: number, clip?: VariableFxClipRect): void {
        const alpha = clampOpacity(opacity);
        const clipBounds = clip ? this.clipToBounds(clip) : undefined;

        if (alpha <= 0 || (clipBounds && (clipBounds.right <= clipBounds.left || clipBounds.bottom <= clipBounds.top))) return;

        this.drawImage(source, toInt(x), toInt(y), blendMode, alpha / 255, clipBounds);
    }

    private drawSourceRegionWithAlpha(source: VariableFxBitmap, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number, x: number, y: number, blendMode: VariableFxBlendMode, alpha: number, clip?: VariableFxClipRect): void {
        const targetX = toInt(x);
        const targetY = toInt(y);
        const width = toInt(sourceWidth);
        const height = toInt(sourceHeight);
        const bounds = this.getTargetBounds(targetX, targetY, width, height, clip);

        if (bounds.right <= bounds.left || bounds.bottom <= bounds.top || width <= 0 || height <= 0 || alpha <= 0) return;

        const context = this._context;

        context.save();
        context.beginPath();
        context.rect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top);
        context.clip();
        context.globalAlpha = alpha;
        context.globalCompositeOperation = BLEND_OPERATIONS[blendMode];
        context.drawImage(source, toInt(sourceX), toInt(sourceY), width, height, targetX, targetY, width, height);
        context.restore();
    }

    private drawScaledHorizontalRegion(source: VariableFxBitmap, sourceX: number, sourceWidth: number, sourceHeight: number, x: number, y: number, targetWidth: number, blendMode: VariableFxBlendMode, alpha: number, clip?: VariableFxClipRect): void {
        const width = toInt(sourceWidth);
        const height = toInt(sourceHeight);
        const drawWidth = toInt(targetWidth);
        const targetX = toInt(x);
        const targetY = toInt(y);
        const bounds = this.getTargetBounds(targetX, targetY, drawWidth, height, clip);

        if (bounds.right <= bounds.left || bounds.bottom <= bounds.top || width <= 0 || height <= 0 || drawWidth <= 0 || alpha <= 0) return;

        const context = this._context;

        context.save();
        context.beginPath();
        context.rect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top);
        context.clip();
        context.globalAlpha = alpha;
        context.globalCompositeOperation = BLEND_OPERATIONS[blendMode];
        context.imageSmoothingEnabled = false;
        context.drawImage(source, toInt(sourceX), 0, width, height, targetX, targetY, drawWidth, height);
        context.restore();
    }

    private drawImage(source: VariableFxBitmap, x: number, y: number, blendMode: VariableFxBlendMode, alpha: number, clipBounds?: TargetBounds): void {
        const context = this._context;

        context.save();

        if (clipBounds) {
            context.beginPath();
            context.rect(clipBounds.left, clipBounds.top, Math.max(0, clipBounds.right - clipBounds.left), Math.max(0, clipBounds.bottom - clipBounds.top));
            context.clip();
        }

        context.globalAlpha = alpha;
        context.globalCompositeOperation = BLEND_OPERATIONS[blendMode];
        context.drawImage(source, x, y);
        context.restore();
    }

    private clipToBounds(clip: VariableFxClipRect): TargetBounds {
        return {
            left: clip.x,
            top: clip.y,
            right: clip.x + Math.max(0, clip.width),
            bottom: clip.y + Math.max(0, clip.height),
        };
    }

    private boundsToClipRect(bounds: TargetBounds): VariableFxClipRect {
        return new VariableFxClipRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top);
    }

    private getTargetBounds(x: number, y: number, width: number, height: number, clip?: VariableFxClipRect): TargetBounds {
        const targetX = toInt(x);
        const targetY = toInt(y);

        let left = Math.max(0, targetX);
        let top = Math.max(0, targetY);
        let right = Math.min(this._bitmap.width, targetX + Math.max(0, toInt(width)));
        let bottom = Math.min(this._bitmap.height, targetY + Math.max(0, toInt(height)));

        if (clip) {
            left = Math.max(left, clip.x);
            top = Math.max(top, clip.y);
            right = Math.min(right, clip.x + Math.max(0, clip.width));
            bottom = Math.min(bottom, clip.y + Math.max(0, clip.height));
        }

        return {
            left,
            top,
            right: Math.max(left, right),
            bottom: Math.max(top, bottom),
        };
    }
}
