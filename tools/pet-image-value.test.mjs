/**
 * `petImageValue` - `RoomEngine.getPetImage`'s figure string: type, palette, colour in hex,
 * ` head` for a head-only render, and the parts' count and parts only when a parts array is given.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const source = readFileSync(new URL('../packages/nitro-renderer/src/room/utils/petImageValue.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
const exports = {};

runInNewContext(outputText, { exports, require: () => ({}) });

const { petImageValue } = exports;

await test('no parts array: type, palette and colour in hex alone', () => {
    assert.equal(petImageValue(15, 2, 0xFFAA00), '15 2 ffaa00');
});

await test('an empty parts array still writes its count', () => {
    assert.equal(petImageValue(15, 2, 0xFFAA00, false, []), '15 2 ffaa00 0');
});

await test('a head-only render with parts', () => {
    assert.equal(petImageValue(0, 1, 0x1, true, [ { layerId: 1, partId: 2, paletteId: 3 }, { layerId: 4, partId: 5, paletteId: 6 } ]), '0 1 1 head 2 1 2 3 4 5 6');
});
