/**
 * The infostand's pick up / eject button (`nitro-react/src/utils/furniturePickupMode.ts`) against
 * `InfoStandFurniView.updatePickupMode` (1318 `InfoStandFurniView.as:689-728`) and where Turbo's
 * `RoomSecurityModule.GetFurniPickupTypeAsync` sends the furni: the label names what happens.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { getFurniturePickupMode, PICKUP_NONE, PICKUP_EJECT, PICKUP_FULL } = await import('../packages/nitro-react/src/utils/furniturePickupMode.ts');

const visitor = { playTestMode: false, isStickie: false, isOwner: false, isRoomOwner: false, isGuildAdmin: false, isAnyRoomController: false, canStealFurni: false, isBuildersClub: false };
const mode = extra => getFurniturePickupMode({ ...visitor, ...extra });

await test('the furni owner picks up their own furni', () => {
    assert.equal(mode({ isOwner: true }), PICKUP_FULL);
    assert.equal(mode({ isOwner: true, isRoomOwner: true }), PICKUP_FULL);
});

await test('the room owner and a level-3 controller eject somebody else\'s furni', () => {
    assert.equal(mode({ isRoomOwner: true }), PICKUP_EJECT);
    assert.equal(mode({ isGuildAdmin: true }), PICKUP_EJECT);
});

await test('staff without room.furni.steal are offered Eject: the server returns the furni to its owner', () => {
    assert.equal(mode({ isAnyRoomController: true }), PICKUP_EJECT);
    assert.equal(mode({ isAnyRoomController: true, isRoomOwner: true }), PICKUP_EJECT);
});

await test('room.furni.steal (or level 5 from a server without nodes, as Flash) is Pick up', () => {
    assert.equal(mode({ isAnyRoomController: true, canStealFurni: true }), PICKUP_FULL);
    assert.equal(mode({ canStealFurni: true }), PICKUP_FULL);
});

await test('a Builders Club furni keeps Flash\'s choice: it goes back to the club whoever takes it', () => {
    assert.equal(mode({ isBuildersClub: true, isAnyRoomController: true }), PICKUP_FULL);
    assert.equal(mode({ isBuildersClub: true, canStealFurni: true }), PICKUP_NONE);
    assert.equal(mode({ isBuildersClub: true, isRoomOwner: true }), PICKUP_EJECT);
});

await test('nobody else, no sticky note, nothing in play test mode', () => {
    assert.equal(mode({}), PICKUP_NONE);
    assert.equal(mode({ isOwner: true, isStickie: true }), PICKUP_NONE);
    assert.equal(mode({ isOwner: true, playTestMode: true }), PICKUP_NONE);
    assert.equal(mode({ isAnyRoomController: true, canStealFurni: true, playTestMode: true }), PICKUP_NONE);
});
