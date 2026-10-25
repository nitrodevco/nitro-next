/**
 * The patched Pixi `EventBoundary.notifyTarget` (`.yarn/patches/pixi.js-*.patch`): an `on<type>`
 * property - what every JSX `onPointerTap` / `onPointerDown` / `onWheel` becomes through
 * `@pixi/react` - ran on each ancestor in the capture phase as well as the bubble. A parent's tap ran
 * before and after its child's, a child's `stopPropagation()` never kept the parent's from running,
 * and of two nested scroll panes only the outer scrolled. It now runs at the target and while
 * bubbling only, as `.on()` listeners always did; `<type>capture` listeners still run on the way down.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

await import('pixi.js/events');

const { Container, EventBoundary, FederatedPointerEvent, FederatedWheelEvent } = await import('pixi.js');

/** An outer container holding an inner one under an interactive root, and a dispatch onto the inner. */
const nest = () => {
    const root = new Container();
    const outer = new Container();
    const inner = new Container();

    for (const container of [ root, outer, inner ]) container.eventMode = 'static';

    root.addChild(outer);
    outer.addChild(inner);

    const boundary = new EventBoundary(root);
    const dispatch = (EventType, type) => {
        const event = new EventType(boundary);

        event.type = type;
        event.target = inner;
        boundary.dispatchEvent(event);
    };

    return { outer, inner, dispatch };
};

await test('an ancestor on<type> runs once, after the target', () => {
    const { outer, inner, dispatch } = nest();
    const calls = [];

    outer.onpointertap = () => calls.push('outer');
    inner.onpointertap = () => calls.push('inner');
    dispatch(FederatedPointerEvent, 'pointertap');

    assert.deepEqual(calls, [ 'inner', 'outer' ]);
});

await test('a target that stops the event keeps the ancestor on<type> from running', () => {
    const { outer, inner, dispatch } = nest();
    const calls = [];

    outer.onpointerdown = () => calls.push('outer');
    inner.onpointerdown = (event) => {
        calls.push('inner');
        event.stopPropagation();
    };
    dispatch(FederatedPointerEvent, 'pointerdown');

    assert.deepEqual(calls, [ 'inner' ]);
});

await test('the inner of two nested scroll panes takes the wheel', () => {
    const { outer, inner, dispatch } = nest();
    const calls = [];

    for (const [ name, pane ] of [ [ 'outer', outer ], [ 'inner', inner ] ]) {
        pane.onwheel = (event) => {
            calls.push(name);
            event.stopPropagation();
        };
    }

    dispatch(FederatedWheelEvent, 'wheel');

    assert.deepEqual(calls, [ 'inner' ]);
});

await test('a capture listener still runs on the way down, before the target', () => {
    const { outer, inner, dispatch } = nest();
    const calls = [];

    outer.on('pointerdowncapture', () => calls.push('outer capture'));
    inner.onpointerdown = (event) => {
        calls.push('inner');
        event.stopPropagation();
    };
    dispatch(FederatedPointerEvent, 'pointerdown');

    assert.deepEqual(calls, [ 'outer capture', 'inner' ]);
});
