import { FurnitureLabelsAndRegionsMessage, FurnitureLabelsAndRegionsUpdateMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `RoomMessageHandler.onFurnitureLabelsAndRegions` / `onFurnitureLabelsAndRegionsUpdate`
 * (WIN63-202610121624): the room's WIRED labels and regions into the engine, which buffers those
 * for furni not ready yet. A message that did not parse is never handed on, as in Flash.
 */
export const registerRoomFurnitureLabelHandlers = ({ subscribe }: WebSocketConnection) => {
    return subscribeAll(subscribe, [
        on(FurnitureLabelsAndRegionsMessage, (data) => {
            const room = getRoom();

            if (!room || !data.valid) return;

            room.replaceFurnitureLabelsAndRegions(data.entries);
        }),

        on(FurnitureLabelsAndRegionsUpdateMessage, (data) => {
            const room = getRoom();

            if (!room || !data.valid) return;

            room.updateFurnitureLabelsAndRegions(data.addedOrUpdated, data.removedIds);
        }),
    ]);
};
