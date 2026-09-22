/**
 * The client's `GradientSkinRenderer.drawGradient` (`com.sulake.core.window.graphics.renderer`),
 * rasterising one `gradient` window into a canvas of the window's size. Flash fills the rect with
 * `beginGradientFill(mode, [ rgb1, rgb2 ], [ a1, a2 ], [ 0, 255 ], matrix, 'pad', 'rgb')`, the
 * matrix being `createGradientBox(w, h, angle, 0, 0)` (the angle only for a linear fill). Here
 * each pixel centre is mapped back through that matrix into the gradient's own
 * `-819.2 .. 819.2` space:
 *
 * - linear: `t = cos(angle) * (x - w/2) / w + sin(angle) * (y - h/2) / h + 1/2` - the colour lines
 *   run along the box's own transformed axis, so a diagonal over a non-square box is skewed the
 *   way Flash skews it rather than kept perpendicular to the direction;
 * - radial: `t = 2 * sqrt(((x - w/2) / w)^2 + ((y - h/2) / h)^2)`, an ellipse filling the box;
 *
 * then padded to `0 .. 1`, looked up in the 256-entry ramp between the two stops, and the two
 * colours and alphas interpolated straight (`interpolationMethod="rgb"`). An alpha byte of 0 counts
 * as opaque (`alphaFromColor`). Flash's own ramp lookup and edge rounding are not published; the
 * `floor(t * 256)` index used here can differ from it by one ramp step.
 */

export type GradientMode = 'linear' | 'radial';

export type GradientDirection = 'up' | 'down' | 'left' | 'right' | 'up_left' | 'up_right' | 'down_left' | 'down_right';

/** `GradientSkinRenderer.angleForDirection`. */
export const gradientAngleForDirection = (direction: GradientDirection | undefined): number => {
    switch (direction) {
        case 'right': return 0;
        case 'left': return Math.PI;
        case 'up': return -1.5707963267948966;
        case 'down_right': return Math.PI / 4;
        case 'down_left': return 2.356194490192345;
        case 'up_left': return -2.356194490192345;
        case 'up_right': return -0.7853981633974483;
        default: return Math.PI / 2;
    }
};

export interface GradientRasterOptions {
    width: number;
    height: number;
    /** ARGB. */
    color1: number;
    /** ARGB. */
    color2: number;
    mode: GradientMode;
    direction: GradientDirection;
}

const alphaByte = (color: number): number => {
    const alpha = (color >>> 24) & 0xFF;

    return (alpha === 0) ? 255 : alpha;
};

/** The gradient at `width` x `height` (rounded to whole pixels), or `undefined` for an empty box. */
export const rasterizeGradient = ({ width: rawWidth, height: rawHeight, color1, color2, mode, direction }: GradientRasterOptions): HTMLCanvasElement | undefined => {
    const width = Math.round(rawWidth);
    const height = Math.round(rawHeight);

    if (!(width > 0) || !(height > 0)) return undefined;

    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    const angle = (mode === 'radial') ? 0 : gradientAngleForDirection(direction);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const ramp = new Uint8ClampedArray(256 * 4);
    const from = [ (color1 >>> 16) & 0xFF, (color1 >>> 8) & 0xFF, color1 & 0xFF, alphaByte(color1) ];
    const to = [ (color2 >>> 16) & 0xFF, (color2 >>> 8) & 0xFF, color2 & 0xFF, alphaByte(color2) ];

    for (let i = 0; i < 256; i++) {
        for (let channel = 0; channel < 4; channel++) ramp[(i * 4) + channel] = Math.round(from[channel] + (((to[channel] - from[channel]) * i) / 255));
    }

    const image = ctx.createImageData(width, height);
    const { data } = image;

    for (let y = 0; y < height; y++) {
        const dy = ((y + 0.5) - (height / 2)) / height;

        for (let x = 0; x < width; x++) {
            const dx = ((x + 0.5) - (width / 2)) / width;
            const t = (mode === 'radial') ? (2 * Math.sqrt((dx * dx) + (dy * dy))) : ((cos * dx) + (sin * dy) + 0.5);
            const step = Math.min(255, Math.max(0, Math.floor(t * 256)));
            const index = ((y * width) + x) * 4;

            data[index] = ramp[step * 4];
            data[index + 1] = ramp[(step * 4) + 1];
            data[index + 2] = ramp[(step * 4) + 2];
            data[index + 3] = ramp[(step * 4) + 3];
        }
    }

    ctx.putImageData(image, 0, 0);

    return canvas;
};
