/**
 * `useSliderKnobDrag`: the knob moves from where it was pressed as far as the pointer has, held to
 * its track, unrounded, and the release reaches `onEnd`.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-react/src/hooks/useSliderKnobDrag.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const drags = [];
    const exports = {};

    runInNewContext(outputText, {
        exports,
        require: (name) => {
            if (name === '#base/theme') return { ClientToStage: value => value };
            if (name === '#base/utils') return { clamp: (value, min, max) => Math.min(Math.max(value, min), max) };
            if (name === './useWindowPointerDrag') return { useWindowPointerDrag: () => ({ start: (pointerId, handlers) => drags.push({ pointerId, handlers }), stop: () => {} }) };

            throw new Error(`Unexpected dependency: ${name}`);
        },
    });

    return { knob: exports.useSliderKnobDrag(), drags };
};

await test('the knob follows the pointer from where it was pressed, held to its track', () => {
    const { knob, drags } = load();
    const xs = [];
    let ended = 0;

    knob.start({ pointerId: 3, clientX: 100 }, 40, 186, { onMove: x => xs.push(x), onEnd: () => ended++ });

    assert.equal(drags[0].pointerId, 3);

    for (const clientX of [ 110.5, 50, 400 ]) drags[0].handlers.onMove({ clientX });
    drags[0].handlers.onEnd({});

    assert.deepEqual(xs, [ 50.5, 0, 186 ]);
    assert.equal(ended, 1);
});
