import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseObject, resolveStyles } from '../src/theme/templateStyles';

const styles = { 'mytheme:frame.header': 4285229153, 'mytheme:shop.name': 'Corner', 'other:accent': 4294901760 };

void test('a value that is one style becomes the value as it is, so a colour stays a number', () => {
    const missing = new Set<string>();
    const file = resolveStyles({ patches: [ { template: 't/x', ops: [ { element: 'a', set: { color: '${style:frame.header}' } } ] } ] }, styles, 'mytheme', missing) as { patches: { ops: { set: { color: unknown } }[] }[] };

    assert.equal(file.patches[0].ops[0].set.color, 4285229153);
    assert.equal(missing.size, 0);
});

void test('a style inside text is written into it, and another plugin is read by its key', () => {
    const missing = new Set<string>();

    assert.equal(resolveStyles('${style:shop.name}\'s shop', styles, 'mytheme', missing), 'Corner\'s shop');
    assert.equal(resolveStyles('${style:other:accent}', styles, 'mytheme', missing), 4294901760);
});

void test('a style the hotel has no value of is left and named', () => {
    const missing = new Set<string>();

    assert.equal(resolveStyles('${style:nope}', styles, 'mytheme', missing), '${style:nope}');
    assert.deepEqual([ ...missing ], [ 'nope' ]);
});

void test('templates.styles is read as an object or its JSON text', () => {
    assert.deepEqual(parseObject('{"a:b":1}'), { 'a:b': 1 });
    assert.deepEqual(parseObject('not json'), {});
});
