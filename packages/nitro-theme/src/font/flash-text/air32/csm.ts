/**
 * "Continuous Stroke Modulation": how a `TextField`'s `sharpness` and `thickness` become the
 * inside/outside distance cut-offs that turn a glyph's distance field into coverage
 * (`AntiAliasType.ADVANCED`). The tables are AIR's own, one set per font hint.
 *
 * Ported from Sulake's own JavaScript build of the Habbo client, where this code reproduces
 * Adobe AIR 51's text rasterizer bit for bit. Every float goes through `Math.fround` exactly
 * where AIR used a 32-bit float - reordering or "simplifying" the arithmetic changes pixels.
 */

import { ColorType, CsmCutoffs, CsmRecord, CsmTable } from './types';

const AIR32_CSM_TABLE_DEFAULT: CsmTable = Object.freeze({
    dark: Object.freeze([
        Object.freeze({ pixelSize: 8, outside: -0.5299999713897705, inside: 0.25, gamma: 1 }),
        Object.freeze({ pixelSize: 12, outside: -0.4399999976158142, inside: 0.20000000298023224, gamma: 1 }),
        Object.freeze({
            pixelSize: 13.333333969116211,
            outside: -0.43799999356269836,
            inside: 0.23800000548362732,
            gamma: 1,
        }),
        Object.freeze({
            pixelSize: 26.666667938232422,
            outside: -0.6000000238418579,
            inside: 0.4000000059604645,
            gamma: 1,
        }),
    ]),
    light: Object.freeze([
        Object.freeze({ pixelSize: 8, outside: -0.824999988079071, inside: 0.07500000298023224, gamma: 1 }),
        Object.freeze({ pixelSize: 12, outside: -0.824999988079071, inside: 0.02500000037252903, gamma: 1 }),
        Object.freeze({ pixelSize: 16, outside: -0.8199999928474426, inside: 0.11999999731779099, gamma: 1 }),
        Object.freeze({
            pixelSize: 26.666667938232422,
            outside: -0.8600000143051147,
            inside: 0.3400000035762787,
            gamma: 1,
        }),
    ]),
});

const AIR32_CSM_DARK_DEFAULT = AIR32_CSM_TABLE_DEFAULT.dark;

const AIR32_CSM_TABLE_VARIANT_1: CsmTable = Object.freeze({
    dark: Object.freeze([
        Object.freeze({ pixelSize: 8, outside: -0.4399999976158142, inside: 0.4359999895095825, gamma: 1 }),
        Object.freeze({
            pixelSize: 10.666666984558105,
            outside: -0.4300000071525574,
            inside: 0.49399998784065247,
            gamma: 1,
        }),
        Object.freeze({ pixelSize: 12, outside: -0.41999998688697815, inside: 0.5600000023841858, gamma: 1 }),
        Object.freeze({
            pixelSize: 17.33333396911621,
            outside: -0.41999998688697815,
            inside: 0.5600000023841858,
            gamma: 1,
        }),
        Object.freeze({
            pixelSize: 26.666667938232422,
            outside: -0.4699999988079071,
            inside: 0.6100000143051147,
            gamma: 1,
        }),
    ]),
    light: Object.freeze([
        Object.freeze({ pixelSize: 8, outside: -0.675000011920929, inside: 0.07500000298023224, gamma: 1 }),
        Object.freeze({ pixelSize: 12, outside: -0.5450000166893005, inside: 0.3050000071525574, gamma: 1 }),
        Object.freeze({ pixelSize: 16, outside: -0.5, inside: 0.4399999976158142, gamma: 1 }),
        Object.freeze({
            pixelSize: 26.666667938232422,
            outside: -0.550000011920929,
            inside: 0.6499999761581421,
            gamma: 1,
        }),
    ]),
});

const AIR32_CSM_TABLE_VARIANT_2: CsmTable = Object.freeze({
    dark: Object.freeze([
        Object.freeze({ pixelSize: 8, outside: -0.41999998688697815, inside: 0.5600000023841858, gamma: 1 }),
        Object.freeze({ pixelSize: 16, outside: -0.41999998688697815, inside: 0.5600000023841858, gamma: 1 }),
        Object.freeze({
            pixelSize: 26.666667938232422,
            outside: -0.4699999988079071,
            inside: 0.6100000143051147,
            gamma: 1,
        }),
    ]),
    light: Object.freeze([
        Object.freeze({ pixelSize: 8, outside: -0.574999988079071, inside: 0.17499999701976776, gamma: 1 }),
        Object.freeze({ pixelSize: 12, outside: -0.39500001072883606, inside: 0.45500001311302185, gamma: 1 }),
        Object.freeze({ pixelSize: 16, outside: -0.41999998688697815, inside: 0.5199999809265137, gamma: 1 }),
        Object.freeze({
            pixelSize: 26.666667938232422,
            outside: -0.550000011920929,
            inside: 0.6499999761581421,
            gamma: 1,
        }),
    ]),
});

const AIR32_CSM_TABLES: readonly CsmTable[] = Object.freeze([
    AIR32_CSM_TABLE_DEFAULT,
    AIR32_CSM_TABLE_VARIANT_1,
    AIR32_CSM_TABLE_VARIANT_2,
]);

function interpolateCsmTable(pixelSize: number, table: readonly CsmRecord[] = AIR32_CSM_DARK_DEFAULT): CsmRecord {
    assertFinite('pixelSize', pixelSize);

    if (pixelSize < 0) throw new RangeError('pixelSize must be non-negative');

    if (!Array.isArray(table) || table.length === 0) throw new TypeError('CSM table must contain at least one record');

    const toFloat32 = Math.fround;
    const size = toFloat32(pixelSize);

    if (size <= table[0].pixelSize) return { ...table[0] };

    const lastRecord = table[table.length - 1];

    if (size >= lastRecord.pixelSize) return { ...lastRecord };

    for (let index = 1; index < table.length; index++) {
        const upper = table[index];

        if (size <= upper.pixelSize) {
            const lower = table[index - 1];
            const ratio = toFloat32((size - lower.pixelSize) / (upper.pixelSize - lower.pixelSize));

            return {
                pixelSize: size,
                outside: toFloat32(lower.outside + (upper.outside - lower.outside) * ratio),
                inside: toFloat32(lower.inside + (upper.inside - lower.inside) * ratio),
                gamma: lower.gamma,
            };
        }
    }

    return { ...lastRecord };
}

function applyTextFieldControlsToCutoffs(base: CsmCutoffs, pixelSize: number, thickness: number, sharpness: number): CsmCutoffs {
    assertFinite('base.outside', base.outside);
    assertFinite('base.inside', base.inside);
    assertFinite('pixelSize', pixelSize);
    assertFinite('thickness', thickness);
    assertFinite('sharpness', sharpness);

    const sharpnessOffset = Math.max(-400, Math.min(400, sharpness)) / 1e4;
    const thicknessOffset = Math.max(-200, Math.min(200, thickness)) / 1e4;

    return { outside: base.outside + pixelSize * (sharpnessOffset / 2 - thicknessOffset), inside: base.inside - pixelSize * (sharpnessOffset / 2 + thicknessOffset), gamma: base.gamma ?? 1 };
}

export function resolveAir32TextFieldCsm(pixelSize: number, thickness: number = 0, sharpness: number = 0, colorType: ColorType = 'dark', csmTableHint: number = 0): CsmCutoffs {
    if (!Number.isInteger(csmTableHint) || csmTableHint < 0 || csmTableHint >= AIR32_CSM_TABLES.length) throw new RangeError('csmTableHint must be 0, 1, or 2');

    const table = AIR32_CSM_TABLES[csmTableHint][colorType];

    if (!table) throw new RangeError('colorType must be dark or light');

    return applyTextFieldControlsToCutoffs(interpolateCsmTable(pixelSize, table), pixelSize, thickness, sharpness);
}

export function air32DistanceToMask(distance: number, outside: number, inside: number): number {
    assertFinite('distance', distance);
    assertFinite('outside', outside);
    assertFinite('inside', inside);

    if (outside > inside) throw new RangeError('outside cutoff must be <= inside cutoff');

    if (distance < outside) return 0;

    if (distance >= inside || outside === inside) return 255;

    const toFloat32 = Math.fround;
    const scale = toFloat32(1 / (inside - outside));
    const offset = toFloat32(-outside * scale);
    const coverage = toFloat32(toFloat32(distance * scale) + offset);

    return roundTiesEvenInteger(toFloat32(coverage * 255));
}

export function normalSampleCountToDensity(coveredSamples: number): number {
    if (!Number.isInteger(coveredSamples) || coveredSamples < 0 || coveredSamples > 16) throw new RangeError('coveredSamples must be an integer from 0 through 16');

    return coveredSamples === 0 ? 0 : coveredSamples * 16 - 1;
}

function assertFinite(label: string, value: number): void {
    if (!Number.isFinite(value)) throw new TypeError(`${label} must be a finite number`);
}

function roundTiesEvenInteger(value: number): number {
    const whole = Math.floor(value);
    const fraction = value - whole;

    return fraction < 0.5 ? whole : fraction > 0.5 ? whole + 1 : whole % 2 === 0 ? whole : whole + 1;
}
