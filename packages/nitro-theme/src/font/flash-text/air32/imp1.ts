/**
 * IMP1 is AIR's own glyph outline format, captured from the running player. This module parses
 * a block, transforms and flattens it, works out where the glyph lands on the device grid
 * (including the font's standard alignment zones) and rasterizes it into LCD sub-pixel masks.
 *
 * Ported from Sulake's own JavaScript build of the Habbo client, where this code reproduces
 * Adobe AIR 51's text rasterizer bit for bit. Every float goes through `Math.fround` exactly
 * where AIR used a 32-bit float - reordering or "simplifying" the arithmetic changes pixels.
 */

import { float32Bits, rasterizeAir32AdfDistances, reduceAir32LcdColor } from './adfRasterizer';
import { air32DistanceToMask } from './csm';
import { roundTiesEven } from './mathColor';
import { AdvancedPixelSetup, FlattenedCommand, FlattenedPath, Imp1Glyph, Imp1Raster, Imp1RasterSetup, OutlineLine, PixelSetupOptions, Point, StandardAlignmentZones } from './types';

interface ZoneAxisInput {
    pen: number;
    scale: number;
    normalizedEm: number;
    reference: number;
    emCoordinate: number;
    lcd: boolean;
}

/** One axis of a glyph's placement: the whole-pixel offset and the sub-pixel translation left over. */
interface AxisSetup {
    scaledReference: number;
    biasedPen: number;
    offset: number;
    translation: number;
}

/** An axis snapped to one of the font's alignment zones; `residual` is how far the snap moved the pen. */
interface ZoneAxisSetup extends AxisSetup {
    residual: number;
    zoneCoordinate: number | null;
    centeredPen?: number;
    centeredAnchor?: number;
}

export function air32TransformAndFlattenImp1(imp1: Imp1Glyph, matrix: readonly number[]): FlattenedPath {
    if (!imp1 || !Array.isArray(imp1.commands)) throw new TypeError('imp1 must be a parsed IMP1 glyph');

    if (imp1.pathType !== 0) throw new RangeError('only filled IMP1 paths are currently supported');

    if (!Array.isArray(matrix) || matrix.length < 6 || matrix.slice(0, 6).some(component => !Number.isFinite(component))) {
        throw new TypeError('matrix must contain six finite affine components');
    }

    const toFloat32 = Math.fround;
    const [ scaleX, skewX, translateX, skewY, scaleY, translateY ] = matrix;
    const transformPoint = (x: number, y: number): Point => ({ x: toFloat32(x * scaleX + y * skewX + translateX), y: toFloat32(x * skewY + y * scaleY + translateY) });
    const commands: FlattenedCommand[] = [];
    let current = { x: 0, y: 0 };

    for (const command of imp1.commands) {
        const end = transformPoint(command.x, command.y);

        if (command.opcode === 0) {
            commands.push({ opcode: 0, type: 'move', ...end });
            current = end;

            continue;
        }

        if (command.opcode === 1) {
            commands.push({ opcode: 1, type: 'line', ...end });
            current = end;

            continue;
        }

        if (command.opcode !== 2) throw new RangeError(`unsupported IMP1 opcode ${command.opcode}`);

        const control = transformPoint(command.controlX, command.controlY);
        const deviationX = toFloat32(control.x - (end.x + current.x) * 0.5);
        const deviationY = toFloat32(control.y - (end.y + current.y) * 0.5);
        const deviation = toFloat32(Math.sqrt(deviationX * deviationX + deviationY * deviationY));
        const segmentCount = Math.trunc(Math.sqrt(deviation * 5)) + 1;
        const parameterStep = toFloat32(1 / segmentCount);
        let parameter = parameterStep;

        for (let segment = 1; segment < segmentCount; ++segment) {
            const inverseParameter = toFloat32(1 - parameter);
            const startWeight = toFloat32(inverseParameter * inverseParameter);
            const controlWeight = toFloat32((parameter + parameter) * inverseParameter);
            const endWeight = toFloat32(parameter * parameter);

            commands.push({
                opcode: 1,
                type: 'line',
                x: toFloat32(current.x * startWeight + control.x * controlWeight + end.x * endWeight),
                y: toFloat32(current.y * startWeight + control.y * controlWeight + end.y * endWeight),
            });
            parameter = toFloat32(parameter + parameterStep);
        }

        commands.push({ opcode: 1, type: 'line', ...end });
        current = end;
    }

    return { pathType: imp1.pathType, strokeWidth: 0, commandCount: commands.length, commands };
}

export function air32FlattenedPathToLines(path: FlattenedPath): OutlineLine[] {
    if (!path || !Array.isArray(path.commands)) throw new TypeError('path must contain flattened commands');

    const lines: OutlineLine[] = [];
    let current: Point | null = null;

    for (const command of path.commands) {
        const point = { x: command.x, y: command.y };

        if (command.opcode === 0) {
            current = point;
        } else if (command.opcode === 1) {
            if (current === null) throw new Error('line command precedes a move');

            lines.push({ from: current, to: point });
            current = point;
        } else {
            throw new RangeError(`flattened path retained opcode ${command.opcode}`);
        }
    }

    return lines;
}

const LCD_SUBPIXEL_OFFSETS = Object.freeze([ -1 / 3, 0, 1 / 3 ]);

export function rasterizeAir32Imp1(imp1: Imp1Glyph, setup: Imp1RasterSetup): Imp1Raster {
    validateSetup(setup);

    const lines = air32FlattenedPathToLines(air32TransformAndFlattenImp1(imp1, setup.matrix));
    const rowStride = setup.rowStride ?? setup.width * 4;

    if (!Number.isSafeInteger(rowStride) || rowStride < setup.width * 4) throw new RangeError('rowStride is too small for BGRA8 output');

    const distanceField = rasterizeAir32AdfDistances(lines, setup);
    const pixels = new Uint8Array(rowStride * setup.height);

    for (let row = 0; row < setup.height; row++) {
        for (let column = 0; column < setup.width; column++) {
            const subpixelMasks = LCD_SUBPIXEL_OFFSETS.map((subpixelOffset, subpixelIndex) => {
                const sampleColumn = column * 3 + subpixelIndex - 1;
                const distance = sampleColumn < 0 ? -1e3 : distanceField.values[row * distanceField.width + sampleColumn];

                return air32DistanceToMask(distance, setup.outsideCutoff, setup.insideCutoff);
            });
            const channels = setup.useColorReduction === false
                ? subpixelMasks
                : reduceAir32LcdColor(subpixelMasks[0], subpixelMasks[1], subpixelMasks[2], setup.colorReductionAmount ?? 0.5);
            const offset = row * rowStride + column * 4;

            pixels[offset] = channels[2];
            pixels[offset + 1] = channels[1];
            pixels[offset + 2] = channels[0];
            pixels[offset + 3] = channels[0] || channels[1] || channels[2] ? 255 : 0;
        }
    }

    return { width: setup.width, height: setup.height, rowStride, pixels, lines, distances: distanceField.values };
}

function validateSetup(setup: Imp1RasterSetup): void {
    if (!setup || !Number.isSafeInteger(setup.width) || setup.width < 1 || !Number.isSafeInteger(setup.height) || setup.height < 1) {
        throw new TypeError('setup must contain positive integer width and height');
    }

    for (const property of [ 'outsideCutoff', 'insideCutoff' ] as const) {
        if (!Number.isFinite(setup[property])) throw new TypeError(`setup.${property} must be finite`);
    }
}

const ONE_THIRD = 1 / 3;
const FIVE_THIRDS = 5 / 3;
const ZONE_FIT_ROUNDING_BIAS = 0.800000011920929;
const ZONE_LCD_OFFSET_BIAS = 0.1666666716337204;

export function deriveAir32AdvancedPixelSetup(imp1: Imp1Glyph, options: PixelSetupOptions): AdvancedPixelSetup {
    if (!imp1
        || !Number.isFinite(imp1.normalizedEm)
        || !Number.isFinite(imp1.normalizationFactor)
        || !Number.isFinite(imp1.referenceX)
        || !Number.isFinite(imp1.referenceY)) {
        throw new TypeError('imp1 must contain the parsed native ADF attributes');
    }

    if (imp1.pathType !== 0 || ((imp1.sazMask ?? 0) & -4) !== 0) throw new RangeError('the exact setup currently covers filled glyphs');

    const pointSize = Math.fround(finitePositive(options?.pointSize, 'pointSize'));
    const dpi = options?.dpi ?? 72;

    if (!Number.isSafeInteger(dpi) || dpi <= 0) throw new RangeError('dpi must be a positive integer');

    const displayScaleX = Math.fround(options?.scaleX ?? 1);
    const displayScaleY = Math.fround(options?.scaleY ?? 1);

    if (displayScaleX !== 1 || displayScaleY !== 1) throw new RangeError('only an identity display scale is currently exact');

    const fittedPenX = options?.fittedPenX;
    const fittedPenY = options?.fittedPenY;

    if (!Number.isFinite(fittedPenX) || !Number.isFinite(fittedPenY)) throw new TypeError('fittedPenX and fittedPenY must be finite');

    const toFloat32 = Math.fround;
    const pixelSize = dpi === 72 ? pointSize : toFloat32((pointSize * dpi) / 72);
    const scale = toFloat32(pixelSize / imp1.normalizedEm);
    const standardAlignmentZones = decodeStandardAlignmentZones(imp1);
    const scaleX = fitStandardAlignmentZoneScale(scale, imp1.normalizedEm, standardAlignmentZones.xSpan, 0.5);
    const scaleY = fitStandardAlignmentZoneScale(scale, imp1.normalizedEm, standardAlignmentZones.ySpan, ZONE_FIT_ROUNDING_BIAS);
    const xAxis = (standardAlignmentZones.mask & 1) === 0
        ? { ...setupAxis(toFloat32(fittedPenX), scaleX, imp1.referenceX, true), residual: 0, zoneCoordinate: null }
        : setupStandardAlignmentZoneAxis({
                pen: toFloat32(fittedPenX),
                scale: scaleX,
                normalizedEm: imp1.normalizedEm,
                reference: imp1.referenceX,
                emCoordinate: standardAlignmentZones.xCoordinate,
                lcd: true,
            });
    const yAxis = (standardAlignmentZones.mask & 2) === 0
        ? { ...setupAxis(toFloat32(fittedPenY), scaleY, imp1.referenceY, false), residual: 0, zoneCoordinate: null }
        : setupStandardAlignmentZoneAxis({
                pen: toFloat32(fittedPenY),
                scale: scaleY,
                normalizedEm: imp1.normalizedEm,
                reference: imp1.referenceY,
                emCoordinate: standardAlignmentZones.yCoordinate,
                lcd: false,
            });
    const width = Math.trunc(scaleX + FIVE_THIRDS);
    const height = Math.trunc(scaleY + 1);

    if (width < 1 || height < 1 || width > 65535 || height > 65535) throw new RangeError('derived native glyph image is outside uint16 bounds');

    const normalizedPixelScale = toFloat32(scale * imp1.normalizationFactor);
    const normalizedScaleX = toFloat32(scaleX * imp1.normalizationFactor);
    const normalizedScaleY = toFloat32(scaleY * imp1.normalizationFactor);
    const matrix = Object.freeze([ scaleX, 0, xAxis.translation, 0, scaleY, yAxis.translation, 0, 0, 1 ]);
    const nativeKeyWords = new Uint32Array([
        3,
        0,
        0,
        float32Bits(imp1.referenceX),
        float32Bits(imp1.referenceY),
        float32Bits(scaleX),
        float32Bits(scaleY),
        float32Bits(scale),
        float32Bits(normalizedPixelScale),
        float32Bits(normalizedPixelScale),
        float32Bits(normalizedScaleX),
        float32Bits(normalizedScaleY),
    ]);

    return {
        pointSize,
        dpi,
        pixelSize,
        fittedPenX: toFloat32(fittedPenX),
        fittedPenY: toFloat32(fittedPenY),
        scale,
        scaleX,
        scaleY,
        normalizedScaleX,
        normalizedScaleY,
        residualX: xAxis.residual,
        residualY: yAxis.residual,
        standardAlignmentZones,
        matrix,
        matrixBits: matrix.map(float32Bits),
        width,
        height,
        rowStride: width * 4,
        imageType: 1,
        lcdPhase: 1,
        offsetX: xAxis.offset,
        offsetY: yAxis.offset,
        originX: xAxis.offset,
        originY: -(height + yAxis.offset),
        normalizedPixelScale,
        nativeKeyWords,
    };
}

export function deriveAir32AdvancedRetainedSetup(imp1: Imp1Glyph, options: PixelSetupOptions): AdvancedPixelSetup {
    const lcdSetup = deriveAir32AdvancedPixelSetup(imp1, options);
    const xAxis: AxisSetup & { residual?: number } = (lcdSetup.standardAlignmentZones.mask & 1) === 0
        ? setupAxis(Math.fround(options.fittedPenX), lcdSetup.scaleX, imp1.referenceX, false)
        : setupStandardAlignmentZoneAxis({
                pen: Math.fround(options.fittedPenX),
                scale: lcdSetup.scaleX,
                normalizedEm: imp1.normalizedEm,
                reference: imp1.referenceX,
                emCoordinate: lcdSetup.standardAlignmentZones.xCoordinate,
                lcd: false,
            });
    const width = Math.trunc(lcdSetup.scaleX + 1);

    if (width < 1 || width > 65535) throw new RangeError('derived retained glyph image is outside uint16 bounds');

    const matrix = Object.freeze([ lcdSetup.scaleX, 0, xAxis.translation, 0, lcdSetup.scaleY, lcdSetup.matrix[5], 0, 0, 1 ]);

    return {
        ...lcdSetup,
        matrix,
        matrixBits: matrix.map(float32Bits),
        width,
        rowStride: width,
        imageType: 0,
        lcdPhase: 0,
        offsetX: xAxis.offset,
        originX: xAxis.offset,
        residualX: xAxis.residual ?? 0,
    };
}

function decodeStandardAlignmentZones(imp1: Imp1Glyph): StandardAlignmentZones {
    if (!Array.isArray(imp1?.encodedSaz) || imp1.encodedSaz.length !== 4) throw new TypeError('imp1 must contain four encoded SAZ words');

    const decoded = imp1.encodedSaz.map(float32FromBits);
    const mask = imp1.sazMask ?? 0;

    return Object.freeze({
        mask,
        xCoordinate: (mask & 1) === 0 ? 0 : decoded[0],
        yCoordinate: (mask & 2) === 0 ? 0 : decoded[1],
        xSpan: (mask & 1) === 0 ? 0 : decoded[2],
        ySpan: (mask & 2) === 0 ? 0 : decoded[3],
    });
}

function fitStandardAlignmentZoneScale(scale: number, normalizedEm: number, span: number, roundingBias: number): number {
    const toFloat32 = Math.fround;

    if (span === 0) return toFloat32(scale);

    const emSpan = toFloat32(normalizedEm * span);
    const scaledSpan = toFloat32(toFloat32(scale) * emSpan);
    const fittedSpan = roundingBias === 0.5 ? roundTiesEven(scaledSpan) : Math.trunc(scaledSpan + roundingBias);

    return fittedSpan <= 0 ? toFloat32(scale) : toFloat32(toFloat32(scale) * (fittedSpan / scaledSpan));
}

function setupStandardAlignmentZoneAxis({ pen, scale, normalizedEm, reference, emCoordinate, lcd }: ZoneAxisInput): ZoneAxisSetup {
    const toFloat32 = Math.fround;
    const zoneCoordinate = toFloat32(reference + normalizedEm * emCoordinate);
    const scaledReference = toFloat32(scale * reference);
    const originPen = toFloat32(toFloat32(pen - scaledReference) - 0.5);
    const centeredAnchor = toFloat32(originPen + scale * zoneCoordinate);
    const residual = toFloat32(Math.floor(centeredAnchor) + 0.5 - centeredAnchor);
    const centeredPen = toFloat32(originPen + residual);
    const offset = Math.floor(centeredPen + (lcd ? ZONE_LCD_OFFSET_BIAS : 0.5));
    const translation = toFloat32(centeredPen - offset);

    return {
        scaledReference,
        biasedPen: toFloat32(centeredPen + 0.5),
        centeredPen,
        centeredAnchor,
        zoneCoordinate,
        residual,
        offset,
        translation,
    };
}

const float32View = new DataView(new ArrayBuffer(4));

function float32FromBits(bits: number): number {
    float32View.setUint32(0, bits >>> 0, true);

    return float32View.getFloat32(0, true);
}

export function air32GlyphRasterKey(glyphId: number, setup: AdvancedPixelSetup, extraKeyParts: number[] = []): string {
    if (!Number.isSafeInteger(glyphId)) throw new TypeError('glyphId must be a safe integer');

    return [ glyphId, ...setup.matrixBits, setup.width, setup.height, ...extraKeyParts ].join(':');
}

function setupAxis(pen: number, scale: number, reference: number, lcd: boolean): AxisSetup {
    const toFloat32 = Math.fround;
    const scaledReference = toFloat32(scale * reference);
    const biasedPen = toFloat32(pen - scaledReference);
    const offset = Math.floor(biasedPen - (lcd ? ONE_THIRD : 0));
    const translation = toFloat32(toFloat32(biasedPen - 0.5) - offset);

    return { scaledReference, biasedPen, offset, translation };
}

function finitePositive(value: number, label: string): number {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${label} must be positive and finite`);

    return value;
}

const COMMAND_TYPES = [ 'move', 'line', 'quadratic' ] as const;

export function parseImp1(input: ArrayBuffer | ArrayBufferView): Imp1Glyph {
    const bytes = asUint8Array(input);

    if (bytes.byteLength < 80) throw new RangeError('IMP1 block is shorter than its 0x50-byte header');

    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

    if (view.getUint32(0, true) !== 1229803569) throw new Error('invalid IMP1 magic');

    const totalBytes = view.getUint32(4, true);
    const headerBytes = view.getUint32(8, true);
    const commandCount = view.getUint32(12, true);

    if (headerBytes !== 80) throw new Error(`unsupported IMP1 header size ${headerBytes}`);

    const expectedBytes = headerBytes + commandCount * 20;

    if (totalBytes !== expectedBytes || totalBytes > bytes.byteLength) {
        throw new Error(`inconsistent IMP1 size: header declares ${totalBytes}, commands require ${expectedBytes}`);
    }

    const glyph: Imp1Glyph = {
        magic: 'IMP1',
        totalBytes,
        headerBytes,
        commandCount,
        userId: view.getUint32(16, true),
        normalizationFactor: view.getFloat32(20, true),
        normalizedEm: view.getFloat32(24, true),
        pathType: view.getUint32(28, true),
        strokeWidth: view.getFloat32(32, true),
        referenceX: view.getFloat32(36, true),
        referenceY: view.getFloat32(40, true),
        bounds: {
            xMin: view.getFloat32(44, true),
            yMin: view.getFloat32(48, true),
            xMax: view.getFloat32(52, true),
            yMax: view.getFloat32(56, true),
        },
        encodedSaz: [ view.getUint32(60, true), view.getUint32(64, true), view.getUint32(68, true), view.getUint32(72, true) ],
        sazMask: view.getUint32(76, true),
        commands: [],
    };

    if (glyph.pathType !== 0 && glyph.pathType !== 1) throw new Error(`unsupported IMP1 path type ${glyph.pathType}`);

    for (let index = 0; index < commandCount; index++) {
        const commandOffset = headerBytes + index * 20;
        const opcode = view.getUint32(commandOffset, true);

        if (opcode > 2) throw new Error(`unsupported IMP1 opcode ${opcode}`);

        glyph.commands.push({
            opcode,
            type: COMMAND_TYPES[opcode],
            x: view.getFloat32(commandOffset + 4, true),
            y: view.getFloat32(commandOffset + 8, true),
            controlX: view.getFloat32(commandOffset + 12, true),
            controlY: view.getFloat32(commandOffset + 16, true),
        });
    }

    return glyph;
}

function asUint8Array(input: ArrayBuffer | ArrayBufferView): Uint8Array {
    if (input instanceof Uint8Array) return input;

    if (input instanceof ArrayBuffer) return new Uint8Array(input);

    if (ArrayBuffer.isView(input)) return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);

    throw new TypeError('IMP1 input must be an ArrayBuffer or typed array');
}
