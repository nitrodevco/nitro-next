/**
 * What the theme's text components call: finds the captured font for a `FlashTextFormat`, says
 * whether a string can be rendered exactly, measures it and renders it the way a Habbo window's
 * `TextField` did - premultiplied RGBA with real alpha, underline and etching included.
 */
import { Air32NativeTextRenderer, layoutNativeText, layoutNormalText } from './air32/Air32NativeTextRenderer';
import { roundTiesEven } from './air32/mathColor';
import { prepareAir32NativeBundle } from './air32/nativeFont';
import { NativeFont, NativeFontBundle, NativeRenderOptions, NativeRenderResult, RasterCache, RenderTarget, TextRunLayout } from './air32/types';
import { FlashTextFormat } from './flashTextFormat';

interface NativeFontEntry {
    font: NativeFont;
    renderer: Air32NativeTextRenderer;
    rasterCache: RasterCache;
}

/** A line's vertical metrics in px; `baseline` is measured from the top of the text, inside the gutter. */
export interface FlashTextMetrics {
    ascent: number;
    descent: number;
    lineGap: number;
    lineHeight: number;
    baseline: number;
}

const MAX_FONT_SIZE = 256;
const MAX_TEXT_WIDTH = 16384;
const MAX_BITMAP_PIXELS = 2 * 1024 * 1024;
const GRID_FIT_TYPES = [ 'none', 'pixel', 'subpixel' ];

const nativeFontsByKey = new Map<string, NativeFontEntry>();
let fontRevision = 0;

const fontKey = (family: string, weight: string, style: string): string => `${family.trim().toLowerCase()}|${weight}|${style}`;

/** Registers one captured face; `weight` is `400` or `700`, `style` is `normal` or `italic`. */
export const registerNativeFontBundle = (family: string, weight: string, style: string, bundle: NativeFontBundle): void => {
    const font = prepareAir32NativeBundle(bundle);

    nativeFontsByKey.set(fontKey(family, weight, style), {
        font,
        renderer: new Air32NativeTextRenderer(font),
        rasterCache: { entries: new Map(), bytes: 0 },
    });
    fontRevision++;
};

/**
 * The face a format renders with. Flash fell back the same way: UbuntuCondensed has one face
 * for every weight, and the Volter faces have no italic of their own.
 */
const resolveNativeFont = (format: FlashTextFormat): NativeFontEntry | null => {
    const weight = format.bold ? '700' : '400';
    const entry = nativeFontsByKey.get(fontKey(format.fontFamily, weight, format.italic ? 'italic' : 'normal'));

    if (entry) return entry;

    if (format.fontFamily.toLowerCase() === 'ubuntucondensed' && !format.italic) return nativeFontsByKey.get(fontKey(format.fontFamily, '400', 'normal')) ?? null;

    if (/^volter(?: bold)?$/i.test(format.fontFamily)) return nativeFontsByKey.get(fontKey(format.fontFamily, weight, 'normal')) ?? nativeFontsByKey.get(fontKey(format.fontFamily, '400', 'normal')) ?? null;

    return null;
};

const toNativeRenderOptions = (format: FlashTextFormat): NativeRenderOptions => {
    const isAdvanced = format.antiAliasType === 'advanced';

    return {
        colorTransform: format.colorTransform,
        size: format.fontSize,
        color: format.color & 0xFFFFFF,
        antiAliasType: format.antiAliasType,
        gridFitType: format.gridFitType,
        thickness: format.thickness,
        sharpness: format.sharpness,
        kerning: format.kerning,
        fontStyle: format.italic ? 'italic' : 'normal',
        stageQuality: format.stageQuality,
        renderingPipeline: 'habbo-retained',
        // The retained pipeline draws underline and etching for advanced text only.
        textDecoration: (format.underline && isAdvanced) ? 'underline' : null,
        etchingColor: isAdvanced ? format.etchingColor : null,
        etchingPosition: (isAdvanced && format.etchingColor != null) ? format.etchingPosition : null,
    };
};

/** The font entry when `text` can be rendered exactly in `format`, otherwise `null`. */
const resolveSupportedFont = (format: FlashTextFormat, text: string): NativeFontEntry | null => {
    const entry = resolveNativeFont(format);

    if (!entry) return null;

    if (!Number.isSafeInteger(format.fontSize) || format.fontSize <= 0 || format.fontSize > MAX_FONT_SIZE) return null;

    if (format.letterSpacing !== 0 || !Number.isFinite(format.thickness) || !Number.isFinite(format.sharpness)) return null;

    if (!GRID_FIT_TYPES.includes(format.gridFitType)) return null;

    if (format.antiAliasType === 'advanced') {
        if (format.gridFitType !== 'pixel') return null;
    } else if (format.antiAliasType !== 'normal' || !entry.font.fontKey?.toLowerCase().includes('volter')) {
        // Normal anti-aliasing is only exact for the line-only outlines of the Volter faces.
        return null;
    }

    for (let index = 0; index < text.length; index++) {
        const code = text.charCodeAt(index);
        const glyph = entry.font.swfGlyphs.get(code);

        if (!glyph || (glyph.hasInk && !entry.font.profile.glyphs.has(code))) return null;
    }

    return entry;
};

const layoutRun = (entry: NativeFontEntry, text: string, format: FlashTextFormat): TextRunLayout => {
    const layout = (format.antiAliasType === 'normal') ? layoutNormalText : layoutNativeText;

    return layout(entry.font, text, format.fontSize, format.kerning);
};

const floorToTwips = (value: number): number => Math.floor(value * 20) / 20;

export class FlashTextRenderer {
    /** Bumps whenever a font is registered, so a cached render can tell it is stale. */
    public static get revision(): number {
        return fontRevision;
    }

    public static supports(format: FlashTextFormat, text: string = ''): boolean {
        return !!resolveSupportedFont(format, text);
    }

    /** The run's width in px, or `null` when it cannot be rendered exactly. */
    public static measure(text: string, format: FlashTextFormat): number | null {
        const entry = resolveSupportedFont(format, text);

        return entry ? layoutRun(entry, text, format).textWidth : null;
    }

    /** The x of every character's left edge, followed by the run's width. */
    public static measureCharPositions(text: string, format: FlashTextFormat): number[] | null {
        const entry = resolveSupportedFont(format, text);

        if (!entry) return null;

        const layout = layoutRun(entry, text, format);

        return [ ...layout.placements.map(placement => floorToTwips(placement.penX)), layout.textWidth ];
    }

    public static metrics(format: FlashTextFormat): FlashTextMetrics | null {
        const entry = resolveSupportedFont(format, '');

        if (!entry) return null;

        const { metrics, emSquare } = entry.font.swfFont;
        const ascent = floorToTwips((metrics.ascent * format.fontSize) / emSquare);
        const descent = floorToTwips((metrics.descent * format.fontSize) / emSquare);
        const baselineTop = (format.antiAliasType === 'normal' && format.stageQuality !== 'low') ? Math.round((ascent + 2) * 4) / 4 : roundTiesEven(ascent + 2);

        return { ascent, descent, lineGap: 0, lineHeight: ascent + descent + format.leading, baseline: baselineTop - 2 };
    }

    /** How far an italic run leans past its own advance width on the right. */
    public static italicOverhang(format: FlashTextFormat): number {
        if (!format.italic) return 0;

        const entry = resolveSupportedFont(format, '');

        if (!entry) return 0;

        if (format.antiAliasType === 'advanced') return floorToTwips(format.fontSize * Math.fround(0.28) + Math.fround(1.04));

        return (format.stageQuality === 'low' && !entry.font.swfFont.flags?.italic) ? Math.floor(format.fontSize * 0.8) / 2 : 0;
    }

    /** One line of text; `retainedPixels` on the result is the premultiplied RGBA bitmap, gutter included. */
    public static render(text: string, format: FlashTextFormat): NativeRenderResult | null {
        const entry = resolveSupportedFont(format, text);

        if (!entry) return null;

        const textWidth = layoutRun(entry, text, format).textWidth;

        if (textWidth > MAX_TEXT_WIDTH || (textWidth + 128) * (format.fontSize * 2 + 8) > MAX_BITMAP_PIXELS) return null;

        return entry.renderer.render(text, { ...toNativeRenderOptions(format), rasterCache: entry.rasterCache });
    }

    /** Renders into a caller-owned premultiplied bitmap, at the target's own offset. */
    public static renderInto(text: string, format: FlashTextFormat, target: RenderTarget): void {
        const entry = resolveNativeFont(format);

        if (!entry) throw new RangeError(`no captured font for ${format.fontFamily}`);

        entry.renderer.render(text, { ...toNativeRenderOptions(format), target, rasterCache: entry.rasterCache });
    }

    public static premultiply(pixels: Uint8ClampedArray): void {
        for (let offset = 0; offset < pixels.length; offset += 4) {
            const alpha = pixels[offset + 3];

            if (alpha === 255) continue;

            pixels[offset] = alpha ? Math.round((pixels[offset] * alpha) / 255) : 0;
            pixels[offset + 1] = alpha ? Math.round((pixels[offset + 1] * alpha) / 255) : 0;
            pixels[offset + 2] = alpha ? Math.round((pixels[offset + 2] * alpha) / 255) : 0;
        }
    }

    /** Premultiplied to straight alpha in place - what a canvas `ImageData` expects. */
    public static unpremultiply(pixels: Uint8ClampedArray): void {
        for (let offset = 0; offset < pixels.length; offset += 4) {
            const alpha = pixels[offset + 3];

            if (alpha === 255) continue;

            pixels[offset] = alpha ? Math.min(255, Math.round((pixels[offset] * 255) / alpha)) : 0;
            pixels[offset + 1] = alpha ? Math.min(255, Math.round((pixels[offset + 1] * 255) / alpha)) : 0;
            pixels[offset + 2] = alpha ? Math.min(255, Math.round((pixels[offset + 2] * 255) / alpha)) : 0;
        }
    }
}
