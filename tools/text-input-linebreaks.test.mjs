/**
 * A multiline `TextInput` keeps its value in a hidden `<textarea>`, which holds line breaks as `\n`,
 * and measures its caret and selection with the Flash text layout (`layoutFlashTextBlock`). The
 * floor plan editor's map text uses Flash's `\r`; unnormalised it never equalled the native value,
 * so the caret and the selection landed away from the glyphs Pixi drew on separate lines. The
 * layout itself breaks a line at `\r`, `\r\n` and `\n` alike, as a Flash `TextField` does.
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

await test('the flash text layout breaks lines on \\r, \\r\\n and \\n', () => {
    const { layoutFlashTextLines } = load('nitro-theme/src/font/flash-text/flashTextBlock.ts', {
        './air32/mathColor': load('nitro-theme/src/font/flash-text/air32/mathColor.ts', {}),
        './flashTextFormat': { normalizeFlashTextFormat: format => format },
        './FlashTextRenderer': { FlashTextRenderer: {} },
    });
    const lines = layoutFlashTextLines([ { text: 'a\rb\r\nc\nd', format: {} } ], {}, text => text.length);

    assert.deepEqual(Array.from(lines, line => line.text), [ 'a', 'b', 'c', 'd' ]);
});

await test('a multiline text input turns \\r and \\r\\n into \\n before it uses the value', () => {
    const source = read('nitro-theme/src/TextInput.tsx');
    const normalise = source.match(/const value = multiline \? rawValue\.replace\((\/.+?\/g), '\\n'\) : rawValue;/);

    assert.ok(normalise, 'the value is normalised for a multiline field');

    const pattern = new RegExp(normalise[1].slice(1, -2), 'g');

    assert.equal('xx\rxx\r'.replace(pattern, '\n'), 'xx\nxx\n');
    assert.equal('a\r\nb\rc\nd'.replace(pattern, '\n'), 'a\nb\nc\nd');
    assert.ok(source.indexOf('const value =') < source.indexOf('useState(false)'), 'before anything reads it');
});
