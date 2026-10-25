/**
 * The boot font bundle carries the Latin script and its punctuation; the fonts' other scripts
 * (Cyrillic, Greek, Latin Extended-B, ...) arrive in `fonts-extended`, fetched the first time a
 * text needs one of their glyphs. The boot bundle has the `DefineFont3` metrics of every glyph,
 * so a glyph the font has but the face cannot draw yet starts that load - once - and a character
 * the font lacks (an emoji) never does. Once the glyphs are registered the same text is exact.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const read = path => readFileSync(new URL(`../packages/${path}`, import.meta.url), 'utf8');

const load = (path, dependencies) => {
    const { outputText } = ts.transpileModule(read(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, { exports, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    } });

    return exports;
};

const FT = 'nitro-theme/src/font/flash-text';

/** A fresh renderer (its own font table and loader state) over the real bundle loader. */
const loadRenderer = () => {
    const nativeFont = load(`${FT}/air32/nativeFont.ts`, { './imp1': { parseImp1: () => assert.fail('nothing is drawn here') } });

    return load(`${FT}/FlashTextRenderer.ts`, {
        './air32/Air32NativeTextRenderer': {
            Air32NativeTextRenderer: class {},
            layoutNativeText: (_font, text) => ({ placements: [], rawTextWidth: text.length * 5, textWidth: text.length * 5, fieldWidth: text.length * 5 + 4 }),
            layoutNormalText: () => assert.fail('advanced text only'),
        },
        './air32/mathColor': { roundTiesEven: Math.round },
        './air32/nativeFont': nativeFont,
    });
};

const SHA = 'f0'.repeat(32);
const LATIN = [ 0x41, 0x62, 0xe9 ];
const CYRILLIC = [ 0x416, 0x438 ];
const glyph = codepoint => ({ codepoint, imp1Base64: 'AA==' });

/** Ubuntu with metrics for Latin, Cyrillic and a space, and outlines for the Latin glyphs only. */
const bootBundle = () => ({
    schemaVersion: 1,
    format: 'air32-native-font-bundle-v1',
    fontKey: 'Ubuntu-R',
    fontSha256: SHA,
    nativeProfile: { fontSha256: SHA, glyphs: LATIN.map(glyph) },
    swfFont: {
        emSquare: 1024,
        metrics: { ascent: 950, descent: 250, leading: 0 },
        glyphs: [ ...LATIN, ...CYRILLIC ].map((code, index) => ({ index, code, advance: 500, hasInk: true })).concat({ index: 9, code: 0x20, advance: 250, hasInk: false }),
        kerning: [],
    },
});

const glyphBundle = (overrides = {}) => ({ schemaVersion: 1, format: 'air32-native-glyphs-v1', fontKey: 'Ubuntu-R', fontSha256: SHA, glyphs: CYRILLIC.map(glyph), ...overrides });

const FORMAT = { fontFamily: 'Ubuntu', bold: false, italic: false, fontSize: 12, letterSpacing: 0, thickness: 0, sharpness: 0, gridFitType: 'pixel', antiAliasType: 'advanced', kerning: true };

const setup = () => {
    const renderer = loadRenderer();
    const requests = [];
    let land;

    renderer.registerNativeFontBundle('Ubuntu', '400', 'normal', bootBundle());
    renderer.setMissingGlyphLoader(() => {
        requests.push(renderer.FlashTextRenderer.revision);

        return new Promise((resolve) => {
            land = () => {
                renderer.registerNativeGlyphs('Ubuntu', '400', 'normal', glyphBundle());
                resolve();
            };
        });
    });

    return { renderer, FlashTextRenderer: renderer.FlashTextRenderer, requests, land: () => land() };
};

await test('Latin text is exact from the boot bundle and loads nothing', () => {
    const { FlashTextRenderer, requests } = setup();

    assert.equal(FlashTextRenderer.supports(FORMAT, 'Ab é'), true);
    assert.equal(requests.length, 0);
    assert.equal(FlashTextRenderer.glyphsPending, false);
});

await test('a character the font has no glyph for at all (emoji) falls back without loading', () => {
    const { FlashTextRenderer, requests } = setup();

    assert.match(FlashTextRenderer.unsupportedReason(FORMAT, 'Ab \u{1F600}'), /no glyph/);
    assert.equal(requests.length, 0);
});

await test('a Cyrillic text falls back, loads the extended glyphs once, and is exact once they land', async () => {
    const { FlashTextRenderer, requests, land } = setup();
    const revision = FlashTextRenderer.revision;
    let notified = 0;

    FlashTextRenderer.onGlyphsAdded(() => notified++);

    assert.match(FlashTextRenderer.unsupportedReason(FORMAT, 'Жи'), /U\+0416/);
    assert.equal(FlashTextRenderer.measure('Жи', FORMAT), null);
    assert.equal(requests.length, 1, 'one load however many texts ask');
    assert.equal(FlashTextRenderer.glyphsPending, true);

    land();
    await new Promise(resolve => setTimeout(resolve, 0));

    assert.equal(FlashTextRenderer.glyphsPending, false);
    assert.equal(notified, 1);
    assert.ok(FlashTextRenderer.revision > revision, 'the revision moves so cached measures are redone');
    assert.equal(FlashTextRenderer.supports(FORMAT, 'Жи Ab'), true);
    assert.equal(FlashTextRenderer.measure('Жи', FORMAT), 10);
    assert.equal(requests.length, 1);
});

await test('a failed load stops waiting texts from waiting and is not retried', async () => {
    const renderer = loadRenderer();
    let calls = 0;
    let notified = 0;

    renderer.registerNativeFontBundle('Ubuntu', '400', 'normal', bootBundle());
    renderer.setMissingGlyphLoader(() => {
        calls++;

        return Promise.resolve();
    });
    renderer.FlashTextRenderer.onGlyphsAdded(() => notified++);

    assert.equal(renderer.FlashTextRenderer.supports(FORMAT, 'Ж'), false);
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(renderer.FlashTextRenderer.supports(FORMAT, 'Ж'), false);
    assert.equal(calls, 1);
    assert.equal(notified, 1);
    assert.equal(renderer.FlashTextRenderer.glyphsPending, false);
});

await test('a glyph bundle for another font, or with a glyph the metrics lack, is refused whole', () => {
    const { renderer, FlashTextRenderer } = setup();

    assert.throws(() => renderer.registerNativeGlyphs('Ubuntu', '400', 'normal', glyphBundle({ fontSha256: 'ab'.repeat(32) })), /font hash/);
    assert.throws(() => renderer.registerNativeGlyphs('Ubuntu', '400', 'normal', glyphBundle({ glyphs: [ glyph(0x416), glyph(0x3a9) ] })), /U\+3A9/);
    assert.throws(() => renderer.registerNativeGlyphs('Ubuntu', '400', 'normal', glyphBundle({ glyphs: [ glyph(0x41) ] })), /already has U\+41/);
    assert.equal(FlashTextRenderer.supports(FORMAT, 'Ж'), false, 'nothing of a refused bundle is added');
});
