/**
 * A fast double-click on a navigator room must ask for the room once
 * (`nitro-react/src/views/navigator/navigatorEnterGuard.ts`).
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { createRepeatedEnterGuard, DOUBLE_ENTER_WINDOW_MS } = await import('../packages/nitro-react/src/views/navigator/navigatorEnterGuard.ts');

await test('the first ask for a room goes through', () => {
    const guard = createRepeatedEnterGuard();

    assert.equal(guard(7, 1000), false);
});

await test('a second ask for the same room inside the window is the same click', () => {
    const guard = createRepeatedEnterGuard();

    assert.equal(guard(7, 1000), false);
    assert.equal(guard(7, 1000), true);
    assert.equal(guard(7, 1000 + DOUBLE_ENTER_WINDOW_MS - 1), true);
});

await test('the same room again after the window is a new visit', () => {
    const guard = createRepeatedEnterGuard();

    assert.equal(guard(7, 1000), false);
    assert.equal(guard(7, 1000 + DOUBLE_ENTER_WINDOW_MS), false);
});

await test('a different room is never held back, and the window follows the latest room', () => {
    const guard = createRepeatedEnterGuard();

    assert.equal(guard(7, 1000), false);
    assert.equal(guard(8, 1100), false);
    assert.equal(guard(8, 1200), true);
    assert.equal(guard(7, 1300), false);
});

await test('a repeated ask does not extend the window, so a held key cannot lock a room out', () => {
    const guard = createRepeatedEnterGuard(1000);

    assert.equal(guard(7, 0), false);
    assert.equal(guard(7, 900), true);
    assert.equal(guard(7, 1000), false);
});
