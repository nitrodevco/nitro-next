/**
 * The client's `ShapeSkinRenderer.draw` (`com.sulake.core.window.graphics.renderer`), rasterising
 * one `shape` window into a canvas of the window's size:
 *
 * - `rectangle`, `round_rectangle` and `rhombus` are drawn pixel by pixel with no anti-aliasing:
 *   a pixel belongs to the shape when its centre (`x + 0.5`, `y + 0.5`) is inside it, a corner
 *   radius is `min(round(r), floor(w / 2), floor(h / 2))`, a stroke is `max(1, round(t))` pixels
 *   inside the bounds (the inner edge a second shape inset by it, with radius `max(0, r - t)`),
 *   and every pixel is blended source-over by `blendPixel`;
 * - `ellipse` is Flash vector drawing (`Graphics.drawEllipse` inset by half the stroke, the stroke
 *   centred on that path), which is anti-aliased - drawn here with the canvas' own path
 *   rasteriser, whose edge coverage is close to but not bit-identical with Flash's.
 *
 * Colours are Flash ARGB: an alpha byte of 0 counts as opaque (`alphaFromColor`,
 * `argbFromColor`), which is how a layout colour written without an alpha draws solid.
 */

export type ShapeKind = 'rectangle' | 'round_rectangle' | 'ellipse' | 'rhombus';

export interface ShapeRasterOptions {
    shape: ShapeKind;
    width: number;
    height: number;
    /** The window colour, ARGB. */
    color: number;
    /** The stroke colour, ARGB (already derived through `HsvLayerColor` when the shape has a shade). */
    strokeColor: number;
    strokeThickness: number;
    radius: number;
}

/** `ShapeSkinRenderer.alphaFromColor`. */
export const flashAlphaFromColor = (color: number): number => {
    const alpha = (color >>> 24) & 0xFF;

    return (alpha === 0) ? 1 : (alpha / 255);
};

/**
 * A theme colour string as Flash ARGB: `#rgb` / `#rrggbb` carry no alpha byte (so they draw
 * opaque), `#aarrggbb` carries its own.
 */
export const flashColorFromString = (color: string | undefined, fallback: number): number => {
    if (!color) return fallback;

    let hex = color.trim().replace(/^#|^0x/i, '');

    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

    const value = Number.parseInt(hex, 16);

    return Number.isNaN(value) ? fallback : (value >>> 0);
};

const snap = (value: number): number => (Number.isNaN(value) ? 0 : Math.round(value));

const snappedThickness = (value: number): number => ((Number.isNaN(value) || value <= 0) ? 0 : Math.max(1, Math.round(value)));

const cornerRadius = (radius: number, width: number, height: number): number => {
    if (Number.isNaN(radius) || Number.isNaN(width) || Number.isNaN(height) || radius <= 0 || width <= 0 || height <= 0) return 0;

    return Math.trunc(Math.min(Math.round(radius), Math.floor(width / 2), Math.floor(height / 2)));
};

const roundRectContainsPixel = (x: number, y: number, left: number, top: number, right: number, bottom: number, radius: number): boolean => {
    const px = x + 0.5;
    const py = y + 0.5;

    if (px < left || py < top || px >= right || py >= bottom) return false;

    if (radius <= 0) return true;

    const cx = (px < left + radius) ? left + radius : ((px >= right - radius) ? right - radius : px);
    const cy = (py < top + radius) ? top + radius : ((py >= bottom - radius) ? bottom - radius : py);
    const dx = px - cx;
    const dy = py - cy;

    return ((dx * dx) + (dy * dy)) <= (radius * radius);
};

const rhombusContainsPixel = (x: number, y: number, left: number, top: number, right: number, bottom: number): boolean => {
    const width = right - left;
    const height = bottom - top;

    if (x < left || y < top || x >= right || y >= bottom || width <= 0 || height <= 0) return false;

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const px = (x - left) + 0.5;
    const py = (y - top) + 0.5;

    return ((Math.abs(px - halfWidth) / halfWidth) + (Math.abs(py - halfHeight) / halfHeight)) <= 1;
};

interface Buffer {
    data: Uint8ClampedArray;
    width: number;
    height: number;
}

/** `ShapeSkinRenderer.blendPixel` at full strength, on a straight-alpha RGBA buffer. */
const blendPixel = (buffer: Buffer, x: number, y: number, color: number): void => {
    const alphaByte = (color >>> 24) & 0xFF;
    const alpha = ((alphaByte === 0) ? 255 : alphaByte) / 255;
    const index = ((y * buffer.width) + x) * 4;
    const { data } = buffer;
    const r = (color >>> 16) & 0xFF;
    const g = (color >>> 8) & 0xFF;
    const b = color & 0xFF;

    if (alpha >= 1) {
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;

        return;
    }

    const destAlpha = data[index + 3] / 255;
    const outAlpha = alpha + (destAlpha * (1 - alpha));

    if (outAlpha <= 0) {
        data.fill(0, index, index + 4);

        return;
    }

    const mix = (source: number, dest: number) => Math.min(255, Math.round(((source * alpha) + (dest * destAlpha * (1 - alpha))) / outAlpha));

    data[index] = mix(r, data[index]);
    data[index + 1] = mix(g, data[index + 1]);
    data[index + 2] = mix(b, data[index + 2]);
    data[index + 3] = Math.min(255, Math.round(outAlpha * 255));
};

/** `ShapeSkinRenderer.fillPixelRect`: an overwrite with `argbFromColor`, not a blend. */
const fillPixelRect = (buffer: Buffer, left: number, top: number, right: number, bottom: number, color: number): void => {
    left = Math.max(0, left);
    top = Math.max(0, top);
    right = Math.min(buffer.width, right);
    bottom = Math.min(buffer.height, bottom);

    if (right <= left || bottom <= top) return;

    const alphaByte = (color >>> 24) & 0xFF;
    const alpha = (alphaByte === 0) ? 255 : alphaByte;

    for (let y = top; y < bottom; y++) {
        for (let x = left; x < right; x++) {
            const index = ((y * buffer.width) + x) * 4;

            buffer.data[index] = (color >>> 16) & 0xFF;
            buffer.data[index + 1] = (color >>> 8) & 0xFF;
            buffer.data[index + 2] = color & 0xFF;
            buffer.data[index + 3] = alpha;
        }
    }
};

/** Every pixel of the (clipped) bounds that `inside` accepts, blended with `color`. */
const blendWhere = (buffer: Buffer, left: number, top: number, right: number, bottom: number, color: number, inside: (x: number, y: number) => boolean): void => {
    const fromX = Math.max(0, left);
    const fromY = Math.max(0, top);
    const toX = Math.min(buffer.width, right);
    const toY = Math.min(buffer.height, bottom);

    for (let y = fromY; y < toY; y++) {
        for (let x = fromX; x < toX; x++) {
            if (inside(x, y)) blendPixel(buffer, x, y, color);
        }
    }
};

const drawPixelShape = (buffer: Buffer, options: ShapeRasterOptions, thickness: number): void => {
    const { shape, radius, color, strokeColor } = options;
    const left = snap(0);
    const top = snap(0);
    const right = snap(options.width);
    const bottom = snap(options.height);

    if (right <= left || bottom <= top) return;

    if (shape === 'round_rectangle') {
        const outer = cornerRadius(radius, right - left, bottom - top);

        blendWhere(buffer, left, top, right, bottom, color, (x, y) => roundRectContainsPixel(x, y, left, top, right, bottom, outer));

        if (thickness <= 0) return;

        const inner = cornerRadius(Math.max(0, radius - thickness), (right - thickness) - (left + thickness), (bottom - thickness) - (top + thickness));

        blendWhere(buffer, left, top, right, bottom, strokeColor, (x, y) => roundRectContainsPixel(x, y, left, top, right, bottom, outer)
            && !roundRectContainsPixel(x, y, left + thickness, top + thickness, right - thickness, bottom - thickness, inner));

        return;
    }

    if (shape === 'rhombus') {
        blendWhere(buffer, left, top, right, bottom, color, (x, y) => rhombusContainsPixel(x, y, left, top, right, bottom));

        if (thickness <= 0) return;

        blendWhere(buffer, left, top, right, bottom, strokeColor, (x, y) => rhombusContainsPixel(x, y, left, top, right, bottom)
            && !rhombusContainsPixel(x, y, left + thickness, top + thickness, right - thickness, bottom - thickness));

        return;
    }

    fillPixelRect(buffer, left, top, right, bottom, color);

    if (thickness <= 0) return;

    blendWhere(buffer, left, top, right, bottom, strokeColor, (x, y) => x < left + thickness || x >= right - thickness || y < top + thickness || y >= bottom - thickness);
};

const cssColor = (color: number): string => `rgba(${(color >>> 16) & 0xFF}, ${(color >>> 8) & 0xFF}, ${color & 0xFF}, ${flashAlphaFromColor(color)})`;

/** The shape at `width` x `height` (rounded to whole pixels), or `undefined` for an empty box. */
export const rasterizeShape = (options: ShapeRasterOptions): HTMLCanvasElement | undefined => {
    const width = Math.round(options.width);
    const height = Math.round(options.height);

    if (!(width > 0) || !(height > 0)) return undefined;

    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    const thickness = snappedThickness(options.strokeThickness);

    if (options.shape === 'ellipse') {
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2, Math.max(0, width - thickness) / 2, Math.max(0, height - thickness) / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = cssColor(options.color);
        ctx.fill();

        if (thickness > 0) {
            ctx.lineWidth = thickness;
            ctx.strokeStyle = cssColor(options.strokeColor);
            ctx.stroke();
        }

        return canvas;
    }

    const image = ctx.createImageData(width, height);

    drawPixelShape({ data: image.data, width, height }, { ...options, width, height }, thickness);
    ctx.putImageData(image, 0, 0);

    return canvas;
};
