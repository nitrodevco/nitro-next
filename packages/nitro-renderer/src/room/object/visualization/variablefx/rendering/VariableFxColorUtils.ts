import { VariableFxBlendMode } from './VariableFxBitmapComposer';

const clampByte = (value: number): number => {
    if (value <= 0) return 0;
    if (value >= 255) return 255;

    return Math.trunc(value);
};

const multiplyRgb = (a: number, b: number): number => clampByte(Math.round(clampByte(a) * clampByte(b) / 255));

const channelFromRgb = (rgb: number, shift: number): number => (rgb >>> shift) & 0xff;

const rgbFromChannels = (r: number, g: number, b: number): number => ((clampByte(r) << 16) | (clampByte(g) << 8) | clampByte(b)) >>> 0;

const resolveHue = (r: number, g: number, b: number, max: number, delta: number): number => {
    if (delta === 0) return 0;
    if (max === r) return 60 * (((g - b) / delta) % 6);
    if (max === g) return 60 * ((b - r) / delta + 2);

    return 60 * ((r - g) / delta + 4);
};

export const resolveRgbFromHueSection = (section: number, chroma: number, x: number): [ number, number, number ] => {
    if (section < 1) return [ chroma, x, 0 ];
    if (section < 2) return [ x, chroma, 0 ];
    if (section < 3) return [ 0, chroma, x ];
    if (section < 4) return [ 0, x, chroma ];
    if (section < 5) return [ x, 0, chroma ];

    return [ chroma, 0, x ];
};

export class VariableFxColorUtils {
    /** Scales the HSV value of an RGB colour (used to darken the striped bar's stripe colour). */
    public static scaleRgbValueInHsv(rgb: number, valueScale: number): number {
        const r = channelFromRgb(rgb, 16) / 255;
        const g = channelFromRgb(rgb, 8) / 255;
        const b = channelFromRgb(rgb, 0) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        const hue = ((resolveHue(r, g, b, max, delta) % 360) + 360) % 360;
        const saturation = max === 0 ? 0 : delta / max;
        const value = Math.max(0, Math.min(1, max * valueScale));
        const chroma = value * saturation;
        const section = hue / 60;
        const x = chroma * (1 - Math.abs((section % 2) - 1));
        const m = value - chroma;
        const [ outR, outG, outB ] = resolveRgbFromHueSection(section, chroma, x);

        return rgbFromChannels(Math.floor((outR + m) * 255), Math.floor((outG + m) * 255), Math.floor((outB + m) * 255));
    }

    /** Blends one ARGB source pixel over one ARGB destination pixel with the given blend mode and opacity. */
    public static blendVariableFxPixel(destination: number, source: number, blendMode: VariableFxBlendMode, opacity: number): number {
        const dstA = (destination >>> 24) & 0xff;
        const dstR = (destination >>> 16) & 0xff;
        const dstG = (destination >>> 8) & 0xff;
        const dstB = destination & 0xff;
        const srcA = (source >>> 24) & 0xff;
        const srcR = (source >>> 16) & 0xff;
        const srcG = (source >>> 8) & 0xff;
        const srcB = source & 0xff;
        const effectiveSourceAlpha = srcA * clampByte(opacity) / 255;

        let blendR = srcR;
        let blendG = srcG;
        let blendB = srcB;

        if (effectiveSourceAlpha <= 0) return destination;

        const sa = effectiveSourceAlpha / 255;
        const da = dstA / 255;
        const outA = sa + da * (1 - sa);

        if (outA <= 0) return 0;

        if (blendMode === 'multiply') {
            blendR = multiplyRgb(srcR, dstR);
            blendG = multiplyRgb(srcG, dstG);
            blendB = multiplyRgb(srcB, dstB);
        } else if (blendMode === 'add') {
            blendR = Math.min(255, srcR + dstR);
            blendG = Math.min(255, srcG + dstG);
            blendB = Math.min(255, srcB + dstB);
        }

        const dstWeight = da * (1 - sa);

        return ((clampByte(Math.round(outA * 255)) << 24)
            | (clampByte(Math.round((blendR * sa + dstR * dstWeight) / outA)) << 16)
            | (clampByte(Math.round((blendG * sa + dstG * dstWeight) / outA)) << 8)
            | clampByte(Math.round((blendB * sa + dstB * dstWeight) / outA))) >>> 0;
    }
}
