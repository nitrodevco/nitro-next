import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { GuildFurniContextMenuInfoMessage } from '@nitrodevco/nitro-packets';

import { useRoomWidgetActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

/**
 * What a piece of guild furniture can offer you depends on the guild, not on the furni: whether
 * you are already a member, and whether its forum is one you may read. Selecting the furni is
 * what asks, and this is the answer.
 */
export const useRoomGuildFurniHandler = () => {
    const { updateRoomWidgetData } = useRoomWidgetActions();

    useMessageListener(GuildFurniContextMenuInfoMessage, (data) => {
        updateRoomWidgetData(RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU, data);
    });
};
