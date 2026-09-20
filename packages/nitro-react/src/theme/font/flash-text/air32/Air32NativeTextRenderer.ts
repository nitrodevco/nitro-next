/**
 * Renders one run of text in one font: lays the characters out with the SWF font's advances
 * and kerning, rasterizes every glyph at its own 1/8 px phase and composites the run - either
 * straight onto an opaque background or, the way Habbo's windows do it, into a retained
 * premultiplied bitmap with underline and etching.
 *
 * Ported from Sulake's own JavaScript build of the Habbo client, where this code reproduces
 * Adobe AIR 51's text rasterizer bit for bit. Every float goes through `Math.fround` exactly
 * where AIR used a 32-bit float - reordering or "simplifying" the arithmetic changes pixels.
 */

import { air32ColorType, float32Bits, rasterizeAir32GrayscaleAdfDistances } from './adfRasterizer';
import { normalSampleCountToDensity, resolveAir32TextFieldCsm } from './csm';
import { air32FlattenedPathToLines, air32GlyphRasterKey, air32TransformAndFlattenImp1, deriveAir32AdvancedPixelSetup, deriveAir32AdvancedRetainedSetup, rasterizeAir32Imp1 } from './imp1';
import { blendAir32Component, premultiplyAir32Color, quantizeAir32AlphaMultiplier, roundRationalTiesEven, roundTiesEven } from './mathColor';
import { compositeAir32RetainedCoverage, compositeAir32RetainedToOpaque, createAir32RetainedBitmap, normalSampleMaskCount, rasterizeAir32NormalImp1, rasterizeAirLowNormalImp1, setAir32NormalRetainedCoverage } from './normalRasterizer';
import { AdvancedPixelSetup, CsmCutoffs, EtchingPosition, GlyphPlacement, Imp1Raster, LineMetrics, NativeFont, NativeGlyph, NativeRenderOptions, NativeRenderResult, Point, PositionedGlyphRaster, RasterCache, ResolvedEtching, ResolvedRenderOptions, RetainedGlyphRaster, RgbaBytes, StageQuality, SwfFont, SwfGlyph, TextRunLayout } from './types';

/** A glyph about to be rasterized: its pixel setup and the device pixel its origin is measured from. */
interface GlyphOccurrence {
    setup: AdvancedPixelSetup;
    deviceAnchorX: number;
    deviceAnchorY: number;
}

interface LcdGlyphRaster extends Imp1Raster {
    originX: number;
    originY: number;
    matrix: readonly number[];
    setup: AdvancedPixelSetup;
}

/** A cached LCD raster, stored relative to its anchor so any occurrence at the same phase can reuse it. */
interface CachedGlyphRun extends LcdGlyphRaster {
    originOffsetX: number;
    originOffsetY: number;
}

const DEFAULT_RENDER_OPTIONS = Object.freeze({
    antiAliasType: 'advanced',
    gridFitType: 'pixel',
    thickness: 0,
    sharpness: 0,
    kerning: true,
    stageQuality: 'high',
    renderingPipeline: 'direct',
    color: Object.freeze([ 0, 0, 0, 255 ]),
    background: Object.freeze([ 255, 255, 255, 255 ]),
    padding: 0,
});

const ETCHING_OFFSETS: Readonly<Record<EtchingPosition, Readonly<Point>>> = Object.freeze({
    'top-left': Object.freeze({ x: -1, y: -1 }),
    top: Object.freeze({ x: 0, y: -1 }),
    'top-right': Object.freeze({ x: 1, y: -1 }),
    left: Object.freeze({ x: -1, y: 0 }),
    right: Object.freeze({ x: 1, y: 0 }),
    'bottom-left': Object.freeze({ x: -1, y: 1 }),
    bottom: Object.freeze({ x: 0, y: 1 }),
    'bottom-right': Object.freeze({ x: 1, y: 1 }),
});

const MAX_RASTER_CACHE_ENTRIES = 8192;
const MAX_RASTER_CACHE_BYTES = 2 * 1024 * 1024;
const MAX_ZONED_ADVANCE_CACHE_ENTRIES = 8192;
const MAX_SHARED_RASTER_CACHE_ENTRIES = 4096;
const MAX_SHARED_RASTER_CACHE_BYTES = 512 * 1024;
const sharedRetainedRasterCaches = new WeakMap<NativeFont, RasterCache<RetainedGlyphRaster>>();

export class Air32NativeTextRenderer {
    public readonly font: NativeFont;

    private readonly glyphRunCache: Map<string, CachedGlyphRun>;

    constructor(nativeFont: NativeFont) {
        if (!nativeFont?.profile?.glyphs || !nativeFont?.swfGlyphs) throw new TypeError('nativeFont must be returned by prepareAir32NativeFont');

        this.font = nativeFont;
        this.glyphRunCache = new Map();
    }

    /** Drops the LCD rasters the direct pipeline keeps per glyph and phase. */
    public clearGlyphRunCache(): void {
        this.glyphRunCache.clear();
    }

    public render(text: string, options: NativeRenderOptions = {}): NativeRenderResult {
        const resolved = resolveOptions(options);
        const isNormal = resolved.antiAliasType === 'normal';
        const lineMetrics = resolveLineMetrics(this.font.swfFont, resolved.size, isNormal, resolved.stageQuality);
        const layout = layoutRun(this.font, text, resolved);
        const width = resolved.target?.width ?? Math.max(1, Math.ceil(layout.fieldWidth) + resolved.padding * 2);
        const height = resolved.target?.height ?? Math.max(1, Math.ceil(lineMetrics.fieldHeight) + resolved.padding * 2);
        const retainedPixels = (resolved.renderingPipeline === 'habbo-retained') ? (resolved.target?.pixels ?? createAir32RetainedBitmap(width, height)) : undefined;
        const pixels = resolved.target?.pixels ?? new Uint8ClampedArray(width * height * 4);

        if (!retainedPixels) fillOpaque(pixels, resolved.background);

        if (isNormal) renderNormalRun(this.font, layout, lineMetrics, resolved, width, height, pixels, retainedPixels);
        else this.renderAdvancedRun(layout, lineMetrics, resolved, width, height, pixels, retainedPixels);

        return {
            ...layout,
            ...lineMetrics,
            width,
            height,
            pixels: (retainedPixels && !resolved.target) ? compositeAir32RetainedToOpaque(retainedPixels, resolved.background) : pixels,
            ...(retainedPixels ? { retainedPixels } : {}),
        };
    }

    private renderAdvancedRun(layout: TextRunLayout, lineMetrics: LineMetrics, resolved: ResolvedRenderOptions, width: number, height: number, pixels: Uint8ClampedArray, retainedPixels: Uint8ClampedArray | undefined): void {
        const colorType = air32ColorType(resolved.color, resolved.color[3]);
        const csm = resolveAir32TextFieldCsm(resolved.size, resolved.thickness, resolved.sharpness, colorType, this.font.swfFont.alignmentZones?.csmTableHint ?? 0);

        if (retainedPixels) {
            // The etching goes down first so the text itself lands on top of it.
            if (resolved.etching) renderAdvancedRetainedPass(this.font, layout, lineMetrics, resolved, width, height, retainedPixels, csm, resolved.etching.glyphColor, resolved.etching.offset.x, resolved.etching.offset.y, resolved.underline ? resolved.etching.lineColor : null);

            renderAdvancedRetainedPass(this.font, layout, lineMetrics, resolved, width, height, retainedPixels, csm, resolved.transformedGlyphColor ?? resolved.color, resolved.target?.offsetX ?? 0, resolved.target?.offsetY ?? 0, resolved.underline ? (resolved.transformedLineColor ?? resolved.color) : null);

            return;
        }

        // AIR filled its glyph cache back to front for fonts with alignment zones; the cache key carries no position, so the order decides which occurrence a shared raster comes from.
        if (this.font.swfFont.alignmentZones != null) {
            for (let index = layout.placements.length - 1; index >= 0; index--) {
                if (layout.placements[index].hasInk) this.resolveGlyphRun(layout.placements[index], lineMetrics, resolved.padding, csm);
            }
        }

        for (const placement of layout.placements) {
            if (!placement.hasInk) continue;

            const { raster, occurrence } = this.resolveGlyphRun(placement, lineMetrics, resolved.padding, csm);

            compositeNativeGlyph(raster, pixels, width, height, occurrence.deviceAnchorX + raster.originOffsetX, occurrence.deviceAnchorY + raster.originOffsetY, resolved.color);
        }
    }

    /** The LCD raster of one placement, rasterized on first use and shared by every occurrence at the same phase. */
    private resolveGlyphRun(placement: GlyphPlacement, lineMetrics: LineMetrics, padding: number, csm: CsmCutoffs): { raster: CachedGlyphRun; occurrence: GlyphOccurrence } {
        const glyph = requireNativeGlyph(this.font, placement.codepoint);
        const occurrence = prepareOccurrence(glyph, placement, lineMetrics, padding);
        const cacheKey = glyphRunCacheKey(placement.codepoint, placement.phaseIndex, occurrence.setup, csm);
        let raster = this.glyphRunCache.get(cacheKey);

        if (!raster) {
            const rasterized = rasterizeOccurrence(glyph, occurrence.setup, csm);

            raster = {
                ...rasterized,
                originOffsetX: rasterized.originX - occurrence.deviceAnchorX,
                originOffsetY: rasterized.originY - occurrence.deviceAnchorY,
            };
            this.glyphRunCache.set(cacheKey, raster);
        }

        return { raster, occurrence };
    }
}

/** Lays the run out and widens the field by what an italic face leans past its advance width. */
function layoutRun(font: NativeFont, content: string, resolved: ResolvedRenderOptions): TextRunLayout {
    const isNormal = resolved.antiAliasType === 'normal';
    const layout = isNormal ? layoutNormalText(font, content, resolved.size, resolved.kerning) : layoutNativeText(font, content, resolved.size, resolved.kerning);

    if (resolved.fontStyle !== 'italic') return layout;

    if (!isNormal && font.swfFont.alignmentZones != null) return { ...layout, fieldWidth: Math.round((layout.fieldWidth + air51AdvancedItalicOverhang(resolved.size)) * 20) / 20 };

    if (isNormal && resolved.stageQuality === 'low' && !font.swfFont.flags?.italic) return { ...layout, fieldWidth: layout.fieldWidth + lowNormalItalicOverhang(resolved.size) };

    return layout;
}

function renderNormalRun(font: NativeFont, layout: TextRunLayout, lineMetrics: LineMetrics, resolved: ResolvedRenderOptions, width: number, height: number, pixels: Uint8ClampedArray, retainedPixels: Uint8ClampedArray | undefined): void {
    if (resolved.stageQuality === 'low') {
        const coverage = rasterizeLowNormalRun(font, layout, lineMetrics, resolved, width, height);

        if (retainedPixels) compositeLowNormalRetainedCoverage(coverage, retainedPixels, resolved.color);
        else compositeLowNormalCoverage(coverage, pixels, resolved.color);

        return;
    }

    const sampleMasks = rasterizeNormalRun(font, layout, lineMetrics, resolved, width, height);

    if (retainedPixels) compositeNormalRetainedCoverage(sampleMasks, retainedPixels, resolved.color);
    else compositeNormalCoverage(sampleMasks, pixels, resolved.color);
}

export function layoutNativeText(font: NativeFont, text: string, size: number, useKerning: boolean = true): TextRunLayout {
    if (!Number.isSafeInteger(size) || size <= 0) throw new RangeError('the exact native layout currently requires integer size');

    if (typeof useKerning != 'boolean') throw new TypeError('useKerning must be boolean');

    if (font.swfFont.alignmentZones != null) return layoutZonedNativeText(font, text, size, useKerning);

    const { emSquare } = font.swfFont;
    let penUnits = 0;
    let previousCode: number | null = null;
    const placements: GlyphPlacement[] = [];

    for (let index = 0; index < text.length; index++) {
        const code = text.charCodeAt(index);
        const glyph = font.swfGlyphs.get(code);

        if (!glyph || glyph.advance == null) throw new RangeError(`DefineFont3 has no mapped glyph for U+${code.toString(16).padStart(4, '0')}`);

        if (useKerning && previousCode !== null) penUnits += font.kerning.get(`${previousCode},${code}`) ?? 0;

        const penScaled = penUnits * size;

        assertSafeRun(penScaled);

        const whole = Math.floor(penScaled / emSquare);
        const remainder = penScaled - whole * emSquare;
        const phase = roundRationalTiesEven(remainder * 8, emSquare);
        const phaseIndex = phase & 7;
        const anchorX = whole + (phase >= 4 ? 1 : 0);

        placements.push({
            codepoint: code,
            stringIndex: index,
            penUnits,
            penX: penScaled / emSquare,
            phaseIndex,
            roundedPhase: phase,
            anchorX,
            maskPenX: whole + phase / 8,
            hasInk: swfGlyphHasInk(font, glyph, code),
        });
        penUnits += glyph.advance;
        previousCode = code;
    }

    const totalScaled = penUnits * size;

    assertSafeRun(totalScaled);

    const rawTextWidth = totalScaled / emSquare;
    const textWidth = Math.floor((totalScaled * 20) / emSquare) / 20;

    return {
        placements,
        rawTextWidth,
        textWidth,
        fieldWidth: textWidth + 4,
    };
}

function layoutZonedNativeText(font: NativeFont, text: string, size: number, useKerning: boolean = true): TextRunLayout {
    if (!Number.isSafeInteger(size) || size <= 0) throw new RangeError('the exact native layout currently requires integer size');

    if (typeof useKerning != 'boolean') throw new TypeError('useKerning must be boolean');

    let advanceCache = zonedAdvanceCaches.get(font);

    if (!advanceCache) {
        advanceCache = new Map();
        zonedAdvanceCaches.set(font, advanceCache);
    }

    let penX = 0;
    const placements: GlyphPlacement[] = [];

    for (let index = 0; index < text.length; index++) {
        const code = text.charCodeAt(index);
        const glyph = font.swfGlyphs.get(code);

        if (!glyph || glyph.advance == null) throw new RangeError(`DefineFont3 has no mapped glyph for U+${code.toString(16).padStart(4, '0')}`);

        const whole = Math.floor(penX);
        const roundedPhase = roundTiesEven((penX - whole) * 8);
        const phaseIndex = roundedPhase & 7;
        const maskPenX = whole + roundedPhase / 8;
        const anchorX = whole + (roundedPhase >= 4 ? 1 : 0);
        const hasInk = swfGlyphHasInk(font, glyph, code);

        placements.push({
            codepoint: code,
            stringIndex: index,
            penX,
            phaseIndex,
            roundedPhase,
            anchorX,
            maskPenX,
            hasInk,
        });

        let advanceScale = size / 1024;
        let residual = 0;

        if (hasInk) {
            const cacheKey = `${code}:${size}:${maskPenX}`;
            let cached = advanceCache.get(cacheKey);

            if (cached) {
                advanceCache.delete(cacheKey);
            } else {
                const nativeGlyph = requireNativeGlyph(font, code);
                const setup = deriveAir32AdvancedPixelSetup(nativeGlyph.imp1, { pointSize: size, fittedPenX: maskPenX + 0.5, fittedPenY: 0 });

                cached = [ setup.normalizedScaleX, setup.residualX ];
            }

            advanceCache.set(cacheKey, cached);

            if (advanceCache.size > MAX_ZONED_ADVANCE_CACHE_ENTRIES) advanceCache.delete(advanceCache.keys().next().value);

            advanceScale = cached[0];
            residual = cached[1];
        }

        let advanceUnits = glyph.advance;

        if (useKerning && index + 1 < text.length) {
            const nextCode = text.charCodeAt(index + 1);

            advanceUnits += font.kerning.get(`${code},${nextCode}`) ?? 0;
        }

        penX += (advanceUnits / 20) * advanceScale + residual;
    }

    const rawTextWidth = penX;
    const textWidth = Math.floor(rawTextWidth * 20) / 20;

    return { placements, rawTextWidth, textWidth, fieldWidth: textWidth + 4 };
}

const zonedAdvanceCaches = new WeakMap();

export function layoutNormalText(font: NativeFont, text: string, size: number, useKerning: boolean = true): TextRunLayout {
    if (!Number.isSafeInteger(size) || size <= 0) throw new RangeError('the exact native layout currently requires integer size');

    if (typeof useKerning != 'boolean') throw new TypeError('useKerning must be boolean');

    const { emSquare } = font.swfFont;
    let penTwips = 0;
    let rawUnits = 0;
    const placements: GlyphPlacement[] = [];

    for (let index = 0; index < text.length; index++) {
        const code = text.charCodeAt(index);
        const glyph = font.swfGlyphs.get(code);

        if (!glyph || glyph.advance == null) throw new RangeError(`DefineFont3 has no mapped glyph for U+${code.toString(16).padStart(4, '0')}`);

        placements.push({
            codepoint: code,
            stringIndex: index,
            penTwips,
            penX: penTwips / 20,
            maskPenX: roundToQuarterPixel(penTwips / 20),
            hasInk: swfGlyphHasInk(font, glyph, code),
        });

        let advanceUnits = glyph.advance;

        if (useKerning && index + 1 < text.length) {
            const nextCode = text.charCodeAt(index + 1);

            advanceUnits += font.kerning.get(`${code},${nextCode}`) ?? 0;
        }

        const scaledTwips = advanceUnits * size * 20;
        const scaledUnits = advanceUnits * size;

        assertSafeRun(scaledTwips);
        assertSafeRun(scaledUnits);
        penTwips += Math.floor(scaledTwips / emSquare);
        rawUnits += scaledUnits;
        assertSafeRun(penTwips);
        assertSafeRun(rawUnits);
    }

    const textWidth = penTwips / 20;

    return { placements, rawTextWidth: rawUnits / emSquare, textWidth, fieldWidth: textWidth + 4 };
}

function resolveOptions(options: NativeRenderOptions): ResolvedRenderOptions {
    const antiAliasType = options.antiAliasType ?? DEFAULT_RENDER_OPTIONS.antiAliasType;
    const gridFitType = options.gridFitType ?? DEFAULT_RENDER_OPTIONS.gridFitType;

    if (!(antiAliasType === 'normal'
        ? gridFitType === 'none' || gridFitType === 'pixel' || gridFitType === 'subpixel'
        : antiAliasType === 'advanced' && gridFitType === 'pixel')) {
        throw new RangeError(`unsupported AIR mode ${antiAliasType} + ${gridFitType}; the native path supports advanced + pixel and line-only normal text`);
    }

    if ((options.letterSpacing ?? 0) !== 0) throw new RangeError('native letterSpacing is not implemented yet');

    const size = options.size;

    if (size === undefined || !Number.isFinite(size)) throw new TypeError('configuration.size is required');

    const renderingPipeline = options.renderingPipeline ?? DEFAULT_RENDER_OPTIONS.renderingPipeline;

    if (renderingPipeline !== 'direct' && renderingPipeline !== 'habbo-retained') throw new RangeError('renderingPipeline must be direct or habbo-retained');

    const stageQuality = options.stageQuality ?? DEFAULT_RENDER_OPTIONS.stageQuality;

    if (stageQuality !== 'high' && stageQuality !== 'low') throw new RangeError('stageQuality must be high or low');

    const fontStyle = options.fontStyle ?? 'normal';

    if (fontStyle !== 'normal' && fontStyle !== 'italic') throw new RangeError('fontStyle must be normal or italic');

    const kerning = options.kerning ?? DEFAULT_RENDER_OPTIONS.kerning;

    if (typeof kerning != 'boolean') throw new TypeError('kerning must be boolean');

    const padding = options.padding ?? DEFAULT_RENDER_OPTIONS.padding;

    if (!Number.isSafeInteger(padding) || padding < 0) throw new RangeError('padding must be a non-negative integer');

    const color = normalizeTextColor(options.color ?? DEFAULT_RENDER_OPTIONS.color, options.alpha);
    const colorTransform = options.colorTransform;
    let transformedGlyphColor: number[] | undefined;
    let transformedLineColor: number[] | undefined;

    if (colorTransform) {
        const clamp = (value: number) => Math.max(0, Math.min(255, Math.trunc(value)));

        transformedLineColor = [
            clamp(color[0] * colorTransform.redMultiplier + colorTransform.redOffset),
            clamp(color[1] * colorTransform.greenMultiplier + colorTransform.greenOffset),
            clamp(color[2] * colorTransform.blueMultiplier + colorTransform.blueOffset),
            clamp(color[3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset),
        ];
        transformedGlyphColor = [ ...transformedLineColor ];
        transformedGlyphColor[3] = quantizeAir32AlphaMultiplier(transformedLineColor[3] / 255);
    }

    if ((options.backgroundAlpha ?? 1) !== 1) throw new RangeError('native translucent backgrounds require an AIR grayscale alpha-mask plane');

    const background = normalizeOpaqueColor(options.background ?? DEFAULT_RENDER_OPTIONS.background, 'background');
    const textDecoration = options.textDecoration ?? null;

    if (textDecoration !== null && textDecoration !== 'underline') throw new RangeError('textDecoration must be underline or null');

    const underline = textDecoration === 'underline';
    const etching = resolveHabboEtching(options.etchingColor, options.etchingPosition);

    if ((underline || etching) && renderingPipeline !== 'habbo-retained') throw new RangeError('textDecoration and etching require renderingPipeline=habbo-retained');

    if ((underline || etching) && antiAliasType !== 'advanced') throw new RangeError('Habbo skin effects are currently exact for ADVANCED text only');

    return {
        antiAliasType,
        gridFitType,
        thickness: finiteNumber(options.thickness ?? 0, 'thickness'),
        sharpness: finiteNumber(options.sharpness ?? 0, 'sharpness'),
        kerning,
        stageQuality,
        fontStyle,
        renderingPipeline,
        size,
        padding,
        color,
        background,
        transformedGlyphColor,
        transformedLineColor,
        target: options.target,
        rasterCache: options.rasterCache,
        underline,
        etching,
    };
}

function resolveHabboEtching(etchingColor: number | string | null | undefined, etchingPosition: EtchingPosition | null | undefined): ResolvedEtching | null {
    if (etchingColor == null) {
        if (etchingPosition != null) throw new RangeError('etchingPosition requires etchingColor');

        return null;
    }

    const argb = normalizeArgbColor(etchingColor, 'etchingColor');
    const alpha = argb >>> 24;

    if (alpha === 0) return null;

    const position = etchingPosition ?? 'bottom';
    const offset = ETCHING_OFFSETS[position];

    if (!offset) throw new RangeError(`unsupported etchingPosition ${JSON.stringify(position)}`);

    const red = (argb >>> 16) & 255;
    const green = (argb >>> 8) & 255;
    const blue = argb & 255;

    return {
        argb,
        position,
        offset,
        glyphColor: [ red, green, blue, quantizeAir32AlphaMultiplier(alpha / 255) ],
        lineColor: [ red, green, blue, alpha ],
    };
}

export function resolveLineMetrics(swfFont: SwfFont, size: number, isNormal: boolean = false, stageQuality: StageQuality = 'high'): LineMetrics {
    const ascent = floorToTwips((swfFont.metrics.ascent * size) / swfFont.emSquare);
    const descent = floorToTwips((swfFont.metrics.descent * size) / swfFont.emSquare);
    const textHeight = ascent + descent;

    return {
        size,
        ascent,
        descent,
        leading: 0,
        textHeight,
        fieldHeight: textHeight + 4,
        baseline: isNormal
            ? stageQuality === 'low'
                ? roundTiesEven(ascent + 2)
                : roundToQuarterPixel(ascent + 2)
            : roundTiesEven(ascent + 2),
    };
}

function rasterizeNormalRun(font: NativeFont, layout: TextRunLayout, lineMetrics: LineMetrics, options: ResolvedRenderOptions, width: number, height: number): Uint16Array {
    const sampleMasks = new Uint16Array(width * height);
    const baselineY = options.padding + lineMetrics.baseline;

    for (const placement of layout.placements) {
        if (!placement.hasInk) continue;

        const glyph = requireNativeGlyph(font, placement.codepoint);

        rasterizeAir32NormalImp1(glyph.imp1, {
            sampleMasks,
            width,
            height,
            originX: options.padding + 2 + placement.maskPenX,
            baselineY,
            size: lineMetrics.size,
            emSquare: font.swfFont.emSquare,
        });
    }

    return sampleMasks;
}

function rasterizeLowNormalRun(font: NativeFont, layout: TextRunLayout, lineMetrics: LineMetrics, options: ResolvedRenderOptions, width: number, height: number): Uint8Array {
    const coverage = new Uint8Array(width * height);
    const baselineY = options.padding + lineMetrics.baseline;

    for (const placement of layout.placements) {
        if (!placement.hasInk) continue;

        const glyph = requireNativeGlyph(font, placement.codepoint);

        rasterizeAirLowNormalImp1(glyph.imp1, {
            coverage,
            width,
            height,
            originX: options.padding + 2 + roundTiesEven(placement.penX),
            baselineY,
            size: lineMetrics.size,
            emSquare: font.swfFont.emSquare,
        });
    }

    return coverage;
}

function compositeNormalCoverage(sampleMasks: Uint16Array, pixels: Uint8ClampedArray, color: number[]): void {
    if (color[3] !== 255) throw new RangeError('exact AIR32 NORMAL compositing currently requires opaque text');

    for (let index = 0; index < sampleMasks.length; index++) {
        const sampleMask = sampleMasks[index];

        if (sampleMask === 0) continue;

        const density = normalSampleCountToDensity(normalSampleMaskCount(sampleMask));
        const offset = index * 4;

        for (let channel = 0; channel < 3; channel++) pixels[offset + channel] = blendNormalOpaqueComponent(pixels[offset + channel], color[channel], density);
    }
}

function compositeNormalRetainedCoverage(sampleMasks: Uint16Array, retainedPixels: Uint8ClampedArray, color: number[]): void {
    if (color[3] !== 255) throw new RangeError('exact AIR32 NORMAL retained rendering requires opaque text');

    for (let index = 0; index < sampleMasks.length; index++) {
        const sampleMask = sampleMasks[index];

        if (sampleMask === 0) continue;

        const density = normalSampleCountToDensity(normalSampleMaskCount(sampleMask));

        setAir32NormalRetainedCoverage(retainedPixels, index * 4, color, density);
    }
}

function compositeLowNormalCoverage(coverage: Uint8Array, pixels: Uint8ClampedArray, color: number[]): void {
    requireOpaqueNormalForeground(color, 'LOW NORMAL');

    for (let index = 0; index < coverage.length; index++) {
        if (coverage[index] === 0) continue;

        const offset = index * 4;

        pixels[offset] = color[0];
        pixels[offset + 1] = color[1];
        pixels[offset + 2] = color[2];
    }
}

function compositeLowNormalRetainedCoverage(coverage: Uint8Array, retainedPixels: Uint8ClampedArray, color: number[]): void {
    requireOpaqueNormalForeground(color, 'LOW NORMAL retained');

    for (let index = 0; index < coverage.length; index++) {
        if (coverage[index] !== 0) setAir32NormalRetainedCoverage(retainedPixels, index * 4, color, 255);
    }
}

function requireOpaqueNormalForeground(color: number[], modeLabel: string): void {
    if (color[3] !== 255) throw new RangeError(`exact AIR ${modeLabel} rendering requires opaque text`);
}

function lowNormalItalicOverhang(size: number): number {
    return Math.floor(size * 0.8) / 2;
}

function air51AdvancedItalicOverhang(size: number): number {
    const overhang = size * Math.fround(0.28) + Math.fround(1.04);

    return Math.floor(overhang * 20) / 20;
}

function blendNormalOpaqueComponent(destination: number, foreground: number, density: number): number {
    if (density === 255) return foreground;

    const delta = foreground - destination;
    const scaledDelta = (Math.abs(delta) * density) / 256;

    return destination + Math.sign(delta) * Math.ceil(scaledDelta);
}

function requireNativeGlyph(font: NativeFont, codepoint: number): NativeGlyph {
    const glyph = font.profile.glyphs.get(codepoint);

    if (!glyph) throw new RangeError(`native profile has no rendered IMP1 glyph for U+${codepoint.toString(16).padStart(4, '0')}`);

    return glyph;
}

function swfGlyphHasInk(font: NativeFont, glyph: SwfGlyph, codepoint: number): boolean {
    return (glyph.hasInk
        ?? (font.profile.glyphs.has(codepoint)
            || (glyph.shape?.contours?.length ?? 0) > 0
            || glyph.bounds?.xMin !== glyph.bounds?.xMax
            || glyph.bounds?.yMin !== glyph.bounds?.yMax));
}

function prepareOccurrence(glyph: NativeGlyph, placement: GlyphPlacement, lineMetrics: LineMetrics, padding: number): GlyphOccurrence {
    const fittedPenX = padding + 2 + placement.maskPenX + 0.5;
    const fittedPenY = -(padding + lineMetrics.baseline);

    return {
        setup: deriveAir32AdvancedPixelSetup(glyph.imp1, { pointSize: lineMetrics.size, fittedPenX, fittedPenY }),
        deviceAnchorX: padding + 2 + (placement.anchorX ?? 0),
        deviceAnchorY: padding + lineMetrics.baseline,
    };
}

function prepareRetainedOccurrence(glyph: NativeGlyph, placement: GlyphPlacement, lineMetrics: LineMetrics, padding: number): GlyphOccurrence {
    const fittedPenX = padding + 2 + placement.maskPenX + 0.5;
    const fittedPenY = -(padding + lineMetrics.baseline);

    return {
        setup: deriveAir32AdvancedRetainedSetup(glyph.imp1, { pointSize: lineMetrics.size, fittedPenX, fittedPenY }),
        deviceAnchorX: padding + 2 + (placement.anchorX ?? 0),
        deviceAnchorY: padding + lineMetrics.baseline,
    };
}

function rasterizeOccurrence(glyph: NativeGlyph, setup: AdvancedPixelSetup, csm: CsmCutoffs): LcdGlyphRaster {
    const toFloat32 = Math.fround;

    return {
        ...rasterizeAir32Imp1(glyph.imp1, {
            width: setup.width,
            height: setup.height,
            rowStride: setup.rowStride,
            matrix: setup.matrix,
            outsideCutoff: toFloat32(csm.outside),
            insideCutoff: toFloat32(csm.inside),
            useColorReduction: true,
            colorReductionAmount: 0.5,
        }),
        originX: setup.originX,
        originY: setup.originY,
        matrix: setup.matrix,
        setup,
    };
}

function rasterizeRetainedOccurrence(glyph: NativeGlyph, setup: AdvancedPixelSetup, csm: CsmCutoffs): PositionedGlyphRaster {
    const outsideCutoff = Math.fround(csm.outside);
    const insideCutoff = Math.fround(csm.inside);
    const lines = air32FlattenedPathToLines(air32TransformAndFlattenImp1(glyph.imp1, setup.matrix));
    const distanceField = rasterizeAir32GrayscaleAdfDistances(lines, {
        width: setup.width,
        height: setup.height,
        outsideCutoff,
        insideCutoff,
    });
    const coverage = new Uint8Array(distanceField.values.length);

    for (let index = 0; index < coverage.length; index++) {
        const distance = distanceField.values[index];

        coverage[index] = distance < outsideCutoff ? 0 : distance >= insideCutoff || outsideCutoff === insideCutoff ? 255 : Math.trunc((255 * (distance - outsideCutoff)) / (insideCutoff - outsideCutoff));
    }

    return { width: setup.width, height: setup.height, coverage, originX: setup.originX, originY: setup.originY };
}

/** Reads `key` and marks it most recently used. */
function touchRaster<Raster extends RetainedGlyphRaster>(cache: RasterCache<Raster>, key: string): Raster | undefined {
    const raster = cache.entries.get(key);

    if (raster) {
        cache.entries.delete(key);
        cache.entries.set(key, raster);
    }

    return raster;
}

/** Stores `raster` and evicts the least recently used entries past the limits. */
function storeRaster<Raster extends RetainedGlyphRaster>(cache: RasterCache<Raster>, key: string, raster: Raster, maxEntries: number, maxBytes: number): void {
    if (raster.coverage.byteLength > maxBytes) return;

    cache.entries.set(key, raster);
    cache.bytes += raster.coverage.byteLength;

    while (cache.entries.size > maxEntries || cache.bytes > maxBytes) {
        const oldest = cache.entries.entries().next();

        if (oldest.done) break;

        cache.entries.delete(oldest.value[0]);
        cache.bytes -= oldest.value[1].coverage.byteLength;
    }
}

/** The per-font store of coverage bitmaps, shared by every position a glyph rasterizes identically at. */
function sharedRasterCacheOf(font: NativeFont): RasterCache<RetainedGlyphRaster> {
    let cache = sharedRetainedRasterCaches.get(font);

    if (!cache) {
        cache = { entries: new Map(), bytes: 0 };
        sharedRetainedRasterCaches.set(font, cache);
    }

    return cache;
}

function resolveRetainedRaster(font: NativeFont, placement: GlyphPlacement, lineMetrics: LineMetrics, options: ResolvedRenderOptions, csm: CsmCutoffs): PositionedGlyphRaster {
    const rasterCache = options.rasterCache;
    const rasterCacheKey = JSON.stringify([ placement.codepoint, lineMetrics.size, lineMetrics.baseline, options.padding, placement.maskPenX, csm.outside, csm.inside ]);
    const cached = rasterCache && touchRaster(rasterCache, rasterCacheKey);

    if (cached) return cached;

    const glyph = requireNativeGlyph(font, placement.codepoint);
    const occurrence = prepareRetainedOccurrence(glyph, placement, lineMetrics, options.padding);
    let coverageRaster: RetainedGlyphRaster | undefined;

    if (rasterCache) {
        const sharedCache = sharedRasterCacheOf(font);
        const sharedCacheKey = air32GlyphRasterKey(placement.codepoint, occurrence.setup, [ Math.fround(csm.outside), Math.fround(csm.inside) ]);

        coverageRaster = touchRaster(sharedCache, sharedCacheKey);

        if (!coverageRaster) {
            const rasterized = rasterizeRetainedOccurrence(glyph, occurrence.setup, csm);

            coverageRaster = { width: rasterized.width, height: rasterized.height, coverage: rasterized.coverage };
            storeRaster(sharedCache, sharedCacheKey, coverageRaster, MAX_SHARED_RASTER_CACHE_ENTRIES, MAX_SHARED_RASTER_CACHE_BYTES);
        }
    } else {
        coverageRaster = rasterizeRetainedOccurrence(glyph, occurrence.setup, csm);
    }

    const raster: PositionedGlyphRaster = { width: coverageRaster.width, height: coverageRaster.height, coverage: coverageRaster.coverage, originX: occurrence.setup.originX, originY: occurrence.setup.originY };

    if (rasterCache) storeRaster(rasterCache, rasterCacheKey, raster, MAX_RASTER_CACHE_ENTRIES, MAX_RASTER_CACHE_BYTES);

    return raster;
}

/** One colour pass over the whole run into the retained bitmap: its underline, then every glyph. */
function renderAdvancedRetainedPass(font: NativeFont, layout: TextRunLayout, lineMetrics: LineMetrics, options: ResolvedRenderOptions, width: number, height: number, retainedPixels: Uint8ClampedArray, csm: CsmCutoffs, color: number[], offsetX: number, offsetY: number, underlineColor: number[] | null): void {
    const premultipliedColor = premultiplyAir32Color(color);

    if (underlineColor) {
        const underlineLength = (font.swfFont.alignmentZones == null) ? Math.floor(layout.rawTextWidth * 4) / 4 : Math.ceil(layout.rawTextWidth);

        compositeRetainedUnderline(retainedPixels, width, height, options.padding + 2 + offsetX, options.padding + lineMetrics.baseline + 1 + offsetY, underlineLength, underlineColor);
    }

    for (const placement of layout.placements) {
        if (!placement.hasInk) continue;

        const raster = resolveRetainedRaster(font, placement, lineMetrics, options, csm);

        compositeRetainedNativeGlyph(raster, retainedPixels, width, height, raster.originX + offsetX, raster.originY + offsetY, premultipliedColor);
    }
}

function compositeRetainedUnderline(retainedPixels: Uint8ClampedArray, width: number, height: number, startX: number, y: number, length: number, color: number[]): void {
    if (y < 0 || y >= height || length <= 0) return;

    const wholeLength = Math.floor(length);

    for (let index = 0; index < wholeLength; index++) {
        const x = startX + index;

        if (x < 0 || x >= width) continue;

        const offset = (y * width + x) * 4;

        if (color[3] === 255) {
            retainedPixels[offset] = color[0];
            retainedPixels[offset + 1] = color[1];
            retainedPixels[offset + 2] = color[2];
            retainedPixels[offset + 3] = 255;
        } else {
            compositeAir32RetainedCoverage(retainedPixels, offset, color, 255);
        }
    }

    const fraction = length - wholeLength;

    if (fraction <= 0) return;

    const endX = startX + wholeLength;

    if (endX < 0 || endX >= width) return;

    const endCoverage = Math.round(fraction * 256);

    compositeAir32RetainedCoverage(retainedPixels, (y * width + endX) * 4, color, endCoverage);
}

function glyphRunCacheKey(codepoint: number, phaseIndex: number | undefined, setup: AdvancedPixelSetup, csm: CsmCutoffs): string {
    return [
        codepoint,
        phaseIndex,
        ...setup.nativeKeyWords,
        float32Bits(Math.fround(csm.outside)),
        float32Bits(Math.fround(csm.inside)),
    ].join(':');
}

function compositeNativeGlyph(raster: LcdGlyphRaster, pixels: Uint8ClampedArray, width: number, height: number, originX: number, originY: number, color: number[]): void {
    const premultiplied = premultiplyAir32Color(color);
    const alpha = premultiplied[3];

    for (let glyphRow = 0; glyphRow < raster.height; glyphRow++) {
        const y = originY + glyphRow;

        if (y < 0 || y >= height) continue;

        const sourceRow = raster.height - 1 - glyphRow;

        for (let glyphColumn = 0; glyphColumn < raster.width; glyphColumn++) {
            const x = originX + glyphColumn;

            if (x < 0 || x >= width) continue;

            const sourceOffset = sourceRow * raster.rowStride + glyphColumn * 4;
            const masks = [ raster.pixels[sourceOffset + 2], raster.pixels[sourceOffset + 1], raster.pixels[sourceOffset] ];

            if ((masks[0] | masks[1] | masks[2]) === 0) continue;

            const offset = (y * width + x) * 4;

            for (let channel = 0; channel < 3; channel++) {
                pixels[offset + channel] = blendAir32Component(pixels[offset + channel], premultiplied[channel], alpha, masks[channel]);
            }
        }
    }
}

function compositeRetainedNativeGlyph(raster: RetainedGlyphRaster, retainedPixels: Uint8ClampedArray, width: number, height: number, originX: number, originY: number, premultipliedColor: number[]): void {
    const [ red, green, blue, alpha ] = premultipliedColor;
    const firstColumn = Math.max(0, -originX);
    const endColumn = Math.min(raster.width, width - originX);
    const firstRow = Math.max(0, -originY);
    const endRow = Math.min(raster.height, height - originY);

    for (let glyphRow = firstRow; glyphRow < endRow; glyphRow++) {
        const y = originY + glyphRow;
        let coverageOffset = (raster.height - 1 - glyphRow) * raster.width + firstColumn;
        let offset = (y * width + originX + firstColumn) * 4;

        for (let glyphColumn = firstColumn; glyphColumn < endColumn; glyphColumn++, coverageOffset++, offset += 4) {
            const coverage = raster.coverage[coverageOffset];

            if (coverage === 0) continue;

            const destinationRed = retainedPixels[offset];
            const destinationGreen = retainedPixels[offset + 1];
            const destinationBlue = retainedPixels[offset + 2];
            const destinationAlpha = retainedPixels[offset + 3];

            retainedPixels[offset] = destinationRed + (((red - ((destinationRed * alpha) >> 8)) * coverage) >> 8);
            retainedPixels[offset + 1] = destinationGreen + (((green - ((destinationGreen * alpha) >> 8)) * coverage) >> 8);
            retainedPixels[offset + 2] = destinationBlue + (((blue - ((destinationBlue * alpha) >> 8)) * coverage) >> 8);
            retainedPixels[offset + 3] = destinationAlpha + (((alpha - ((destinationAlpha * alpha) >> 8)) * coverage) >> 8);
        }
    }
}

function normalizeTextColor(color: number | RgbaBytes, alpha: number | undefined): number[] {
    let channels: number[];

    if (typeof color === 'number' && Number.isSafeInteger(color) && color >= 0 && color <= 0xFFFFFF) {
        channels = [ color >>> 16, (color >>> 8) & 255, color & 255, 255 ];
    } else if (typeof color !== 'number'
        && color.length === 4
        && Array.from(color).every(channel => Number.isInteger(channel) && channel >= 0 && channel <= 255)) {
        channels = Array.from(color);
    } else {
        throw new RangeError('color must be a 24-bit integer or RGBA bytes');
    }

    if (alpha !== undefined) {
        if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) throw new RangeError('alpha must be from 0 through 1');

        channels[3] = quantizeAir32AlphaMultiplier(alpha);
    }

    return channels;
}

function normalizeArgbColor(color: number | string, label: string): number {
    let argb = color;

    if (typeof argb == 'string') {
        const match = /^#?([0-9a-f]{8})$/i.exec(argb);

        if (!match) throw new RangeError(`${label} must be an 8-digit ARGB color`);

        argb = Number.parseInt(match[1], 16);
    }

    if (!Number.isSafeInteger(argb) || argb < 0 || argb > 4294967295) throw new RangeError(`${label} must be an unsigned 32-bit ARGB color`);

    return argb >>> 0;
}

function fillOpaque(pixels: Uint8ClampedArray, color: number[]): void {
    for (let offset = 0; offset < pixels.length; offset += 4) {
        pixels[offset] = color[0];
        pixels[offset + 1] = color[1];
        pixels[offset + 2] = color[2];
        pixels[offset + 3] = 255;
    }
}

function normalizeOpaqueColor(color: number | RgbaBytes, label: string): number[] {
    if (typeof color === 'number' && Number.isSafeInteger(color) && color >= 0 && color <= 0xFFFFFF) return [ color >>> 16, (color >>> 8) & 255, color & 255, 255 ];

    if (typeof color === 'number'
        || color.length !== 4
        || Array.from(color).some(channel => !Number.isInteger(channel) || channel < 0 || channel > 255)) {
        throw new RangeError(`${label} must be a 24-bit integer or RGBA bytes`);
    }

    if (color[3] !== 255) throw new RangeError(`${label} must be opaque in the current native profile`);

    return Array.from(color);
}

function floorToTwips(value: number): number {
    return Math.floor(value * 20) / 20;
}

function roundToQuarterPixel(value: number): number {
    return Math.round(value * 4) / 4;
}

function finiteNumber(value: number, label: string): number {
    if (!Number.isFinite(value)) throw new TypeError(`${label} must be finite`);

    return value;
}

function assertSafeRun(value: number): void {
    if (!Number.isSafeInteger(value)) throw new RangeError('text run is too long for exact DefineFont3 layout');
}
