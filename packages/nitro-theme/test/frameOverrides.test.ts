import assert from 'node:assert/strict';
import { test } from 'node:test';

import { frameOverrideOf, parseFrameOverrides } from '../src/utils/frameOverrides';

test('a frame is found by its id, then by its window name', () => {
    const value = { 'wired-setup': { variant: '102', color: '#336699' }, friend_list: { color: 0xff00ff00 } };

    assert.deepEqual(frameOverrideOf(value, 'wired-setup'), { variant: '102', color: '#336699' });
    assert.deepEqual(frameOverrideOf(value, 'template-0', 'friend_list'), { color: '#00ff00' });
    assert.equal(frameOverrideOf(value, 'navigator'), undefined);
});

test('the variable may be JSON text; colours in any Flash or css spelling come out as #rrggbb', () => {
    const overrides = parseFrameOverrides('{ "a": { "color": "0xFF102030" }, "b": { "color": "#abc", "variant": 7 } }');

    assert.deepEqual(overrides.get('a'), { color: '#102030' });
    assert.deepEqual(overrides.get('b'), { variant: '7', color: '#aabbcc' });
});

test('a value that is not an object, or an entry with nothing usable, overrides nothing', () => {
    assert.equal(parseFrameOverrides('not json').size, 0);
    assert.equal(parseFrameOverrides([ 1 ]).size, 0);
    assert.equal(parseFrameOverrides({ a: { color: 'blue' }, b: 3 }).size, 0);
    assert.equal(frameOverrideOf(undefined, 'a'), undefined);
});
