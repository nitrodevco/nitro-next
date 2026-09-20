/**
 * Loads a captured font bundle: the IMP1 outline of every glyph AIR rendered, next to the
 * `DefineFont3` advances and kerning the SWF embedded, turned into the lookup maps the text
 * renderer reads.
 */

import { parseImp1 } from './imp1';
import { NativeFont, NativeFontBundle, NativeGlyph, NativeProfile, NativeProfileSource, SwfFont } from './types';

function prepareAir32NativeProfile(profile: NativeProfileSource): NativeProfile {
    if (!profile || !Array.isArray(profile.glyphs)) throw new TypeError('native profile must contain a glyphs array');

    const glyphs = new Map<number, NativeGlyph>();

    for (const record of profile.glyphs) {
        if (!Number.isSafeInteger(record.codepoint) || typeof record.imp1Base64 != 'string') {
            throw new TypeError('native glyph records require codepoint and imp1Base64');
        }

        const imp1 = parseImp1(decodeBase64(record.imp1Base64));

        if (imp1.userId !== record.codepoint) throw new Error(`IMP1 user id does not match U+${record.codepoint.toString(16)}`);

        const renders = (record.renders ?? []).map((render) => {
            const rawImage = render.rawImageBase64 ? decodeBase64(render.rawImageBase64) : null;

            if (rawImage && rawImage.length !== render.rowStride * render.imageHeight) {
                throw new Error(`raw mapper image has an invalid size for U+${record.codepoint.toString(16)}`);
            }

            return { ...render, rawImage };
        });

        glyphs.set(record.codepoint, { ...record, imp1, renders });
    }

    return {
        schemaVersion: profile.schemaVersion,
        runtime: profile.runtime,
        fontSha256: profile.fontSha256,
        glyphs,
        source: profile,
    };
}

function decodeBase64(base64: string): Uint8Array {
    if (typeof globalThis.atob == 'function') {
        const binary = globalThis.atob(base64);
        const bytes = new Uint8Array(binary.length);

        for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);

        return bytes;
    }

    throw new Error('a standards-compatible atob implementation is required');
}

function prepareAir32NativeFont(nativeProfile: NativeProfileSource | NativeProfile, swfFont: SwfFont): NativeFont {
    const profile = nativeProfile.glyphs instanceof Map ? nativeProfile as NativeProfile : prepareAir32NativeProfile(nativeProfile as NativeProfileSource);

    if (!swfFont
        || !Number.isSafeInteger(swfFont.emSquare)
        || !Array.isArray(swfFont.glyphs)
        || !Array.isArray(swfFont.kerning)) {
        throw new TypeError('swfFont must contain DefineFont3 emSquare, glyphs, and kerning');
    }

    const swfGlyphs = new Map(swfFont.glyphs.map(glyph => [ glyph.code, glyph ] as const));
    const kerning = new Map(swfFont.kerning.map(pair => [ `${pair.leftCode},${pair.rightCode}`, pair.adjustment ] as const));

    return { profile, swfFont, swfGlyphs, kerning };
}

const NATIVE_BUNDLE_FORMAT = 'air32-native-font-bundle-v1';

export function prepareAir32NativeBundle(bundle: NativeFontBundle): NativeFont {
    if (!bundle || bundle.schemaVersion !== 1 || bundle.format !== NATIVE_BUNDLE_FORMAT) throw new TypeError(`native bundle must use ${NATIVE_BUNDLE_FORMAT}`);

    if (typeof bundle.fontKey != 'string' || bundle.fontKey.length === 0) throw new TypeError('native bundle fontKey must be a non-empty string');

    if (!bundle.nativeProfile
        || !Array.isArray(bundle.nativeProfile.glyphs)
        || !bundle.swfFont
        || !Array.isArray(bundle.swfFont.glyphs)) {
        throw new TypeError('native bundle must contain nativeProfile and swfFont glyphs');
    }

    if (bundle.fontSha256 != null
        && bundle.nativeProfile.fontSha256 != null
        && bundle.fontSha256 !== bundle.nativeProfile.fontSha256) {
        throw new Error('native bundle font hash does not match its IMP1 profile');
    }

    const codepoints = new Set<number>();

    for (const glyph of bundle.nativeProfile.glyphs) {
        if (!Number.isSafeInteger(glyph.codepoint) || codepoints.has(glyph.codepoint)) throw new Error('native bundle contains an invalid or duplicate codepoint');

        codepoints.add(glyph.codepoint);
    }

    const metricCodes = new Set(bundle.swfFont.glyphs.map(glyph => glyph.code));
    const missing = [ ...codepoints ].filter(codepoint => !metricCodes.has(codepoint));

    if (missing.length) throw new Error(`DefineFont3 metrics are missing U+${missing[0].toString(16).toUpperCase()}`);

    if (bundle.coverage?.codepointCount != null && bundle.coverage.codepointCount !== codepoints.size) {
        throw new Error('native bundle coverage count does not match its glyphs');
    }

    if (bundle.coverage?.imp1GlyphCount != null && bundle.coverage.imp1GlyphCount !== codepoints.size) {
        throw new Error('native bundle IMP1 count does not match its glyphs');
    }

    if (bundle.coverage?.metricGlyphCount != null && bundle.coverage.metricGlyphCount !== metricCodes.size) {
        throw new Error('native bundle metric count does not match its glyphs');
    }

    return {
        ...prepareAir32NativeFont(bundle.nativeProfile, bundle.swfFont),
        fontKey: bundle.fontKey,
        bundleMetadata: Object.freeze({
            schemaVersion: bundle.schemaVersion,
            format: bundle.format,
            fontKey: bundle.fontKey,
            fontSha256: bundle.fontSha256 ?? null,
            runtime: bundle.runtime ?? bundle.nativeProfile.runtime ?? null,
            coverage: bundle.coverage == null ? null : { ...bundle.coverage },
        }),
    };
}
