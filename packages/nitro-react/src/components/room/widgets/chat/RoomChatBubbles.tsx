import { useRoomStore } from '#base/context/room';

import { ChatBubble } from './ChatBubble';

/**
 * The chat layer: one `ChatBubble` per bubble in the room store. The host container sits at
 * the stage origin with no size of its own; the bubbles position themselves in screen pixels
 * through their motion handles rather than through yoga.
 */
export const RoomChatBubbles = () => {
    const bubbles = useRoomStore(x => x.chatBubbles);

    return (
        <pixiContainer
            label="room-chat"
            eventMode="passive"
            layout={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}
        >
            {bubbles.map(bubble => (
                <ChatBubble
                    key={bubble.id}
                    data={bubble}
                />
            ))}
        </pixiContainer>
    );
};
