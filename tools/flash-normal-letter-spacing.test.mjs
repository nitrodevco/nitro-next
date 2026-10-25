/**
 * Flash's `TextFormat.letterSpacing` applies to a text field whatever its anti-aliasing: the window
 * manager's `spacing` property (`TextController.setSpacing`) sets it on the field without looking
 * at `antiAliasType`. Volter's normal anti-aliasing takes it as the advanced faces do - added to the
 * pen after every glyph - so a layout's `spacing` over a style a theme sets in Volter stays exact
 * (drawn and measured) instead of falling back to browser text with no measured size.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const FT = new URL('../packages/nitro-theme/src/font/flash-text/', import.meta.url);

/** Transpiles a flash-text module and the relative modules it imports, each once. */
const modules = new Map();
const load = (url) => {
    if (modules.has(url.href)) return modules.get(url.href);

    const { outputText } = ts.transpileModule(readFileSync(url, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    modules.set(url.href, exports);
    runInNewContext(outputText, { exports, console, atob, Uint8Array, require: (name) => {
        assert.ok(name.startsWith('.'), `Unexpected dependency: ${name}`);

        return load(new URL(`${name}.ts`, url));
    } });

    return exports;
};

const { layoutNormalText, Air32NativeTextRenderer } = load(new URL('air32/Air32NativeTextRenderer.ts', FT));
const { prepareAir32NativeBundle } = load(new URL('air32/nativeFont.ts', FT));
const renderer = load(new URL('FlashTextRenderer.ts', FT));

const volterBundle = JSON.parse(readFileSync(new URL('../packages/nitro-react/public/assets/fonts/volter.air51.json', import.meta.url), 'utf8'));
const volter = prepareAir32NativeBundle(volterBundle);

renderer.registerNativeFontBundle('Volter', '400', 'normal', volterBundle);

const TEXT = 'May the credits be';
const FORMAT = { fontFamily: 'Volter', bold: false, italic: false, fontSize: 18, letterSpacing: -0.6, leading: 0, thickness: 0, sharpness: 0, gridFitType: 'pixel', antiAliasType: 'normal', kerning: false, stageQuality: 'low', normalPenLayout: 'units', colorTransform: null, color: 0 };

await test('a letter spacing moves every glyph of a units run by its index times the spacing, and the width by its length', () => {
    const plain = layoutNormalText(volter, TEXT, 18, false, 'units');
    const spaced = layoutNormalText(volter, TEXT, 18, false, 'units', -0.6);

    spaced.placements.forEach((placement, index) => assert.ok(Math.abs(placement.penX - (plain.placements[index].penX - (index * 0.6))) < 1e-9, `glyph ${index}`));
    assert.ok(Math.abs(spaced.rawTextWidth - (plain.rawTextWidth - (TEXT.length * 0.6))) < 1e-9);
    assert.equal(spaced.textWidth, Math.floor(spaced.rawTextWidth * 20) / 20);
    assert.equal(spaced.fieldWidth, spaced.textWidth + 4);
});

await test('the twips pen takes the spacing in whole twips', () => {
    const plain = layoutNormalText(volter, TEXT, 9, true, 'twips');
    const spaced = layoutNormalText(volter, TEXT, 9, true, 'twips', -0.6);

    spaced.placements.forEach((placement, index) => assert.equal(placement.penTwips, plain.placements[index].penTwips - (index * 12)));
    assert.equal(spaced.textWidth, plain.textWidth - (TEXT.length * 0.6));
});

await test('no spacing lays a run out exactly as before', () => {
    assert.deepEqual(layoutNormalText(volter, TEXT, 9, true, 'units', 0), layoutNormalText(volter, TEXT, 9, true, 'units'));
    assert.deepEqual(layoutNormalText(volter, TEXT, 9, true, 'twips', 0), layoutNormalText(volter, TEXT, 9, true, 'twips'));
});

await test('Volter normal text with a letter spacing is exact: supported, measured and drawn', () => {
    const { FlashTextRenderer } = renderer;

    assert.equal(FlashTextRenderer.unsupportedReason(FORMAT, TEXT), null);

    const width = FlashTextRenderer.measure(TEXT, FORMAT);
    const plainWidth = FlashTextRenderer.measure(TEXT, { ...FORMAT, letterSpacing: 0 });

    assert.ok(width !== null && plainWidth !== null);
    assert.ok(Math.abs(width - (plainWidth - (TEXT.length * 0.6))) <= 0.05, `${width} vs ${plainWidth}`);

    const result = new Air32NativeTextRenderer(volter).render(TEXT, { size: 18, antiAliasType: 'normal', gridFitType: 'pixel', kerning: false, letterSpacing: -0.6, stageQuality: 'low', normalPenLayout: 'units' });

    assert.ok(result.width > 0 && result.height > 0);
});

await test('a letter spacing that is not a number still falls back', () => {
    assert.match(renderer.FlashTextRenderer.unsupportedReason({ ...FORMAT, letterSpacing: Number.NaN }, TEXT), /letter spacing NaN/);
});
