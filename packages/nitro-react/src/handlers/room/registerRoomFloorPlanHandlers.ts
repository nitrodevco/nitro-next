import { RoomThicknessType } from '@nitrodevco/nitro-api';
import { BuildersClubSubscriptionStatusMessage, FloorHeightMapMessage, RoomEntryTileMessage, RoomOccupiedTilesMessage, RoomVisualizationSettingsMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * What the floor plan editor listens to - the message half of `BCFloorPlanEditor`.
 *
 * Four of these five packets already have a listener in `registerRoomMappingHandlers`, which builds
 * the room out of them; the editor wants the same packets as editable data, so it keeps its own.
 * The fifth, `RoomOccupiedTilesMessage`, is the editor's alone: nothing else in the client asks
 * which tiles are in use.
 *
 * The room's map, entry tile and thickness land in the room store and go with the room. The
 * Builder's Club subscription is the account's and lands in the user store, where the editor's
 * countdown finds it again the next time it opens.
 */

/**
 * `BCFloorPlanEditor.getThicknessSelectionIndex`, as the setting rather than the dropmenu's index.
 * `RoomVisualizationSettingsMessage` hands over the multiplier the room draws with, and anything
 * that is not one of the four the client offers is read as the normal thickness.
 */
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
    const { setBuildersClubSubscription } = userStore.getState();

    return subscribeAll(subscribe, [
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

        on(BuildersClubSubscriptionStatusMessage, data => setBuildersClubSubscription(data.secondsLeft, data.secondsLeftWithGrace, data.furniLimit, data.maxFurniLimit)),
    ]);
};
