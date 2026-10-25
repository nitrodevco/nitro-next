/** Behavioral regressions for RoomEngine.updateRoomCamera canvas-size comparisons. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import { Matrix, Point, Rectangle } from 'pixi.js';
import ts from 'typescript';

const load = (source, dependencies) => {
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};
    runInNewContext(outputText, { exports, window: { innerWidth: 800, innerHeight: 600, addEventListener() {}, removeEventListener() {} }, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
        return dependencies[name];
    } });
    return exports;
};
const { Vector3d } = load(readFileSync(new URL('../packages/nitro-api/src/utils/Vector3d.ts', import.meta.url), 'utf8'), {});
const source = readFileSync(new URL('../packages/nitro-react/src/hooks/room/useRoomCamera.ts', import.meta.url), 'utf8');
const fixture = ({ width = 800, height = 600, small = false, follow = false, disabled = false, disabledByUser = false, followEnabled = true, configuredSpeed = 12 } = {}) => {
    let ref;
    const target = new Vector3d(10, 10, 0);
    const bounds = small ? new Rectangle(250, 200, 100, 100) : new Rectangle(-500, -500, 2000, 1600);
    const geometry = { scale: 64, updateId: 1, direction: new Vector3d(0, 0, 0), getScreenPoint: value => new Point(value.x, value.y), setLocation() {}, adjustLocation() {} };
    const canvas = { width, height, scale: 1, geometry, screenOffsetX: 0, screenOffsetY: 0 };
    const offsets = [];
    const values = { RoomMinX: -100, RoomMaxX: 100, RoomMinY: -100, RoomMaxY: 100 };
    const room = { canvas, getRoomObjectBoundingRectangle: () => bounds.clone(), getRoomObject: () => ({ getLocation: () => target }), getRoomValue: key => values[key], setRoomInstanceRenderingCanvasOffset: value => offsets.push(value) };
    const variables = Object.fromEntries(Object.keys(values).map(key => [ key, key ]));
    const state = { targetId: 1, targetCategory: 100, cameraFollowDisabled: disabled, followDuration: follow ? 1000 : 0 };
    const { useRoomCamera } = load(source, {
        '@nitrodevco/nitro-api': { Vector3d, RoomGeometryScaleType: { ZoomedIn: 64 }, RoomObjectVariableEnum: variables, RoomObjectCategoryEnum: { Room: 0 }, RoomDraggedEvent: { ROOM_DRAGGED: 'drag' }, RoomZoomEvent: { ROOM_ZOOM: 'zoom' }, RoomEngineEvent: class { static ROOM_ZOOMED = 'zoomed'; } },
        '@nitrodevco/nitro-renderer': { Room: { ROOM_OBJECT_ID: 0 } },
        'pixi.js': { Matrix, Point, Rectangle },
        react: { useRef: value => (ref = { current: value }) },
        '#base/context/room': { useRoom: () => room, useRoomStore: select => select(state) },
        '#base/context/system': {
            useConfigValue: key => key === 'room.camera.follow_user' ? followEnabled : configuredSpeed,
            // Flash's `getBoolean`: only the follow flag is set; `zoom.enabled` reads as unset.
            useConfigBoolean: key => (key === 'room.camera.follow_user') && (followEnabled === true),
        },
        '#base/context/user': { useUserStore: select => select({ isRoomCameraFollowDisabled: disabledByUser }) },
        './useRoomEventDispatcher': { useRoomEventDispatcher() {} },
    });
    const hook = useRoomCamera();
    Object.assign(ref.current, { room, currentLocation: new Vector3d(), screenSize: { w: width, h: height }, roomSize: { w: bounds.width, h: bounds.height }, geometryUpdateId: 1 });
    return { ...hook, camera: ref.current, canvas, geometry, target, offsets, bounds };
};

await test('movement inside tracking margins does not create a camera target at unchanged canvas size', () => {
    for (const [ width, height ] of [ [ 800, 600 ], [ 400, 300 ], [ 1200, 900 ] ]) {
        for (const small of [ false, true ]) {
            const f = fixture({ width, height, small });
            f.updateRoomCamera(1);
            assert.equal(f.camera.targetLocation, undefined, `${width}x${height}, small=${small}`);
            assert.equal(f.camera.screenSize.w, width);
            assert.equal(f.camera.screenSize.h, height);
            assert.equal(f.offsets.length, 0);
        }
    }
});

await test('an in-zone moving avatar does not replace an existing camera target', () => {
    const f = fixture();
    f.camera.targetLocation = new Vector3d(70, 80, 0);
    f.updateRoomCamera(1);
    assert.equal(f.camera.targetLocation.x, 70);
    assert.equal(f.camera.targetLocation.y, 80);
});

await test('resizing either canvas axis still recalculates the target', () => {
    for (const axis of [ 'width', 'height' ]) {
        const f = fixture();
        f.canvas[axis] += 100;
        f.updateRoomCamera(1);
        assert.ok(f.camera.targetLocation);
        assert.equal(f.camera.screenSize.w, f.canvas.width);
        assert.equal(f.camera.screenSize.h, f.canvas.height);
    }
});

await test('crossing each tracking boundary follows the avatar; inside positions stay still', () => {
    // 800x600 canvas: horizontal inset 100; top/bottom insets 150/120.
    for (const [ x, y, outside ] of [ [ -300, 0, false ], [ 300, 0, false ], [ 0, -146, false ], [ 0, 183, false ], [ -301, 0, true ], [ 301, 0, true ], [ 0, -147, true ], [ 0, 184, true ] ]) {
        const f = fixture();
        f.target.assign(new Vector3d(x, y, 0));
        f.updateRoomCamera(1);
        assert.equal(f.camera.targetLocation !== undefined, outside, `${x},${y}`);
    }
});

await test('room bounds changes still recalculate the target', () => {
    const f = fixture();
    f.bounds.width += 20;
    f.updateRoomCamera(1);
    assert.ok(f.camera.targetLocation);
    assert.equal(f.camera.roomSize.w, f.bounds.width);
});

await test('geometry-scale changes preserve and finish the pending camera move', () => {
    for (const scale of [ 32, 64 ]) {
        const f = fixture({ follow: true });
        f.camera.scale = scale === 32 ? 64 : 32;
        f.geometry.scale = scale;
        f.camera.targetLocation = new Vector3d(70, 80, 0);
        f.updateRoomCamera(1);
        assert.equal(f.camera.scale, scale);
        assert.equal(f.camera.currentLocation.x, 70);
        assert.equal(f.camera.currentLocation.y, 80);
        assert.equal(f.camera.targetLocation, undefined);
    }
});

await test('local and account follow-disable settings preserve the current offset', () => {
    for (const flags of [ { disabled: true }, { disabledByUser: true }, {} ]) {
        const f = fixture({ follow: true, ...flags });
        f.target.x = 301;
        f.updateRoomCamera(1);
        assert.equal(f.offsets.length > 0, !flags.disabled && !flags.disabledByUser);
    }
});

await test('camera easing positions match AS3 RoomCamera.update for every step', () => {
    for (const destination of [ [ 70, 80 ], [ -400, 50 ], [ 8, 0 ], [ 500, -300 ] ]) {
        const f = fixture({ follow: true });
        f.camera.targetLocation = new Vector3d(...destination, 0);
        f.camera.moveDistance = Math.hypot(...destination);
        let x = 0;
        let y = 0;
        let complete = false;
        for (let frame = 0; frame < 200 && !complete; frame++) {
            const dx = destination[0] - x;
            const dy = destination[1] - y;
            const remaining = Math.hypot(dx, dy);
            if (remaining <= 8) {
                [ x, y ] = destination;
                complete = true;
            } else {
                // AS3's update uses PI, an 8px threshold, and total distance / 12.
                const speed = 4 + (Math.hypot(...destination) / 12 - 4) * Math.sin(3.14159265358979 * remaining / Math.hypot(...destination));
                x += dx / remaining * speed;
                y += dy / remaining * speed;
            }
            f.updateRoomCamera(frame + 1);
            assert.ok(Math.abs(f.camera.currentLocation.x - x) < 1e-8);
            assert.ok(Math.abs(f.camera.currentLocation.y - y) < 1e-8);
        }
        assert.ok(complete);
        assert.equal(f.camera.targetLocation, undefined);
    }
});

await test('overview zoom and hotel follow configuration leave the camera stationary', () => {
    for (const mode of [ 'overview', 'disabled', 'missing' ]) {
        const f = fixture({ follow: true, followEnabled: mode === 'disabled' ? false : mode === 'missing' ? null : true });
        if (mode === 'overview') f.canvas.scale = 0.5;
        f.target.x = 301;
        f.updateRoomCamera(1);
        assert.equal(f.offsets.length, 0);
    }
});

await test('own-avatar camera target is assigned in both login packet orders, never to another user', () => {
    const handlerSource = readFileSync(new URL('../packages/nitro-react/src/handlers/room/registerRoomUserHandlers.ts', import.meta.url), 'utf8');
    for (const delayedIdentity of [ false, true ]) {
        const callbacks = new Map();
        let identity = delayedIdentity ? -1 : 10;
        const state = { ownRoomIndex: -1, targetId: -1, targetCategory: -2, users: [],
            setOwnRoomIndex: (id) => { state.ownRoomIndex = id; },
            setTarget: (id, category) => {
                state.targetId = id;
                state.targetCategory = category;
            },
            updateUsers: (users) => { state.users = users; },
            getUserByWebId: id => state.users.find(user => user.webID === id),
        };
        const room = new Proxy({}, { get: () => () => {} });
        const { registerRoomUserHandlers } = load(handlerSource, {
            '@nitrodevco/nitro-api': { Vector3d, RoomObjectCategoryEnum: { Unit: 100 }, RoomObjectUserType: { User: 1 }, AvatarGenderType: {}, RoomObjectVariableEnum: {} },
            '@nitrodevco/nitro-packets': new Proxy({}, { get: (_, name) => name }),
            '#base/context/room': { getRoom: () => room, roomStore: { getState: () => state } },
            '#base/context/user': { userStore: { getState: () => ({ userId: identity, blockedUserIds: [], ignoredUserIds: [] }) } },
            '#base/context/system': { systemStore: { getState: () => ({ config: {} }) }, configBoolean: () => false },
            '../packetSubscriptions': { on: (name, handler) => ({ name, handler }), subscribeAll: (_, entries) => { for (const { name, handler } of entries) callbacks.set(name, handler); } },
        });
        registerRoomUserHandlers({ subscribe() {} });
        callbacks.get('UsersMessage')({ avatars: [ { objectId: 3, webId: 10, avatarType: 1, gender: 'm' }, { objectId: 4, webId: 11, avatarType: 1, gender: 'f' } ] });
        if (delayedIdentity) {
            assert.equal(state.targetId, -1);
            identity = 10;
            callbacks.get('UserObjectMessage')({ userInfo: { userId: 10 } });
        }
        assert.equal(state.ownRoomIndex, 3);
        assert.equal(state.targetId, 3);
        assert.equal(state.targetCategory, 100);
    }
});

await test('the installed room ticker and resize listener use the latest camera callback', () => {
    const component = readFileSync(new URL('../packages/nitro-react/src/components/room/RoomCanvas.ts', import.meta.url), 'utf8');
    let callback;
    let effect;
    let refIndex = 0;
    const refs = [];
    let tick;
    let resize;
    let registrations = 0;
    const seen = [];

    let initialized = 0;
    const canvas = { master: { on() {}, off() {} }, initialize: () => initialized++ };
    const room = { canvas, roomId: 1, dispatchEvent() {} };
    const { RoomCanvas } = load(component, {
        '@nitrodevco/nitro-api': { RoomRenderedEvent: class {} },
        '@nitrodevco/nitro-renderer': { GetRenderer: () => ({ canvas: { addEventListener() {}, removeEventListener() {} }, screen: { width: 800, height: 600 }, on: (_, fn) => { resize = fn; }, off() {} }), GetTicker: () => ({ add: (fn) => {
            tick = fn;
            registrations++;
        }, remove() {} }) },
        react: { useRef: value => (refs[refIndex++] ??= { current: value }), useEffect: (fn) => { effect ??= fn; }, useLayoutEffect: fn => fn() },
        // nitro-theme's: a ref the commit (here, at once) writes the latest value into.
        '#base/theme': { ClientToStage: value => value, useLatest: (value) => {
            const ref = (refs[refIndex++] ??= { current: value });

            ref.current = value;

            return ref;
        } },
        '#base/context/room': { useRoom: () => room, useRoomStore: select => select({}), useRoomMouseActions: () => ({ hasAndResetCursorUpdate: () => false }) },
        '#base/hooks': { useRoomCamera: () => ({ updateRoomCamera: callback }) },
        './touchPlacementDrop': { touchPlacementDrop: { objectId: -1, category: -1 } },
    });
    callback = time => seen.push([ 'initial', time ]);
    RoomCanvas();
    effect();
    tick({ lastTime: 1, deltaTime: 1 });
    callback = time => seen.push([ 'updated target/settings', time ]);
    refIndex = 0;
    RoomCanvas();
    tick({ lastTime: 2, deltaTime: 1 });
    // A resize only re-initializes the canvas (`RoomEngine.modifyRoomCanvas`); the next tick's camera
    // update eases to the new size, so the listener itself never updates the camera.
    const before = initialized;
    resize();
    assert.equal(initialized, before + 1);
    tick({ lastTime: 3, deltaTime: 1 });
    assert.deepEqual(seen, [ [ 'initial', -1 ], [ 'initial', 1 ], [ 'updated target/settings', 2 ], [ 'updated target/settings', 3 ] ]);
    assert.equal(registrations, 1);
});

await test('in-place avatar movement is detected after a stationary frame', () => {
    const f = fixture();
    f.updateRoomCamera(1);
    assert.equal(f.camera.targetLocation, undefined);
    f.target.x = 301;
    f.updateRoomCamera(2);
    assert.ok(f.camera.targetLocation, 'copy the last target coordinates instead of retaining the mutable room position');
    assert.equal(f.camera.targetObjectLocation.x, 301);
});

await test('camera speed configuration changes easing while defaulting to AS3 speed', () => {
    const normal = fixture({ follow: true });
    const override = fixture({ follow: true, configuredSpeed: 1 });
    for (const f of [ normal, override ]) {
        f.camera.targetLocation = new Vector3d(70, 80, 0);
        f.camera.moveDistance = Math.hypot(70, 80);
    }
    for (let frame = 0; frame < 30; frame++) {
        normal.updateRoomCamera(frame + 1);
        override.updateRoomCamera(frame + 1);
    }
    assert.notEqual(override.camera.currentLocation.x, normal.camera.currentLocation.x);
    assert.notEqual(override.camera.currentLocation.y, normal.camera.currentLocation.y);
});

await test('zoom 2 keeps the camera stationary until zoom 1 resumes following the displaced avatar', () => {
    const f = fixture({ follow: true });
    f.canvas.scale = 2;
    f.target.x = 301;
    f.updateRoomCamera(1);
    assert.equal(f.offsets.length, 0);
    f.canvas.scale = 1;
    f.updateRoomCamera(2);
    assert.ok(f.offsets.length > 0);
    assert.notEqual(f.camera.currentLocation.x, 0);
});
