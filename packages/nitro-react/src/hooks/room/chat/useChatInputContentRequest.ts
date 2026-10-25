/**
 * The chat input's side of `RoomChatInputWidget.onChatInputUpdate`: the avatar menu asked to whisper
 * or shout to someone (`RoomWidgetChatInputContentUpdateEvent`). It is a one-off request rather than
 * state to render, so the handler takes it as the room store announces it and it is cleared straight
 * away. The handler lives in a ref, so the latest render's closure is the one called.
 */
import { useEffect } from 'react';

import { RoomChatInputContent, roomStore, useRoomChatActions } from '#base/context/room';
import { useLatest } from '#base/theme';

export const useChatInputContentRequest = (handler: (content: RoomChatInputContent) => void) => {
    const { clearChatInputContent } = useRoomChatActions();

    const handlerRef = useLatest(handler);

    useEffect(() => roomStore.subscribe(({ chatInputContent }) => {
        if (!chatInputContent) return;

        handlerRef.current(chatInputContent);
        clearChatInputContent();
    }), [ clearChatInputContent ]);
};
