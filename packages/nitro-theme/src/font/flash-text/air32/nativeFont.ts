/**
 * Loads a captured font bundle: the IMP1 outline of every glyph AIR rendered, next to the
 * `DefineFont3` advances and kerning the SWF embedded, turned into the lookup maps the text
 * renderer reads.
 */

import { parseImp1 } from './imp1';
import { NativeFont, NativeFontBundle, NativeGlyph, NativeGlyphBundle, NativeGlyphLookup, NativeGlyphRecord, NativeProfile, NativeProfileSource, SwfFont } from './types';

function decodeNativeGlyph(record: NativeGlyphRecord): NativeGlyph {
    const imp1 = parseImp1(decodeBase64(record.imp1Base64));

    if (imp1.userId !== record.codepoint) throw new Error(`IMP1 user id does not match U+${record.codepoint.toString(16)}`);

    const renders = (record.renders ?? []).map((render) => {
        const rawImage = render.rawImageBase64 ? decodeBase64(render.rawImageBase64) : null;

        if (rawImage && rawImage.length !== render.rowStride * render.imageHeight) {
            throw new Error(`raw mapper image has an invalid size for U+${record.codepoint.toString(16)}`);
        }

        return { ...render, rawImage };
    });

    return { ...record, imp1, renders };
}

/**
 * A profile's glyphs by code point, each decoded the first time it is drawn. A bundle carries
 * every glyph of the Latin script and its punctuation, and a text uses a handful of them:
 * decoding them all up front costs start-up time and holds outlines nothing draws.
 */
class LazyNativeGlyphs implements NativeGlyphLookup {
    private readonly records = new Map<number, NativeGlyphRecord>();
    private readonly decoded = new Map<number, NativeGlyph>();

    constructor(records: readonly NativeGlyphRecord[]) {
        this.add(records);
    }

    public add(records: readonly NativeGlyphRecord[]): void {
        for (const record of records) this.records.set(record.codepoint, record);
    }

    public get size(): number {
        return this.records.size;
    }

    public has(codepoint: number): boolean {
        return this.records.has(codepoint);
    }

    public get(codepoint: number): NativeGlyph | undefined {
        let glyph = this.decoded.get(codepoint);

        if (glyph) return glyph;

        const record = this.records.get(codepoint);

        if (!record) return undefined;

        glyph = decodeNativeGlyph(record);
        this.decoded.set(codepoint, glyph);

        return glyph;
    }
}

function prepareAir32NativeProfile(profile: NativeProfileSource): NativeProfile {
    if (!profile || !Array.isArray(profile.glyphs)) throw new TypeError('native profile must contain a glyphs array');

    for (const record of profile.glyphs) {
        if (!Number.isSafeInteger(record.codepoint) || typeof record.imp1Base64 != 'string') {
            throw new TypeError('native glyph records require codepoint and imp1Base64');
        }
    }

    return {
        schemaVersion: profile.schemaVersion,
        runtime: profile.runtime,
        fontSha256: profile.fontSha256,
        glyphs: new LazyNativeGlyphs(profile.glyphs),
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
    const profile = Array.isArray(nativeProfile.glyphs) ? prepareAir32NativeProfile(nativeProfile as NativeProfileSource) : nativeProfile as NativeProfile;

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
const NATIVE_GLYPHS_FORMAT = 'air32-native-glyphs-v1';

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

/**
 * Adds a glyph bundle's outlines to a face prepared from its font bundle: the scripts the boot
 * bundle leaves out (Cyrillic, Greek, Latin Extended-B and the rest the font has). They must be the
 * same font, and every glyph one the font's `DefineFont3` metrics have and the face does not draw
 * yet. Returns how many glyphs it added.
 */
export function extendAir32NativeFont(font: NativeFont, bundle: NativeGlyphBundle): number {
    if (!bundle || bundle.schemaVersion !== 1 || bundle.format !== NATIVE_GLYPHS_FORMAT || !Array.isArray(bundle.glyphs)) throw new TypeError(`glyph bundle must use ${NATIVE_GLYPHS_FORMAT}`);

    if (bundle.fontKey !== font.fontKey) throw new Error(`glyph bundle ${bundle.fontKey} is not for ${font.fontKey}`);

    if (bundle.fontSha256 != null && font.profile.fontSha256 != null && bundle.fontSha256 !== font.profile.fontSha256) throw new Error('glyph bundle font hash does not match the face');

    const glyphs = font.profile.glyphs;

    if (!(glyphs instanceof LazyNativeGlyphs)) throw new TypeError('the face was not prepared from a native bundle');

    for (const record of bundle.glyphs) {
        if (!Number.isSafeInteger(record.codepoint) || typeof record.imp1Base64 != 'string') throw new TypeError('native glyph records require codepoint and imp1Base64');

        if (!font.swfGlyphs.has(record.codepoint)) throw new Error(`DefineFont3 metrics are missing U+${record.codepoint.toString(16).toUpperCase()}`);

        if (glyphs.has(record.codepoint)) throw new Error(`the face already has U+${record.codepoint.toString(16).toUpperCase()}`);
    }

    glyphs.add(bundle.glyphs);

    return bundle.glyphs.length;
}
