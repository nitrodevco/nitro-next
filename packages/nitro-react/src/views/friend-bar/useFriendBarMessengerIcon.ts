/**
 * `new_bar`'s `icon_messenger`: hidden until a conversation is open (`onRefreshMessengerConversations`),
 * and while one has an unread message, `notifyMessenger` - its `icon` hidden and `icon_1` / `icon_2`
 * shown in turn every 500 ms (`onTimerEvent` on its `Timer(500)`). Pressing it toggles the messenger
 * (`onOpenMessenger`).
 *
 * Flash stops the blinking on a press until the next conversation update; here it blinks while there
 * is an unread conversation and the messenger is closed, which is the same whenever the press opens it.
 */
import { useEffect, useState } from 'react';

import { isMessengerOpen, toggleMessenger, trackEventLog } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useMessengerStore } from '#base/context/messenger';
import { useIsWindowVisible } from '#base/context/system';
import { TemplateBindings } from '#base/theme';

/** `notifyMessenger`'s `Timer(500)`. */
const BLINK_MS = 500;

/** The bindings for `icon_messenger` and its three bitmaps. */
export const useFriendBarMessengerIcon = (): TemplateBindings => {
    const { send } = useWebSocketContext();
    const conversations = useMessengerStore(x => x.conversations);
    const isOpen = useIsWindowVisible('messenger');
    const [ frame, setFrame ] = useState(0);
    const visible = conversations.some(conversation => conversation.visible);
    const notify = !isOpen && conversations.some(conversation => conversation.visible && conversation.unread);

    useEffect(() => {
        if (!notify) return;

        const timer = setInterval(() => setFrame(value => (value ? 0 : 1)), BLINK_MS);

        // The next run starts again on `icon_1` (`notifyMessenger(true)`).
        return () => {
            clearInterval(timer);
            setFrame(0);
        };
    }, [ notify ]);

    /** `HabboFriendBarData.toggleMessenger`: the toggle, then its EventLog with the state it left the messenger in. */
    const onToggle = () => {
        toggleMessenger();
        trackEventLog(send, 'Toolbar', 'MESSENGER', isMessengerOpen() ? 'open' : 'close');
    };

    return {
        icon_messenger: { visible, onPointerTap: onToggle },
        'icon_messenger/icon': { visible: !notify },
        'icon_messenger/icon_1': { visible: notify && (frame === 0) },
        'icon_messenger/icon_2': { visible: notify && (frame === 1) },
    };
};
