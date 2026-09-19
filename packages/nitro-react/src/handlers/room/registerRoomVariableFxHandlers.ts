import { VariableFxConfigsMessage, VariableFxConfigsRemovedMessage, VariableFxStatusMessage, VariableFxStatusRemovedMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** Feeds the wired Variable FX configs/statuses (bars, hearts, levels, numbers shown above users and furni) into the room. */
export const registerRoomVariableFxHandlers = ({ subscribe }: WebSocketConnection) => {
    return subscribeAll(subscribe, [
        on(VariableFxConfigsMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateVariableFxConfigs(data.configs);
        }),

        on(VariableFxConfigsRemovedMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.removeVariableFxConfigs(data.configIds);
        }),

        on(VariableFxStatusMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateVariableFxStatuses(data.statuses);
        }),

        on(VariableFxStatusRemovedMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.removeVariableFxStatuses(data.statuses);
        }),
    ]);
};
