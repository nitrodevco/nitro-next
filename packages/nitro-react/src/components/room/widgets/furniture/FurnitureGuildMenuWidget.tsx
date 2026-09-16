import { NitroLogger, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { GuildFurniContextMenuInfoMessageType, JoinHabboGroupComposer } from '@nitrodevco/nitro-packets';

import { useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { useRoomGuildFurniHandler } from '#base/handlers';
import { useGoToRoom } from '#base/hooks';
import { FurnitureGuildMenuView } from '#base/views/room-widgets/furniture/FurnitureGuildMenuView';

import { RoomObjectMenuBubblePixi } from '../object-menu/RoomObjectMenuBubblePixi';

/**
 * The menu over a piece of guild furniture. The request handler asks about the guild as the
 * furni is used; nothing is shown until that answer names it, and the answer has to be about
 * this furni, since another one in the same room would answer too.
 */
export const FurnitureGuildMenuWidget = () => {
    // Only this dialog is told these things, and only while it is open.
    useRoomGuildFurniHandler();

    const request = useRoomWidget<GuildFurniContextMenuInfoMessageType>(RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const goToRoom = useGoToRoom();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU);

    const data = request?.data;

    if (!request || !data || (data.objectId !== request.objectId)) return null;

    return (
        <RoomObjectMenuBubblePixi objectData={{ objectId: request.objectId, category: request.category }}>
            <FurnitureGuildMenuView
                guildName={data.guildName}
                isMember={data.userIsMember}
                hasForum={data.guildHasReadableForum}
                onJoin={() => {
                    send(new JoinHabboGroupComposer({ groupId: data.guildId }));
                    onClose();
                }}
                onHomeRoom={() => {
                    goToRoom(data.guildHomeRoomId);
                    onClose();
                }}
                onForum={() => {
                    // The forum is its own window, which the port has yet to build.
                    NitroLogger.events('RoomWidgetRequest', 'guild forum', data.guildId);
                    onClose();
                }}
            />
        </RoomObjectMenuBubblePixi>
    );
};
