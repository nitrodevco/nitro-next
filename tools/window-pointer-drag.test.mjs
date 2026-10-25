/**
 * `useWindowPointerDrag`: a drag follows only the pointer that started it, ends on that pointer's
 * release or cancel, is stopped by the next drag or `stop` without its end, and takes its window
 * listeners with the component when it unmounts.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-theme/src/hooks/useWindowPointerDrag.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const listeners = new Map();
    const window = {
        addEventListener: (type, fn) => (listeners.get(type) ?? listeners.set(type, new Set()).get(type)).add(fn),
        removeEventListener: (type, fn) => listeners.get(type)?.delete(fn),
    };
    const dispatch = (type, pointerId, clientX = 0) => {
        for (const fn of [ ...(listeners.get(type) ?? []) ]) fn({ type, pointerId, clientX });
    };
    const count = () => [ ...listeners.values() ].reduce((n, set) => n + set.size, 0);
    const cleanups = [];
    const exports = {};

    runInNewContext(outputText, {
        exports,
        window,
        require: (name) => {
            if (name === 'react') {
                return {
                    useRef: value => ({ current: value }),
                    useCallback: fn => fn,
                    useEffect: (fn) => {
                        const cleanup = fn();

                        if (cleanup) cleanups.push(cleanup);
                    },
                };
            }

            throw new Error(`Unexpected dependency: ${name}`);
        },
    });

    const drag = exports.useWindowPointerDrag();
    const unmount = () => cleanups.forEach(fn => fn());

    return { drag, dispatch, count, unmount };
};

await test('only the pointer that started the drag moves and ends it', () => {
    const { drag, dispatch, count } = load();
    const moves = [];
    let ended = 0;

    drag.start(1, { onMove: e => moves.push(e.clientX), onEnd: () => ended++ });
    dispatch('pointermove', 2, 50);
    dispatch('pointermove', 1, 10);
    dispatch('pointerup', 2);

    assert.deepEqual(moves, [ 10 ]);
    assert.equal(ended, 0, 'another pointer letting go does not end it');

    dispatch('pointerup', 1);
    dispatch('pointermove', 1, 20);

    assert.equal(ended, 1);
    assert.deepEqual(moves, [ 10 ], 'nothing follows once released');
    assert.equal(count(), 0, 'the release removes every listener');
});

await test('a cancelled pointer ends the drag as a release does', () => {
    const { drag, dispatch, count } = load();
    let ended = 0;

    drag.start(3, { onMove: () => undefined, onEnd: () => ended++ });
    dispatch('pointercancel', 3);

    assert.equal(ended, 1);
    assert.equal(count(), 0);
});

await test('stop and a new drag end the one under way without its end', () => {
    const { drag, dispatch, count } = load();
    const ends = [];

    drag.start(1, { onMove: () => undefined, onEnd: () => ends.push('first') });
    drag.start(1, { onMove: () => undefined, onEnd: () => ends.push('second') });

    assert.equal(count(), 3, 'one drag listens at a time');

    drag.stop();
    dispatch('pointerup', 1);

    assert.deepEqual(ends, []);
    assert.equal(count(), 0);
});

await test('unmounting mid-drag leaves no listener behind', () => {
    const { drag, dispatch, count, unmount } = load();
    let moved = 0;

    drag.start(1, { onMove: () => moved++ });
    unmount();
    dispatch('pointermove', 1);

    assert.equal(moved, 0);
    assert.equal(count(), 0);
});
