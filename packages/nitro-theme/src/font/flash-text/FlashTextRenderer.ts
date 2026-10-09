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
        gridFitType: (isAdvanced && format.gridFitType === 'subpixel') ? 'pixel' : format.gridFitType,
        thickness: format.thickness,
        sharpness: format.sharpness,
        kerning: format.kerning,
        letterSpacing: format.letterSpacing,
        fontStyle: format.italic ? 'italic' : 'normal',
        stageQuality: format.stageQuality,
        normalPenLayout: format.normalPenLayout,
        renderingPipeline: 'habbo-retained',
        // The retained pipeline draws underline and etching for advanced text only.
        textDecoration: (format.underline && isAdvanced) ? 'underline' : null,
        etchingColor: isAdvanced ? format.etchingColor : null,
        etchingPosition: (isAdvanced && format.etchingColor != null) ? format.etchingPosition : null,
    };
};

/**
 * Typographic punctuation the captured fonts have no glyph data for (they cover printable ASCII),
 * drawn as its ASCII look-alike: a text with any one of them would otherwise fall back to browser
 * text whole - softer than every Flash text around it - for a mark the localizations use in place
 * of an apostrophe (`You don\u00b4t`), a quote or a dash. One character for one, so a caret,
 * a selection or a markup run still indexes the same text.
 */
const GLYPH_STAND_INS: Readonly<Record<string, string>> = {
    '\u00b4': "'", // acute accent
    '\u2018': "'", // left single quotation mark
    '\u2019': "'", // right single quotation mark
    '\u201a': "'", // single low-9 quotation mark
    '\u201b': "'", // single high-reversed-9 quotation mark
    '\u2032': "'", // prime
    '\u201c': '"', // left double quotation mark
    '\u201d': '"', // right double quotation mark
    '\u201e': '"', // double low-9 quotation mark
    '\u2033': '"', // double prime
    '\u2010': '-', // hyphen
    '\u2011': '-', // non-breaking hyphen
    '\u2012': '-', // figure dash
    '\u2013': '-', // en dash
    '\u2014': '-', // em dash
    '\u2212': '-', // minus sign
    '\u00a0': ' ', // no-break space
};

const GLYPH_STAND_IN_CLASS = `[${Object.keys(GLYPH_STAND_INS).join('')}]`;
/** Tests for one (no `g` flag: a global pattern's `test` keeps its `lastIndex` between calls). */
const HAS_GLYPH_STAND_IN = new RegExp(GLYPH_STAND_IN_CLASS);
const GLYPH_STAND_IN_PATTERN = new RegExp(GLYPH_STAND_IN_CLASS, 'g');

/** The text as the captured glyphs draw it (`GLYPH_STAND_INS`); the same length as `text`. */
const withCapturedGlyphs = (text: string): string => (HAS_GLYPH_STAND_IN.test(text) ? text.replace(GLYPH_STAND_IN_PATTERN, character => GLYPH_STAND_INS[character] ?? character) : text);

/**
 * Why `text` cannot be rendered exactly in `format`, or `null` when it can - the checks in the
 * order the exact renderer needs them. The dev text-fallback report shows these reasons.
 */
const unsupportedReason = (format: FlashTextFormat, text: string): string | null => {
    const entry = resolveNativeFont(format);

    if (!entry) return `no captured font for ${format.fontFamily}${format.bold ? ' bold' : ''}${format.italic ? ' italic' : ''}`;

    if (!Number.isSafeInteger(format.fontSize) || format.fontSize <= 0 || format.fontSize > MAX_FONT_SIZE) return `font size ${format.fontSize}`;

    // Letter spacing is laid out by the advanced path only (`layoutNativeText`).
    if (!Number.isFinite(format.letterSpacing) || ((format.letterSpacing !== 0) && (format.antiAliasType !== 'advanced'))) return `letter spacing ${format.letterSpacing} on ${format.antiAliasType} text`;

    if (!Number.isFinite(format.thickness) || !Number.isFinite(format.sharpness)) return 'thickness or sharpness not finite';

    if (!GRID_FIT_TYPES.includes(format.gridFitType)) return `grid fit ${format.gridFitType}`;

    if (format.antiAliasType === 'advanced') {
        if (format.gridFitType === 'none') return `advanced text with grid fit ${format.gridFitType}`;
    } else if (format.antiAliasType !== 'normal' || !entry.font.fontKey?.toLowerCase().includes('volter')) {
        // Normal anti-aliasing is only exact for the line-only outlines of the Volter faces.
        return `${format.antiAliasType} anti-aliasing on ${format.fontFamily}`;
    }

    for (let index = 0; index < text.length; index++) {
        const code = text.charCodeAt(index);
        const glyph = entry.font.swfGlyphs.get(code);

        if (!glyph || (glyph.hasInk && !entry.font.profile.glyphs.has(code))) return `no glyph for ${JSON.stringify(text[index])} (U+${code.toString(16).toUpperCase().padStart(4, '0')})`;
    }

    return null;
};

/** The font entry when `text` can be rendered exactly in `format`, otherwise `null`. */
const resolveSupportedFont = (format: FlashTextFormat, text: string): NativeFontEntry | null => (unsupportedReason(format, text) === null) ? resolveNativeFont(format) : null;

const layoutRun = (entry: NativeFontEntry, text: string, format: FlashTextFormat): TextRunLayout => {
    if (format.antiAliasType === 'normal') return layoutNormalText(entry.font, text, format.fontSize, format.kerning, format.normalPenLayout);

    return layoutNativeText(entry.font, text, format.fontSize, format.kerning, format.letterSpacing);
};

const floorToTwips = (value: number): number => Math.floor(value * 20) / 20;

export class FlashTextRenderer {
    /** Bumps whenever a font is registered, so a cached render can tell it is stale. */
    public static get revision(): number {
        return fontRevision;
    }

    public static supports(format: FlashTextFormat, text: string = ''): boolean {
        return !!resolveSupportedFont(format, withCapturedGlyphs(text));
    }

    /** Why `text` in `format` falls back to browser text, or `null` when it renders exactly. */
    public static unsupportedReason(format: FlashTextFormat, text: string = ''): string | null {
        text = withCapturedGlyphs(text);

        const reason = unsupportedReason(format, text);

        if (reason !== null) return reason;

        const textWidth = FlashTextRenderer.measure(text, format) ?? 0;

        return ((textWidth > MAX_TEXT_WIDTH) || ((textWidth + 128) * (format.fontSize * 2 + 8) > MAX_BITMAP_PIXELS)) ? `run too large to rasterize (${Math.round(textWidth)}px)` : null;
    }

    /** The run's width in px, or `null` when it cannot be rendered exactly. */
    public static measure(text: string, format: FlashTextFormat): number | null {
        text = withCapturedGlyphs(text);

        const entry = resolveSupportedFont(format, text);

        return entry ? layoutRun(entry, text, format).textWidth : null;
    }

    /** The x of every character's left edge, followed by the run's width. */
    public static measureCharPositions(text: string, format: FlashTextFormat): number[] | null {
        text = withCapturedGlyphs(text);

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
        text = withCapturedGlyphs(text);

        const entry = resolveSupportedFont(format, text);

        if (!entry) return null;

        const textWidth = layoutRun(entry, text, format).textWidth;

        if (textWidth > MAX_TEXT_WIDTH || (textWidth + 128) * (format.fontSize * 2 + 8) > MAX_BITMAP_PIXELS) return null;

        return entry.renderer.render(text, { ...toNativeRenderOptions(format), rasterCache: entry.rasterCache });
    }

    /** Renders into a caller-owned premultiplied bitmap, at the target's own offset. */
    public static renderInto(text: string, format: FlashTextFormat, target: RenderTarget): void {
        text = withCapturedGlyphs(text);

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
