/**
 * `AntiAliasType.NORMAL` - what the pixel font Volter renders with. Every pixel is sampled on a
 * 4x4 grid against the outline's winding (one sample at low stage quality), and the retained
 * bitmap helpers composite coverage into premultiplied RGBA.
 *
 * Ported from Sulake's own JavaScript build of the Habbo client, where this code reproduces
 * Adobe AIR 51's text rasterizer bit for bit. Every float goes through `Math.fround` exactly
 * where AIR used a 32-bit float - reordering or "simplifying" the arithmetic changes pixels.
 */

import { blendAir32Component, premultiplyAir32Color } from './mathColor';
import { Imp1Glyph, RgbaBytes } from './types';

/** An outline segment in the pixel space samples are tested in. */
interface SampleLine {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
}

interface RunRasterSetup {
    width: number;
    height: number;
    originX: number;
    baselineY: number;
    size: number;
    emSquare: number;
}

/** `sampleMasks` holds one bit per 4x4 sample that fell inside a glyph. */
interface NormalRasterSetup extends RunRasterSetup {
    sampleMasks: Uint16Array;
}

interface LowNormalRasterSetup extends RunRasterSetup {
    coverage: Uint8Array;
}

const NORMAL_SAMPLE_OFFSETS = Object.freeze([ 0.125, 0.375, 0.625, 0.875 ]);

export function rasterizeAir32NormalImp1(imp1: Imp1Glyph, { sampleMasks, width, height, originX, baselineY, size, emSquare }: NormalRasterSetup): Uint16Array {
    validateRasterArguments(imp1, {
        sampleMasks,
        width,
        height,
        originX,
        baselineY,
        size,
        emSquare,
    });

    if (imp1.pathType !== 0) throw new RangeError('exact AIR32 NORMAL rasterization currently supports filled IMP1 paths');

    const scale = (20 * (size / emSquare)) / imp1.normalizationFactor;
    const lines = transformLineCommands(imp1, originX, baselineY, scale);

    if (lines.length === 0) return sampleMasks;

    const { firstX, lastX, firstY, lastY } = rasterBounds(lines, width, height);

    for (let row = firstY; row < lastY; row++) {
        for (let column = firstX; column < lastX; column++) {
            let sampleMask = 0;
            let sampleBit = 1;

            for (const offsetY of NORMAL_SAMPLE_OFFSETS) {
                const sampleY = row + offsetY;

                for (const offsetX of NORMAL_SAMPLE_OFFSETS) {
                    if (hasNonZeroWinding(lines, column + offsetX, sampleY)) sampleMask |= sampleBit;

                    sampleBit <<= 1;
                }
            }

            sampleMasks[row * width + column] |= sampleMask;
        }
    }

    return sampleMasks;
}

export function rasterizeAirLowNormalImp1(imp1: Imp1Glyph, { coverage, width, height, originX, baselineY, size, emSquare }: LowNormalRasterSetup): Uint8Array {
    validateLowRasterArguments(imp1, {
        coverage,
        width,
        height,
        originX,
        baselineY,
        size,
        emSquare,
    });
    validateLineOnlyImp1(imp1);

    const scale = (20 * (size / emSquare)) / imp1.normalizationFactor;
    const lines = transformLineCommands(imp1, originX, baselineY, scale);

    if (lines.length === 0) return coverage;

    const { firstX, lastX, firstY, lastY } = rasterBounds(lines, width, height);

    for (let row = firstY; row < lastY; row++) {
        const sampleY = row + 0.5;

        for (let column = firstX; column < lastX; column++) {
            if (hasNonZeroWinding(lines, column + 0.5, sampleY)) coverage[row * width + column] = 255;
        }
    }

    return coverage;
}

export function normalSampleMaskCount(sampleMask: number): number {
    if (!Number.isSafeInteger(sampleMask) || sampleMask < 0 || sampleMask > 65535) throw new RangeError('NORMAL sample mask must be an unsigned 16-bit integer');

    let bits = sampleMask;

    bits = bits - ((bits >>> 1) & 21845);
    bits = (bits & 13107) + ((bits >>> 2) & 13107);
    bits = (bits + (bits >>> 4)) & 3855;

    return (bits + (bits >>> 8)) & 31;
}

function transformLineCommands(imp1: Imp1Glyph, originX: number, baselineY: number, scale: number): SampleLine[] {
    const lines: SampleLine[] = [];
    let current: { x: number; y: number } | null = null;

    for (const command of imp1.commands) {
        const point = { x: originX + (command.x - imp1.referenceX) * scale, y: baselineY + (imp1.referenceY - command.y) * scale };

        if (command.opcode === 0) {
            current = point;

            continue;
        }

        if (command.opcode === 2) throw new RangeError('exact AIR32 NORMAL rasterization currently requires line-only IMP1 outlines');

        if (command.opcode !== 1) throw new RangeError(`unsupported IMP1 opcode ${command.opcode}`);

        if (current === null) throw new Error('IMP1 line command precedes its move command');

        lines.push({ fromX: current.x, fromY: current.y, toX: point.x, toY: point.y });
        current = point;
    }

    return lines;
}

function rasterBounds(lines: SampleLine[], width: number, height: number): { firstX: number; lastX: number; firstY: number; lastY: number } {
    let minX = 1 / 0;
    let maxX = -1 / 0;
    let minY = 1 / 0;
    let maxY = -1 / 0;

    for (const line of lines) {
        minX = Math.min(minX, line.fromX, line.toX);
        maxX = Math.max(maxX, line.fromX, line.toX);
        minY = Math.min(minY, line.fromY, line.toY);
        maxY = Math.max(maxY, line.fromY, line.toY);
    }

    return {
        firstX: Math.max(0, Math.floor(minX) - 1),
        lastX: Math.min(width, Math.ceil(maxX) + 1),
        firstY: Math.max(0, Math.floor(minY) - 1),
        lastY: Math.min(height, Math.ceil(maxY) + 1),
    };
}

function hasNonZeroWinding(lines: SampleLine[], sampleX: number, sampleY: number): boolean {
    let winding = 0;

    for (const line of lines) {
        const deltaX = line.toX - line.fromX;
        const deltaY = line.toY - line.fromY;
        const side = deltaX * (sampleY - line.fromY) - (sampleX - line.fromX) * deltaY;

        if (line.fromY <= sampleY) {
            if (line.toY > sampleY && side > 0) winding++;
        } else if (line.toY <= sampleY && side < 0) {
            winding--;
        }
    }

    return winding !== 0;
}

function validateRasterArguments(imp1: Imp1Glyph, setup: NormalRasterSetup): void {
    if (!imp1
        || !Array.isArray(imp1.commands)
        || !Number.isFinite(imp1.normalizationFactor)
        || imp1.normalizationFactor === 0
        || !Number.isFinite(imp1.referenceX)
        || !Number.isFinite(imp1.referenceY)) {
        throw new TypeError('imp1 must be a parsed, normalized IMP1 glyph');
    }

    const { sampleMasks, width, height } = setup;

    if (!(sampleMasks instanceof Uint16Array)
        || !Number.isSafeInteger(width)
        || width <= 0
        || !Number.isSafeInteger(height)
        || height <= 0
        || sampleMasks.length !== width * height) {
        throw new TypeError('sampleMasks must be a width-by-height Uint16Array');
    }

    for (const property of [ 'originX', 'baselineY', 'size', 'emSquare' ] as const) {
        if (!Number.isFinite(setup[property])) throw new TypeError(`${property} must be finite`);
    }

    if (setup.size <= 0 || setup.emSquare <= 0) throw new RangeError('size and emSquare must be positive');
}

function validateLowRasterArguments(imp1: Imp1Glyph, setup: LowNormalRasterSetup): void {
    if (!imp1
        || !Array.isArray(imp1.commands)
        || !Number.isFinite(imp1.normalizationFactor)
        || imp1.normalizationFactor === 0
        || !Number.isFinite(imp1.referenceX)
        || !Number.isFinite(imp1.referenceY)) {
        throw new TypeError('imp1 must be a parsed, normalized IMP1 glyph');
    }

    const { coverage, width, height } = setup;

    if (!(coverage instanceof Uint8Array)
        || !Number.isSafeInteger(width)
        || width <= 0
        || !Number.isSafeInteger(height)
        || height <= 0
        || coverage.length !== width * height) {
        throw new TypeError('coverage must be a width-by-height Uint8Array');
    }

    for (const property of [ 'originX', 'baselineY', 'size', 'emSquare' ] as const) {
        if (!Number.isFinite(setup[property])) throw new TypeError(`${property} must be finite`);
    }

    if (setup.size <= 0 || setup.emSquare <= 0) throw new RangeError('size and emSquare must be positive');
}

function validateLineOnlyImp1(imp1: Imp1Glyph): void {
    if (imp1.pathType !== 0) throw new RangeError('exact AIR LOW NORMAL rasterization currently supports filled IMP1 paths');
}

export function createAir32RetainedBitmap(width: number, height: number): Uint8ClampedArray {
    if (!Number.isSafeInteger(width) || width < 1 || !Number.isSafeInteger(height) || height < 1) {
        throw new RangeError('retained bitmap dimensions must be positive integers');
    }

    return new Uint8ClampedArray(width * height * 4);
}

export function compositeAir32RetainedCoverage(destination: Uint8Array | Uint8ClampedArray, offset: number, color: RgbaBytes, coverage: number): void {
    if (!(destination instanceof Uint8Array || destination instanceof Uint8ClampedArray)) throw new TypeError('destination must be an 8-bit typed array');

    if (!Number.isSafeInteger(offset) || offset < 0 || offset + 3 >= destination.length) throw new RangeError('retained destination offset is out of bounds');

    if (!Number.isInteger(coverage) || coverage < 0 || coverage > 255) throw new RangeError('coverage must be an 8-bit integer');

    if (coverage === 0) return;

    const premultiplied = premultiplyAir32Color(color);
    const alpha = premultiplied[3];

    for (let channel = 0; channel < 3; channel++) {
        destination[offset + channel] = blendAir32Component(destination[offset + channel], premultiplied[channel], alpha, coverage);
    }

    destination[offset + 3] = blendAir32Component(destination[offset + 3], alpha, alpha, coverage);
}

export function setAir32NormalRetainedCoverage(destination: Uint8Array | Uint8ClampedArray, offset: number, color: RgbaBytes, coverage: number): void {
    if (!(destination instanceof Uint8Array || destination instanceof Uint8ClampedArray)) throw new TypeError('destination must be an 8-bit typed array');

    if (!Number.isSafeInteger(offset) || offset < 0 || offset + 3 >= destination.length) throw new RangeError('retained destination offset is out of bounds');

    if (!Number.isInteger(coverage) || coverage < 0 || coverage > 255) throw new RangeError('coverage must be an 8-bit integer');

    if (coverage === 0) return;

    const foreground = normalizeOpaqueForeground(color);

    destination[offset] = (foreground[0] * (coverage + 1)) >> 8;
    destination[offset + 1] = (foreground[1] * (coverage + 1)) >> 8;
    destination[offset + 2] = (foreground[2] * (coverage + 1)) >> 8;
    destination[offset + 3] = coverage;
}

export function compositeAir32RetainedToOpaque(retained: Uint8Array | Uint8ClampedArray, background: RgbaBytes): Uint8ClampedArray {
    if (!(retained instanceof Uint8Array || retained instanceof Uint8ClampedArray) || retained.length % 4 !== 0) {
        throw new TypeError('retained must contain premultiplied RGBA bytes');
    }

    const backgroundColor = normalizeOpaqueBackground(background);
    const pixels = new Uint8ClampedArray(retained.length);

    for (let offset = 0; offset < retained.length; offset += 4) {
        const inverseAlpha = 256 - retained[offset + 3];

        for (let channel = 0; channel < 3; channel++) {
            pixels[offset + channel] = Math.min(255, retained[offset + channel] + ((backgroundColor[channel] * inverseAlpha) >> 8));
        }

        pixels[offset + 3] = 255;
    }

    return pixels;
}

function normalizeOpaqueForeground(color: RgbaBytes): RgbaBytes {
    if ((!Array.isArray(color) && !ArrayBuffer.isView(color))
        || color.length !== 4
        || Array.from(color).some(channel => !Number.isInteger(channel) || channel < 0 || channel > 255)) {
        throw new RangeError('foreground must contain RGBA bytes');
    }

    if (color[3] !== 255) throw new RangeError('exact AIR32 NORMAL retained rendering requires opaque text');

    return color;
}

function normalizeOpaqueBackground(color: RgbaBytes): RgbaBytes {
    if ((!Array.isArray(color) && !ArrayBuffer.isView(color))
        || color.length !== 4
        || Array.from(color).some(channel => !Number.isInteger(channel) || channel < 0 || channel > 255)) {
        throw new RangeError('background must contain RGBA bytes');
    }

    if (color[3] !== 255) throw new RangeError('retained destination background must be opaque');

    return color;
}
