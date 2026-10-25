/**
 * `RoomAreaSelectionManager` and the click that ends a drag: the wired "in area" selectors and the
 * area hide furni ask the room for a rectangle of tiles; the rectangle is dragged out with the mouse
 * and handed over when the mouse comes up (`RoomEngine.handleMouseEvent` calls `finishSelecting` on
 * the click). Without that call the selection never finishes and the box never gets its area.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const read = path => readFileSync(new URL(`../packages/${path}`, import.meta.url), 'utf8');

const load = (path, dependencies = {}) => {
    const { outputText } = ts.transpileModule(read(`${path}.ts`), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, { exports, Object, Array, Math, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    } });

    return exports;
};

class ColorMatrixFilter {}
class FurnitureVisualization {
    constructor() {
        this.lookThrough = false;
    }
}

const { RoomAreaSelectionManager } = load('nitro-renderer/src/room/utils/RoomAreaSelectionManager', {
    '@nitrodevco/nitro-api': { RoomEngineObjectEvent: { ADDED: 'REOE_ADDED' }, RoomObjectCategoryEnum: { Floor: 10, Wall: 20 }, RoomObjectMouseEvent: { MOUSE_DOWN: 'ROE_MOUSE_DOWN', MOUSE_MOVE: 'ROE_MOUSE_MOVE' } },
    'pixi.js': { ColorMatrixFilter },
    '../object': { FurnitureVisualization, RoomVisualization: class {} },
});

const DOWN = 'ROE_MOUSE_DOWN';
const MOVE = 'ROE_MOUSE_MOVE';

const room = () => {
    const furni = { visualization: new FurnitureVisualization() };
    const highlight = [];
    const log = { moveBlocked: false };

    return {
        log,
        highlight,
        furni,
        eventDispatcher: { addEventListener: () => {} },
        setMoveBlocked: (value) => { log.moveBlocked = value; },
        getRoomObjectRoom: () => ({ visualization: { initializeHighlightArea: (...args) => highlight.push(args.slice(0, 4)), clearHighlightArea: () => highlight.push('cleared') } }),
        getRoomObjectsForCategory: category => (category === 10 ? [ furni ] : []),
    };
};

const tile = (type, x, y, shiftKey = false) => ({ type, tileXAsInt: x, tileYAsInt: y, shiftKey });

await test('dragging out a rectangle and ending the click hands the area to whoever asked', () => {
    const r = room();
    const manager = new RoomAreaSelectionManager(r);
    const areas = [];

    assert.equal(manager.activate((...area) => areas.push(area), 'highlight_brighten'), true);
    assert.equal(r.furni.visualization.lookThrough, true, 'furni are see-through while the selection is on');

    manager.startSelecting();
    assert.equal(manager.areaSelectionState, RoomAreaSelectionManager.AWAITING_MOUSE_DOWN);
    assert.equal(r.log.moveBlocked, true, 'the avatar does not walk while a rectangle is dragged');

    manager.handleTileMouseEvent(tile(DOWN, 3, 4));
    assert.equal(manager.areaSelectionState, RoomAreaSelectionManager.SELECTING);

    manager.handleTileMouseEvent(tile(MOVE, 6, 2));
    assert.deepEqual(r.highlight.at(-1), [ 3, 2, 4, 3 ], 'the rectangle follows the drag from either corner');

    // Nothing is handed over until the click that ends the drag: this is the call that was missing.
    assert.deepEqual(areas, []);
    assert.equal(manager.finishSelecting(), true);
    assert.deepEqual(areas, [ [ 3, 2, 4, 3 ] ]);
    assert.equal(manager.areaSelectionState, RoomAreaSelectionManager.NOT_SELECTING_AREA);
    assert.equal(r.log.moveBlocked, false);

    assert.equal(manager.finishSelecting(), false, 'a click when no drag is under way is not the selection\'s');
});

await test('a drag that never ends keeps the selection waiting, the avatar blocked and the box empty', () => {
    const r = room();
    const manager = new RoomAreaSelectionManager(r);
    const areas = [];

    manager.activate((...area) => areas.push(area), 'highlight_brighten');
    manager.startSelecting();
    manager.handleTileMouseEvent(tile(DOWN, 1, 1));
    manager.handleTileMouseEvent(tile(MOVE, 2, 2));

    assert.equal(manager.areaSelectionState, RoomAreaSelectionManager.SELECTING);
    assert.equal(r.log.moveBlocked, true);
    assert.deepEqual(areas, []);
});

await test('clearing the area reports an empty one, and shift-click starts a drag without the button', () => {
    const r = room();
    const manager = new RoomAreaSelectionManager(r);
    const areas = [];

    manager.activate((...area) => areas.push(area), 'highlight_brighten');
    manager.clearHighlight();
    assert.deepEqual(areas, [ [ 0, 0, 0, 0 ] ]);

    manager.handleTileMouseEvent(tile(DOWN, 5, 5, true));
    assert.equal(manager.areaSelectionState, RoomAreaSelectionManager.SELECTING);
    manager.finishSelecting();
    assert.deepEqual(areas.at(-1), [ 5, 5, 1, 1 ]);
});

await test('the selection can only be claimed by one at a time, and releasing it restores the furni', () => {
    const r = room();
    const manager = new RoomAreaSelectionManager(r);

    assert.equal(manager.activate(() => {}, 'highlight_brighten'), true);
    assert.equal(manager.activate(() => {}, 'highlight_brighten'), false);

    manager.deactivate();
    assert.equal(manager.areaSelectionState, RoomAreaSelectionManager.NOT_ACTIVE);
    assert.equal(r.furni.visualization.lookThrough, false);
    assert.equal(manager.activate(() => {}, 'highlight_brighten'), true);
});

// The manager is only half of it: the live mouse dispatcher has to end the drag on the click, as
// `RoomEngine.handleMouseEvent` does. This reads the source because the dispatcher is a React hook.
await test('the room canvas ends an area drag on the click, before anything else handles it', () => {
    const path = 'nitro-react/src/components/room/RoomCanvas.ts';
    const source = read(path);
    const dispatch = source.slice(source.indexOf('const dispatchMouseEvent'));
    const finish = dispatch.indexOf('areaSelection.finishSelecting()');
    const dragging = dispatch.indexOf('handleRoomDragging(');

    assert.ok(finish > -1, `${path} never finishes an area selection`);
    assert.ok(finish < dragging, `${path} must finish the selection before the click is handled as a walk or a select`);
    assert.match(dispatch.slice(Math.max(0, finish - 90), finish), /MouseEventType\.MOUSE_CLICK/, `${path} finishes it on a click only`);
});
