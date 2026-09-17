import { ClubLevelEnum } from '@nitrodevco/nitro-api';
import { ROOM_QUEUE_TYPE_CLUB, ROOM_QUEUE_TYPE_NORMAL, RoomQueueStatusMessage, RoomQueueTargetType } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { navigatorStore } from '#base/context/navigator';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The line into a full room - `RoomSessionHandler.onRoomQueueStatus`. The server describes every
 * queue set the room has; only the one you are actually standing in is worth showing, and its
 * club lane is the one that counts for anyone who has club.
 *
 * Returns the unsubscribe.
 */
export const registerRoomQueueHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(RoomQueueStatusMessage, (data) => {
        const { setRoomQueue } = navigatorStore.getState();
        const active = data.queueSets.find(set => Number(set.target) === data.activeTarget);

        if (!active) {
            setRoomQueue(undefined);

            return;
        }

        const hasClub = userStore.getState().clubLevel >= ClubLevelEnum.Club;
        const types = Object.keys(active.queues);
        /*
         * `RoomQueueWidgetHandler.processEvent`: with both lanes open, club members are counted
         * in the club one and everyone else in the normal one; with only one, that is the one.
         */
        const clubQueue = (types.length > 1) && hasClub && types.includes(ROOM_QUEUE_TYPE_CLUB);
        const type = (types.length > 1)
            ? (clubQueue ? ROOM_QUEUE_TYPE_CLUB : ROOM_QUEUE_TYPE_NORMAL)
            : types[0];

        setRoomQueue({
            position: (active.queues[type] ?? 0) + 1,
            spectator: Number(active.target) === Number(RoomQueueTargetType.Spectator),
            clubQueue,
            // Only worth offering the other line when the room actually has one.
            canChangeQueue: data.queueSets.length > 1,
        });
    }),
]);
