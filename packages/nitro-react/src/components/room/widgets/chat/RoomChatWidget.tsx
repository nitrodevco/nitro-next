import { useOwnChatPreferences, useRoomSelector } from '#base/context';
import { getRenderMode } from '#base/theme';

import { ChatFlowProvider } from './ChatFlowProvider';
import { RoomChatBubbles } from './RoomChatBubbles';

/**
 * The in-room FreeFlow chat: the simulation provider around the bubble layer. Rendered before
 * the rest of `RoomWidgets` (and `RoomWrapper` before MainView's window layer), so the bubbles
 * sit above the room canvas and below the windows, exactly where the Flash chat layer was.
 * Nothing is mounted while the user has free-flow chat turned off in their account
 * preferences, or in the DOM UI mode, which only renders the room canvas itself.
 */
export const RoomChatWidget = () => {
    const room = useRoomSelector();
    const { freeFlowChatDisabled } = useOwnChatPreferences();

    if (!room || freeFlowChatDisabled || (getRenderMode() !== 'pixi')) return null;

    return (
        <ChatFlowProvider>
            <RoomChatBubbles />
        </ChatFlowProvider>
    );
};
