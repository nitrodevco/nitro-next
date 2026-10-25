/** ColorTransitioner (2026 `com.sulake.room.utils.ColorTransitioner`): linear fade, then the target. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

// Lightness is the low byte of the HSL value; a stand-in that keeps the RGB and swaps the low byte makes the fade observable.
const ColorConverter = { rgbToHSL: rgb => rgb, hslToRGB: hsl => hsl };

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-renderer/src/room/utils/ColorTransitioner.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};
    runInNewContext(outputText, { exports, require: (name) => {
        assert.equal(name, '@nitrodevco/nitro-api');
        return { ColorConverter };
    } });
    return exports.ColorTransitioner;
};

await test('nothing to update before a transition starts', () => {
    const ColorTransitioner = load();

    assert.equal(new ColorTransitioner().updateColor(1000), false);
});

await test('half way is the channel and brightness midpoint, truncated', () => {
    const ColorTransitioner = load();
    const fade = new ColorTransitioner(0xFFFFFF, 0xFF);

    fade.startTransition(0x0000FF, 0x7F, 1000);

    assert.equal(fade.updateColor(1750), true);
    // red and green 255 -> 0 at 0.5 is 127.5 (shifted to 127), blue stays 255; brightness 255 -> 127 is 191.
    assert.equal(fade.color, (0x7F7FFF & 0xFFFF00) + 191);
});

await test('at the end of the transition it holds the target and stops', () => {
    const ColorTransitioner = load();
    const fade = new ColorTransitioner();

    fade.startTransition(0x123456, 0x40, 1000);

    assert.equal(fade.updateColor(2500), true);
    assert.equal(fade.color, (0x123456 & 0xFFFF00) + 0x40);
    assert.equal(fade.updateColor(3000), false);
});
