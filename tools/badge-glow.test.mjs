/**
 * `badgeGlow`: `BadgeImageWidget.playGlow`'s timing, curve and filter arguments - a `Timer(16, n)`
 * of `max(1, int(duration / 16))` ticks, `clamp01(1 - (1.75t - 0.7)^2)` per tick, and the outer
 * glow, inner glow and tint built from that strength.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-react/src/views/shared/badgeGlow.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, { exports, Math });

    return exports;
};

// its arrays come from the module's own realm: spread them before a deep compare
const glow = load();

const close = (actual, expected, label) => assert.ok(Math.abs(actual - expected) < 1e-9, `${label}: ${actual} != ${expected}`);

await test('the default glow is 31 ticks of 16 ms; 0 or less plays 1000 ms; at least one tick', () => {
    assert.equal(glow.BADGE_GLOW_DURATION, 500);
    assert.equal(glow.BADGE_GLOW_TICK, 16);
    assert.equal(glow.BADGE_GLOW_IMAGE_TIMEOUT, 5000);
    assert.equal(glow.badgeGlowTicks(), 31);
    assert.equal(glow.badgeGlowTicks(500), 31);
    assert.equal(glow.badgeGlowTicks(0), 62);
    assert.equal(glow.badgeGlowTicks(-5), 62);
    assert.equal(glow.badgeGlowTicks(10), 1);
});

await test('the strength: about half at the first tick, full at 40%, gone at the last tick', () => {
    const ticks = 31;
    const at = count => glow.badgeGlowStrength(count, ticks);

    close(at(1), 1 - ((1.75 / 31) - 0.7) ** 2, 'tick 1');
    assert.ok(at(1) > 0.58 && at(1) < 0.59);
    close(at(12), 1 - ((1.75 * 12 / 31) - 0.7) ** 2, 'tick 12');
    assert.ok(at(12) > 0.999);
    // the curve's top, t = 0.4
    close(glow.badgeGlowStrength(4, 10), 1, 't 0.4');
    assert.ok(at(30) > 0.012 && at(30) < 0.013);
    // 1 - 1.05^2 < 0: clamped
    assert.equal(at(31), 0);
    // rises to tick 12, falls after
    for (let count = 1; count < 12; count++) assert.ok(at(count + 1) > at(count), `up at ${count}`);
    for (let count = 13; count < 31; count++) assert.ok(at(count + 1) < at(count), `down at ${count}`);
});

await test('the outer and inner glows at full strength and at half', () => {
    const rare = 0x85F97F;

    const outer = [ ...glow.badgeOuterGlowArgs(rare, 1) ];
    const inner = [ ...glow.badgeInnerGlowArgs(rare, 1) ];

    assert.deepEqual(outer, [ rare, 0.7, 8, 8, 2.2, 2, false, false ]);
    assert.deepEqual([ ...inner.slice(0, 4), ...inner.slice(5) ], [ rare, 0.22, 4, 4, 1, true, false ]);
    close(inner[4], 1.4, 'inner strength at 1');

    const [ , outerAlpha, outerBlurX, outerBlurY, outerStrength ] = glow.badgeOuterGlowArgs(rare, 0.5);

    close(outerAlpha, 0.35, 'outer alpha');
    close(outerBlurX, 6, 'outer blur x');
    close(outerBlurY, 6, 'outer blur y');
    close(outerStrength, 1.6, 'outer strength');

    const [ , innerAlpha, innerBlurX, , innerStrength, innerQuality, innerFlag ] = glow.badgeInnerGlowArgs(rare, 0.5);

    close(innerAlpha, 0.11, 'inner alpha');
    close(innerBlurX, 3, 'inner blur');
    close(innerStrength, 1.1, 'inner strength');
    assert.equal(innerQuality, 1);
    assert.equal(innerFlag, true);
});

await test('the tint: 48% of the strength towards the colour, 5% of that crossed, up to 80 added', () => {
    // the epic tier, 0x66BAFF
    const matrix = [ ...glow.badgeTintMatrix(0x66BAFF, 1) ];
    const r = 0x66 / 255;
    const g = 0xBA / 255;
    const b = 0xFF / 255;

    assert.equal(matrix.length, 20);
    close(matrix[0], 0.52 + (0.48 * r), 'r <- r');
    close(matrix[1], 0.024 * g, 'r <- g');
    close(matrix[2], 0.024 * b, 'r <- b');
    close(matrix[4], 80 * r, 'r offset');
    close(matrix[6], 0.52 + (0.48 * g), 'g <- g');
    close(matrix[9], 80 * g, 'g offset');
    close(matrix[12], 0.52 + (0.48 * b), 'b <- b');
    close(matrix[14], 80, 'b offset');
    assert.deepEqual(matrix.slice(15), [ 0, 0, 0, 1, 0 ]);
    // no strength, no change
    assert.deepEqual([ ...glow.badgeTintMatrix(0x66BAFF, 0) ], [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ]);
});
