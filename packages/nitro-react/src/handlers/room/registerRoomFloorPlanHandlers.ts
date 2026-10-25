/**
 * What the floor plan editor listens to - the message half of `BCFloorPlanEditor`.
 *
 * Four of these five packets already have a listener in `registerRoomMappingHandlers`, which builds
 * the room out of them; the editor wants the same packets as editable data, so it keeps its own.
 * The fifth, `RoomOccupiedTilesMessage`, is the editor's alone: nothing else in the client asks
 * which tiles are in use.
 *
 * The room's map, entry tile and thickness land in the room store and go with the room. The
 * Builder's Club subscription is the account's and lands in the user store, with the editor's
 * countdown: `onBcStatus` starts `_bcSecondsCountdownTimer` at the first status and it takes ten
 * seconds off every ten seconds for the rest of the session, editor open or not (Flash builds the
 * editor once, with the window manager). A membership that runs out while the editor is closed
 * therefore finds its save disabled when it opens.
 */
import { RoomThicknessType } from '@nitrodevco/nitro-api';
import { BuildersClubSubscriptionStatusMessage, FloorHeightMapMessage, RoomEntryTileMessage, RoomOccupiedTilesMessage, RoomVisualizationSettingsMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { onRoomLeft, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `BCFloorPlanEditor.getThicknessSelectionIndex`, as the setting rather than the dropmenu's index.
 * `RoomVisualizationSettingsMessage` hands over the multiplier the room draws with, and anything
 * that is not one of the four the client offers is read as the normal thickness.
 */
/** `BCFloorPlanEditor._bcSecondsCountdownTimer`: `new Timer(10000)`, and each tick takes ten off. */
const BC_COUNTDOWN_MS = 10000;
const BC_COUNTDOWN_SECONDS = 10;

const thicknessFromMultiplier = (multiplier: number): RoomThicknessType => {
    switch (multiplier) {
        case 0.25: return RoomThicknessType.Thinnest;
        case 0.5: return RoomThicknessType.Thin;
        case 2: return RoomThicknessType.Thick;
        default: return RoomThicknessType.Normal;
    }
};

export const registerRoomFloorPlanHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFloorPlanReceivedModel, setFloorPlanFixedWallsHeight, setFloorPlanEntryPoint, setFloorPlanEntryPointDir, setFloorPlanOccupiedTiles, setFloorPlanThickness } = roomStore.getState();
    const { setBuildersClubSubscription, decreaseBuildersClubSecondsLeft } = userStore.getState();

    let bcCountdownTimer: ReturnType<typeof setInterval> | undefined;

    // `onRoomDisposed` (`REE_DISPOSED`): the editor closes with the room it edits - also when a save reloads that room.
    const unsubscribeRoom = onRoomLeft(() => systemStore.getState().hideWindow('floor_plan_editor'));

    const unsubscribe = subscribeAll(subscribe, [
        on(FloorHeightMapMessage, (data) => {
            // `FloorPlanCache.onFloorHeightMap` - the received map is also what a revert goes back to.
            setFloorPlanReceivedModel(data.modelData);
            setFloorPlanFixedWallsHeight(data.fixedWallsHeight);
        }),

        on(RoomEntryTileMessage, (data) => {
            setFloorPlanEntryPoint({ x: data.x, y: data.y });
            setFloorPlanEntryPointDir(data.rotation);
        }),

        on(RoomOccupiedTilesMessage, data => setFloorPlanOccupiedTiles(data.occupiedTiles)),

        on(RoomVisualizationSettingsMessage, data => setFloorPlanThickness(thicknessFromMultiplier(data.wallThickness), thicknessFromMultiplier(data.floorThickness))),

        on(BuildersClubSubscriptionStatusMessage, (data) => {
            setBuildersClubSubscription(data.secondsLeft, data.secondsLeftWithGrace, data.furniLimit, data.maxFurniLimit);

            // `onBcCountdownTimerEvent` keeps counting past zero; nothing reads below it, so the store is left alone there.
            bcCountdownTimer ??= setInterval(() => {
                if (userStore.getState().buildersClubSecondsLeft > 0) decreaseBuildersClubSecondsLeft(BC_COUNTDOWN_SECONDS);
            }, BC_COUNTDOWN_MS);
        }),
    ]);

    return () => {
        unsubscribeRoom();
        unsubscribe();
        clearInterval(bcCountdownTimer);
    };
};
