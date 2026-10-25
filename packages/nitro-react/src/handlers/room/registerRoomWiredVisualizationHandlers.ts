import { WiredFurniHighlightMessage, WiredFurniTransparencyMessage, WiredFurniVisualizationStateMessage, WiredUserHighlightMessage, WiredUserTransparencyMessage, WiredUserVisualizationStateMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `RoomMessageHandler.onWiredFurniTransparency` / `onWiredUserTransparency` / `onWiredFurniHighlight` /
 * `onWiredUserHighlight` / `onWiredFurniVisualizationState` / `onWiredUserVisualizationState` (WIN63-202610201032):
 * WIRED Set Visibility, Set Highlight and the room's Set Visibility /
 * Set Highlight states on entry into the engine, which buffers those for objects not ready yet. A message
 * that did not parse is never handed on, as in Flash.
 */
export const registerRoomWiredVisualizationHandlers = ({ subscribe }: WebSocketConnection) => {
    return subscribeAll(subscribe, [
        on(WiredFurniTransparencyMessage, (data) => {
            const room = getRoom();

            if (!room || !data.valid) return;

            room.updateWiredFurniTransparency(data.furniIds, data.transparency, data.allowClickThrough, data.easingMode);
        }),

        on(WiredUserTransparencyMessage, (data) => {
            const room = getRoom();

            if (!room || !data.valid) return;

            room.updateWiredUserTransparency(data.roomIndices, data.transparency, data.allowClickThrough, data.easingMode);
        }),

        on(WiredFurniHighlightMessage, (data) => {
            const room = getRoom();

            if (!room || !data.valid) return;

            room.updateWiredFurniHighlight(data.furniIds, data.highlightType, data.strength, data.color, data.animationMode, data.easingMode);
        }),

        on(WiredUserHighlightMessage, (data) => {
            const room = getRoom();

            if (!room || !data.valid) return;

            room.updateWiredUserHighlight(data.roomIndices, data.highlightType, data.strength, data.color, data.animationMode, data.easingMode);
        }),

        on(WiredFurniVisualizationStateMessage, (data) => {
            const room = getRoom();

            if (!room || !data.valid) return;

            room.initializeWiredFurniVisualizationStates(data.transparencies, data.highlights);
        }),

        on(WiredUserVisualizationStateMessage, (data) => {
            const room = getRoom();

            if (!room || !data.valid) return;

            room.initializeWiredUserVisualizationStates(data.transparencies, data.highlights);
        }),
    ]);
};
