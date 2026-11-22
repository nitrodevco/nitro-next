import assert from 'node:assert/strict';
import { test } from 'node:test';

import { FLASH_ROOM_PREVIEWER_LOOK, readRoomPreviewerLook } from '../src/hooks/room/roomPreviewerLook';

// Flash's showcase room: `RoomPreviewer.as:661` `updateObjectRoom(PREVIEW_OBJECT_ID, "110", "99999")`.
void test('unset or unreadable, the previewer room is Flash\'s floor 110 and wall 99999', () => {
    for (const value of [ undefined, '', 'not json', [ 1 ], 7 ]) assert.deepEqual(readRoomPreviewerLook(value), FLASH_ROOM_PREVIEWER_LOOK);
    assert.deepEqual(FLASH_ROOM_PREVIEWER_LOOK, { floorType: '110', wallType: '99999' });
});

void test('a theme\'s look, as JSON text: its plane types; a field it gets wrong keeps Flash\'s', () => {
    assert.deepEqual(readRoomPreviewerLook('{ "floorType": 101, "wallType": "101", "landscapeType": "1.1" }'), { floorType: '101', wallType: '101', landscapeType: '1.1' });
    assert.deepEqual(readRoomPreviewerLook({ floorType: '', wallType: {} }), FLASH_ROOM_PREVIEWER_LOOK);
});
