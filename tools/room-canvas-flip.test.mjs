/** Regressions for Flash RoomSpriteCanvas's signed display transform. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import { Point, Rectangle } from 'pixi.js';
import ts from 'typescript';

// Run the production methods without constructing a GPU renderer or loading room assets.
const methods = (path, names) => {
    const source = readFileSync(new URL(path, import.meta.url), 'utf8');
    const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
    const cls = ast.statements.find(ts.isClassDeclaration);
    const members = cls.members.filter(m => names.includes(m.name?.getText(ast)));
    assert.equal(members.length, names.length);
    const code = `class Subject { ${members.map(m => m.getText(ast)).join('\n')} }; Subject;`;
    return runInNewContext(ts.transpileModule(code, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, { Point, MouseEventType: { MOUSE_MOVE: 'move' } });
};
const Canvas = methods('../packages/nitro-renderer/src/room/RoomSpriteCanvas.ts', [ 'setScale', 'setFlip', 'setTransform', 'displayScale', 'isFlipped', 'isSpriteVisible', 'handleMouseEvent' ]);
const Room = methods('../packages/nitro-renderer/src/room/Room.ts', [ 'getRoomObjectBoundingRectangle', 'getRoomObjectScreenLocation' ]);
const fixture = () => Object.assign(new Canvas(), {
    _master: {}, _display: {}, _scale: 1, _isFlipped: false,
    _width: 800, _height: 600, screenOffsetX: 30, screenOffsetY: -20,
    _mouseLocation: {}, _mouseCheckCount: 0,
});

await test('flip mirrors both axes around the viewport centre and two flips restore offsets', () => {
    const c = fixture();
    c.setFlip(true);
    assert.equal(c.displayScale, -1);
    assert.equal(c.screenOffsetX, 770);
    assert.equal(c.screenOffsetY, 620);
    c.setFlip(false);
    assert.equal(c.screenOffsetX, 30);
    assert.equal(c.screenOffsetY, -20);
});

await test('custom pivots and zoom preserve the chosen screen point before a render', () => {
    for (const scale of [ 0.5, 1, 2, 4 ]) {
        const c = fixture();
        const pivot = new Point(217, 123);
        const destination = new Point(304, 260);
        const local = new Point(pivot.x - c.screenOffsetX, pivot.y - c.screenOffsetY);
        c.setFlip(true, pivot, destination);
        assert.equal(local.x * c.displayScale + c.screenOffsetX, destination.x);
        assert.equal(local.y * c.displayScale + c.screenOffsetY, destination.y);
        c.setScale(-scale, destination);
        assert.equal(c.isFlipped, true);
        assert.equal(c.displayScale, -scale);
        assert.equal(local.x * c.displayScale + c.screenOffsetX, destination.x);
        assert.equal(local.y * c.displayScale + c.screenOffsetY, destination.y);
    }
});

await test('flipped culling accepts visible negative extents and rejects offscreen sprites', () => {
    const c = fixture();
    c._isFlipped = true;
    c._screenOffsetX = 800;
    c._screenOffsetY = 600;
    assert.equal(c.isSpriteVisible(900, 700, 40, 30), true);
    assert.equal(c.isSpriteVisible(1700, 700, 40, 30), false);
    assert.equal(c.isSpriteVisible(900, 1300, 40, 30), false);
});

await test('mouse hit coordinates invert both axes at every zoom', () => {
    for (const scale of [ 0.5, 1, 2, 4 ]) {
        const c = fixture();
        c._scale = scale;
        c._isFlipped = true;
        c._screenOffsetX = 800;
        c._screenOffsetY = 600;
        c.checkMouseHits = (x, y) => {
            assert.equal(x, 123);
            assert.equal(y, 57);
            return true;
        };
        assert.equal(c.handleMouseEvent(800 - 123 * scale, 600 - 57 * scale, 'click', false, false, false, false), true);
        assert.equal(c._mouseLocation.x, 123);
        assert.equal(c._mouseLocation.y, 57);
    }
});

await test('object bounds and anchors follow the signed display transform with positive extents', () => {
    for (const scale of [ 0.5, 1, 2 ]) {
        for (const isFlipped of [ false, true ]) {
            const signed = isFlipped ? -scale : scale;
            const room = new Room();
            room._canvas = { width: 800, height: 600, scale, isFlipped, screenOffsetX: 17, screenOffsetY: 31, geometry: { getScreenPoint: () => new Point(80, 40) } };
            room.getRoomObject = () => ({ getLocation: () => ({}), visualization: { getBoundingRectangle: () => new Rectangle(-10, -40, 30, 50) } });
            const rect = room.getRoomObjectBoundingRectangle(1, 100);
            const anchor = room.getRoomObjectScreenLocation(1, 100);
            assert.equal(anchor.x, Math.round(480 * signed + 17));
            assert.equal(anchor.y, Math.round(340 * signed + 31));
            assert.equal(rect.x, (isFlipped ? 500 : 470) * signed + 17);
            assert.equal(rect.y, (isFlipped ? 350 : 300) * signed + 31);
            assert.equal(rect.width, 30 * scale);
            assert.equal(rect.height, 50 * scale);
        }
    }
});
const hookSource = readFileSync(new URL('../packages/nitro-react/src/hooks/room/useRoomCamera.ts', import.meta.url), 'utf8');
const hookFixture = (enabled = true) => {
    let ref;
    const listeners = {};
    const c = fixture();
    Object.defineProperties(c, { width: { get: () => c._width }, height: { get: () => c._height }, scale: { get: () => c._scale } });
    const events = [];
    const room = { roomId: 4, canvas: c, eventDispatcher: { dispatchEvent: e => events.push(e) } };
    class Vector3d {
        constructor(x = 0, y = 0, z = 0) {
            Object.assign(this, { x, y, z });
        }
    }
    class RoomEngineEvent {
        static ROOM_ZOOMED = 'zoomed';
        constructor(type, roomId) { Object.assign(this, { type, roomId }); }
    }
    const dependencies = {
        '@nitrodevco/nitro-api': { Vector3d, RoomEngineEvent, RoomZoomEvent: { ROOM_ZOOM: 'zoom' }, RoomDraggedEvent: { ROOM_DRAGGED: 'drag' }, RoomGeometryScaleType: { ZoomedIn: 64 } },
        '@nitrodevco/nitro-renderer': {}, 'pixi.js': { Point, Rectangle },
        react: { useRef: value => (ref = { current: value }) },
        '#base/context/room': { useRoom: () => room, useRoomStore: select => select({}) },
        '#base/context/system': {
            useConfigValue: key => key === 'zoom.enabled' ? enabled : undefined,
            useConfigBoolean: key => (key === 'zoom.enabled') && (enabled === true),
        },
        '#base/context/user': { useUserStore: select => select({}) },
        './useRoomEventDispatcher': { useRoomEventDispatcher: (type, handler) => { listeners[type] = handler; } },
    };
    const exports = {};
    runInNewContext(ts.transpileModule(hookSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports, require: name => dependencies[name] });
    const hook = exports.useRoomCamera();
    return { ...hook, c, events, listeners, ref };
};

await test('forced room event toggles, notifies, pauses the camera and restores its location', () => {
    const f = hookFixture();
    f.listeners.zoom({ roomId: 4, isFlipForced: true });
    assert.equal(f.c.isFlipped, true);
    // No geometry is supplied: the flipped-camera early return must precede projection work.
    f.updateRoomCamera(1);
    assert.equal(f.events[0].type, 'zoomed');
    f.listeners.zoom({ roomId: 4, isFlipForced: true });
    assert.equal(f.c.isFlipped, false);
    assert.equal(f.ref.current.currentLocation.x, -30);
    assert.equal(f.ref.current.currentLocation.y, 20);
    assert.equal(f.events.length, 2);
});

await test('disabled zoom, another room and ordinary zoom events cannot force a flip', () => {
    for (const [ enabled, roomId, isFlipForced ] of [ [ false, 4, true ], [ true, 5, true ], [ true, 4, false ] ]) {
        const f = hookFixture(enabled);
        f.listeners.zoom({ roomId, isFlipForced });
        assert.equal(f.c.isFlipped, false);
        assert.equal(f.events.length, 0);
    }
});

await test('unflipping at nondefault zoom normalizes the camera using unscaled canvas dimensions', () => {
    const f = hookFixture();
    f.c.setScale(2);
    const x = f.c.screenOffsetX;
    const y = f.c.screenOffsetY;
    f.listeners.zoom({ roomId: 4, isFlipForced: true });
    f.listeners.zoom({ roomId: 4, isFlipForced: true });
    assert.equal(f.ref.current.currentLocation.x, -(400 - (400 - x) / 2));
    assert.equal(f.ref.current.currentLocation.y, -(300 - (300 - y) / 2));
});
