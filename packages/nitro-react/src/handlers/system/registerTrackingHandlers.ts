/**
 * The rest of `HabboTracking` for the connection (its latency test is `registerLatencyHandlers`):
 * the per-frame trackers and the room timer `startHabboTracking` runs, the first room entry as a
 * login step (`onRoomEnter`), and `RoomChatHandler.onRoomChat` handing each chat line's tracking id
 * to the chat lag check. What each does is in `trackingCommands`.
 */
import { ChatMessage, RoomEntryInfoMessage } from '@nitrodevco/nitro-packets';

import { receivedChatWithTrackingId, startHabboTracking, trackLoginStep } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerTrackingHandlers = ({ send, subscribe }: WebSocketConnection) => {
    let roomEntered = false;

    const unsubscribe = subscribeAll(subscribe, [
        on(RoomEntryInfoMessage, () => {
            if (roomEntered) return;

            trackLoginStep('client.init.room.enter');
            roomEntered = true;
        }),
        on(ChatMessage, data => receivedChatWithTrackingId(data.trackingId)),
    ]);

    const stop = startHabboTracking(send);

    return () => {
        stop();
        unsubscribe();
    };
};
