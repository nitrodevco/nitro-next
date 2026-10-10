import { useState } from 'react';

import { sendRoomInvite } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useFriendsStore } from '#base/context/friend';
import { useIsWindowVisible, useSystemActions } from '#base/context/system';
import { TemplateWindow, useTemplateFrame } from '#base/theme';

import { friendListAlertPosition } from './friendListAlertPosition';

/** The alert's frame (`room_invite_confirm`'s 211x175). */
const ALERT_WIDTH = 211;
const ALERT_HEIGHT = 175;

const TEMPLATE = 'habbo-friend-list-com/room_invite_confirm_xml';

/** `RoomInviteView.onMessageInput`: the message is cut at 120 characters. */
const MESSAGE_MAX_LENGTH = 120;

/**
 * `RoomInviteView` - the `room_invite_confirm` alert (`AlertView`): `invite_summary` counts the
 * selected friends (registered as `count`), `message_input` takes the message and Enter sends it
 * (`onMessageInput`'s char 13). `ok` sends it and drops the alert whether or not it went - an empty
 * message only answers with its alert - and `cancel` or the close button drops it unsent.
 */
const FriendListRoomInvite = () => {
    const { toggleWindow } = useSystemActions();
    const { send } = useWebSocketContext();
    const selectedFriendIds = useFriendsStore(x => x.selectedFriendIds);
    const [ message, setMessage ] = useState('');

    const close = () => toggleWindow('friendlist_invite');
    const windowRect = useFriendsStore(x => x.windowRect);
    const frame = useTemplateFrame({ id: 'friendlist-room-invite', defaultPosition: friendListAlertPosition(windowRect, ALERT_WIDTH, ALERT_HEIGHT), rememberPosition: false, onClose: close });

    /** `sendMsg`: the view is disposed once it is sent. */
    const sendMessage = () => {
        if (sendRoomInvite(send, selectedFriendIds, message)) close();
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            parameters={{ 'friendlist.invite.summary': { count: selectedFriendIds.length.toString() } }}
            bindings={{
                message_input: {
                    caption: message,
                    maxChars: MESSAGE_MAX_LENGTH,
                    onChange: setMessage,
                    onEnter: sendMessage,
                },
                cancel: { onPointerTap: close },
                // `onInvite`: `sendMsg`, then `dispose` either way.
                ok: {
                    onPointerTap: () => {
                        sendRoomInvite(send, selectedFriendIds, message);
                        close();
                    },
                },
            }}
        />
    );
};

export const FriendListRoomInviteView = () => {
    const isVisible = useIsWindowVisible('friendlist_invite');

    if (!isVisible) return null;

    return <FriendListRoomInvite />;
};
