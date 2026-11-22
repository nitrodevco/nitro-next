/**
 * The room's draw shift (`drawnRoomSpriteShift`): Flash keeps the canvas offset in twips, cut down, so
 * an offset off the twip grid draws the room a pixel up / left. A zoom leaves the offset a rounding
 * error from a whole pixel (-503.9999999999998 for -504); that is on the grid, as the twips read it.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { drawnRoomSpriteShift } from '../src/room/utils/snapRoomSpriteCoordinate';

void test('an offset off the twip grid draws the room a pixel up / left', () => {
    assert.equal(drawnRoomSpriteShift(-7.191835884530848), -1);
    assert.equal(drawnRoomSpriteShift(-378.8836717690616), -1);
    assert.equal(drawnRoomSpriteShift(12.3), 0);
    assert.equal(drawnRoomSpriteShift(12.33), -1);
});

void test('an offset on a whole pixel or twip is not shifted', () => {
    for (const offset of [ 0, -504, 320, 12.05, -12.05 ]) assert.equal(drawnRoomSpriteShift(offset), 0, String(offset));
});

void test('a zoom\'s rounding error past a whole pixel does not shift the room', () => {
    // RoomSpriteCanvas.as:318-322 works the zoomed offset out as point - local * scale.
    assert.equal(drawnRoomSpriteShift(-503.9999999999998), 0);
    assert.equal(drawnRoomSpriteShift(-504.0000000000002), 0);
    assert.equal(drawnRoomSpriteShift(1.1368683772161603e-13), 0);
    assert.equal(drawnRoomSpriteShift(-1.1368683772161603e-13), 0);
});
