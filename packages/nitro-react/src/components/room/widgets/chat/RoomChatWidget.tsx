import { useRoom } from '#base/context/room';

import { ChatFlowProvider } from './ChatFlowProvider';
import { ChatHistoryTray } from './ChatHistoryTray';
import { RoomChatBubbles } from './RoomChatBubbles';

/**
 * The in-room FreeFlow chat: the simulation provider around the bubble layer. Rendered before
 * the rest of `RoomWidgets` (and `RoomWrapper` before MainView's window layer), so the bubbles
 * sit above the room canvas and below the windows, exactly where the Flash chat layer was.
 * Always mounted in a room: the line-by-line chat mode is a setting of this same flow
 * (`ChatFlowStage.refreshSettings`), and the boolean `AccountPreferencesEventMessage` carries
 * before the room invites flag is read and discarded by Flash (`AccountPreferencesParser.parse`).
 */
export const RoomChatWidget = () => {
    const room = useRoom();

    if (!room) return null;

    return (
        <ChatFlowProvider>
            <RoomChatBubbles />
            <ChatHistoryTray />
        </ChatFlowProvider>
    );
};
