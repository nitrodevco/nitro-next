import assert from 'node:assert/strict';
import { test } from 'node:test';

import { IRoom, IRoomRenderingCanvas, IRoomUserData, RoomObjectCategoryEnum, Vector3d } from '@nitrodevco/nitro-api';
import { RoomGeometry } from '@nitrodevco/nitro-renderer';

import { parseRoomFloorTiles, roomFloorTileAt, secondaryRoomScreenOffset } from '../src/commands/room/secondaryRoomGeometry';
import { createRoomStore, inRoomStoreScope, runInRoomStoreScope } from '../src/context/room/store/RoomStore';

const room = (roomId: number) => ({ roomId, setStackingHeightMap: () => undefined, dispose: () => undefined }) as unknown as IRoom;

// The case that needed it: a client module's secondary room is fed through the client's own room handlers,
// which took the store's actions when they were registered and read `getRoom()` when a packet lands.
void test('while a secondary room is fed, the room store a handler took reads and writes that room\'s store, and the room on screen hears nothing', () => {
    const onScreen = createRoomStore(true);
    const secondary = createRoomStore();
    const { updateUserPartial, setOwnRoomIndex } = onScreen.getState();
    let notified = 0;

    onScreen.getState().setRoom(room(1));
    secondary.getState().setRoom(room(2));
    onScreen.subscribe(() => notified++);

    runInRoomStoreScope(secondary, () => {
        assert.equal(inRoomStoreScope(), true);
        assert.equal(onScreen.getState().room?.roomId, 2, 'getRoom() answers the secondary room');

        setOwnRoomIndex(7);
        updateUserPartial(7, { name: 'b' });
        onScreen.setState({ isDecorating: true });
    });

    assert.equal(inRoomStoreScope(), false);
    assert.equal(notified, 0);
    assert.equal(onScreen.getState().room?.roomId, 1);
    assert.equal(onScreen.getState().ownRoomIndex, -1);
    assert.equal(onScreen.getState().isDecorating, false);
    assert.equal(secondary.getState().ownRoomIndex, 7);
    assert.equal(secondary.getState().isDecorating, true);
});

// The case that needed it: the session walks into a room a module drew, and takes its state and the room as they are.
void test('entering a room drawn before takes the state it was drawn with, and keeping the room left leaves it undisposed', () => {
    const store = createRoomStore(true);
    let disposed = 0;
    const left = { ...room(1), dispose: () => disposed++ } as unknown as IRoom;

    store.getState().setRoom(left);
    store.getState().setRoom(room(2), { state: { ownRoomIndex: 4 }, keepPrevious: true });

    assert.equal(disposed, 0);
    assert.equal(store.getState().ownRoomIndex, 4);

    store.getState().setRoom(room(3));

    assert.equal(store.getState().ownRoomIndex, -1, 'a room entered the usual way starts fresh');
});

const canvasOf = (scale: number, flipped: boolean, screenOffsetX: number, screenOffsetY: number, location: Vector3d) => {
    const geometry = new RoomGeometry(64, new Vector3d(-135, 30, 0), location);

    return { geometry, scale, isFlipped: flipped, screenOffsetX, screenOffsetY, width: 1000, height: 700 } as unknown as IRoomRenderingCanvas;
};

/** Where a canvas draws a room point on the stage (`RoomCanvas`'s tile under the pointer, the other way round). */
const stagePoint = (canvas: IRoomRenderingCanvas, point: Vector3d) => {
    const screen = canvas.geometry.getScreenPoint(point);
    const scale = canvas.isFlipped ? -canvas.scale : canvas.scale;

    return { x: ((screen.x + (canvas.width / 2)) * scale) + canvas.screenOffsetX, y: ((screen.y + (canvas.height / 2)) * scale) + canvas.screenOffsetY };
};

// An invariant the placement needs: each of the secondary room's points sits on the active room's point at the offset, whatever the camera did.
void test('a secondary room draws each of its tiles on the active room\'s tile at the offset, zoomed and flipped too', () => {
    const offset = { x: 12, y: -3, z: 1 };

    for (const [ scale, flipped ] of [ [ 1, false ], [ 0.5, false ], [ 2, true ] ] as const) {
        const active = canvasOf(scale, flipped, -137.5, 42, new Vector3d(9.5, 4, 2));
        const secondary = canvasOf(scale, flipped, 0, 0, new Vector3d(11, 11, 5));
        const placed = secondaryRoomScreenOffset(active, secondary, offset)!;

        secondary.screenOffsetX = placed.x;
        secondary.screenOffsetY = placed.y;

        for (const point of [ new Vector3d(0, 0, 0), new Vector3d(5, 2, 0), new Vector3d(-1, 7, 3.5) ]) {
            const there = stagePoint(active, new Vector3d(point.x + offset.x, point.y + offset.y, point.z + offset.z));
            const here = stagePoint(secondary, point);

            assert.ok((Math.abs(there.x - here.x) < 1e-6) && (Math.abs(there.y - here.y) < 1e-6), `scale ${scale}${flipped ? ' flipped' : ''}: ${JSON.stringify(point)} at ${JSON.stringify(here)}, not ${JSON.stringify(there)}`);
        }
    }
});

// An invariant the pointer needs: a raised tile's top is reported with its height, the floor around it at its own.
void test('the floor tile under the pointer is the tile whose top is there, the highest first, and none off the floor', () => {
    const canvas = canvasOf(1, false, 20, -10, new Vector3d(11, 11, 5));
    const floor = parseRoomFloorTiles('xxxxx\rx0000\rx0220\rx0000\rxxxxx');

    assert.deepEqual(floor.heights, [ 2, 0 ]);

    for (const tile of [ { x: 2, y: 2, z: 2 }, { x: 3, y: 2, z: 2 }, { x: 1, y: 1, z: 0 }, { x: 4, y: 3, z: 0 } ]) {
        const at = stagePoint(canvas, new Vector3d(tile.x, tile.y, tile.z));

        assert.deepEqual(roomFloorTileAt(canvas, floor, at.x, at.y), tile);
    }

    const off = stagePoint(canvas, new Vector3d(0, 4, 0));

    assert.equal(roomFloorTileAt(canvas, floor, off.x, off.y), undefined);
});

// The bug it fixes: a module kept the room the session left (`keepWhenLeft`) and the session's own avatar
// stood on in it, and once more beside the new one each time the session came back to it.
void test('the room the session leaves is kept without the session\'s own avatar, the others stay', async () => {
    // The kept room is drawn from the ticker, which asks for frames.
    globalThis.requestAnimationFrame ??= () => 0;
    globalThis.cancelAnimationFrame ??= () => undefined;

    const { adoptSecondaryRoom, keepRoomBeingLeft, keepRoomWhenLeft } = await import('../src/commands/room/secondaryRooms');
    const { roomStore } = await import('../src/context/room/store/RoomStore');
    const removed: number[][] = [];
    const left = { ...room(1), removeRoomObject: (id: number, category: number) => void removed.push([ id, category ]) } as unknown as IRoom;
    const user = (objectId: number, webID: number) => ({ objectId, webID, userType: 1 }) as unknown as IRoomUserData;

    roomStore.getState().setRoom(left);
    roomStore.getState().updateUsers([ user(3, 101), user(4, 102) ]);
    roomStore.getState().setOwnRoomIndex(3);
    keepRoomWhenLeft('test', {}, () => undefined);

    assert.equal(keepRoomBeingLeft(left, 2), true);
    assert.deepEqual(removed, [ [ 3, RoomObjectCategoryEnum.Unit ] ]);

    const kept = adoptSecondaryRoom(1)!.state;

    assert.equal(kept.ownRoomIndex, -1);
    assert.deepEqual(Object.keys(kept.usersByRoomObjectId!), [ '4' ]);
});
