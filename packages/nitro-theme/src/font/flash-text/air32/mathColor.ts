/**
 * AIR's integer colour arithmetic: ties-to-even rounding, alpha quantisation and the
 * premultiplied blend every glyph pixel goes through.
 *
 * Ported from Sulake's own JavaScript build of the Habbo client, where this code reproduces
 * Adobe AIR 51's text rasterizer bit for bit. Every float goes through `Math.fround` exactly
 * where AIR used a 32-bit float - reordering or "simplifying" the arithmetic changes pixels.
 */

import { RgbaBytes } from './types';

export function roundTiesEven(value: number): number {
    if (!Number.isFinite(value)) throw new TypeError('value must be finite');

    const whole = Math.floor(value);
    const fraction = value - whole;

    return fraction < 0.5 ? whole : fraction > 0.5 ? whole + 1 : whole % 2 === 0 ? whole : whole + 1;
}

export function roundRationalTiesEven(numerator: number, denominator: number): number {
    if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator) || numerator < 0 || denominator <= 0) {
        throw new RangeError('roundRationalTiesEven requires safe non-negative integers');
    }

    const quotient = Math.floor(numerator / denominator);
    const doubledRemainderOffset = (numerator - quotient * denominator) * 2 - denominator;

    return doubledRemainderOffset < 0 ? quotient : doubledRemainderOffset > 0 ? quotient + 1 : quotient % 2 === 0 ? quotient : quotient + 1;
}

export function quantizeAir32AlphaMultiplier(alphaMultiplier: number): number {
    if (!Number.isFinite(alphaMultiplier)) throw new TypeError('alphaMultiplier must be finite');

    const scaled = Math.max(0, Math.min(256, Math.floor(Math.max(0, Math.min(1, alphaMultiplier)) * 256)));

    return Math.max(0, scaled - 1);
}

export function premultiplyAir32Color(color: RgbaBytes): number[] {
    const channels = normalizeColor(color);
    const alpha = channels[3];
    const alphaFactor = alpha + 1;

    return [ Math.floor((channels[0] * alphaFactor) / 256), Math.floor((channels[1] * alphaFactor) / 256), Math.floor((channels[2] * alphaFactor) / 256), alpha ];
}

export function blendAir32Component(destination: number, foregroundPremultiplied: number, globalAlpha: number, mask: number): number {
    for (const [ label, component ] of Object.entries({ destination, foregroundPremultiplied, globalAlpha, mask })) {
        if (!Number.isInteger(component) || component < 0 || component > 255) throw new RangeError(`${label} must be an integer from 0 through 255`);
    }

    const attenuatedDestination = Math.floor((destination * globalAlpha) / 256);
    const delta = foregroundPremultiplied - attenuatedDestination;

    return clampByte(destination + Math.floor((delta * mask) / 256));
}

function clampByte(value: number): number {
    return Math.max(0, Math.min(255, value));
}

function normalizeColor(color: RgbaBytes): RgbaBytes {
    if (!Array.isArray(color) && !ArrayBuffer.isView(color)) throw new TypeError('color must be an RGBA array');

    if (color.length !== 4 || Array.from(color).some(channel => !Number.isInteger(channel) || channel < 0 || channel > 255)) {
        throw new RangeError('RGBA channels must be integers from 0 through 255');
    }

    return color;
}
