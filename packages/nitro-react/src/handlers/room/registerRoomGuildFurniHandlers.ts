import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { GuildFurniContextMenuInfoMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * What a piece of guild furniture can offer you depends on the guild, not on the furni: whether
 * you are already a member, and whether its forum is one you may read. Selecting the furni is
 * what asks, and this is the answer.
 */
export const registerRoomGuildFurniHandlers = ({ subscribe }: WebSocketConnection) => {
    const { updateRoomWidgetData } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(GuildFurniContextMenuInfoMessage, (data) => {
            updateRoomWidgetData(RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU, data);
        }),
    ]);
};
