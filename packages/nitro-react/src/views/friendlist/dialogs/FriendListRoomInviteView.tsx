import { SendRoomInviteComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useFriendsStore } from '#base/context/friend';
import { useIsWindowVisible, useSystemActions, useTranslation } from '#base/context/system';
import { Border, Button, ButtonThick, Frame, TextInput, ThemeText } from '#base/theme';

/**
 * `RoomInviteView` - the `room_invite_confirm` alert (211x175, content at margins 6/25/6/7): the
 * 199x118 border with the `invite_summary`, the 180x70 word-wrapping `message_input` and the
 * `invite_note`, all Volter 9, over the thick `ok` (send) and plain `cancel` buttons at y 122.
 * `RoomInviteView.onMessageInput` cuts the message at 120 characters.
 */
export const FriendListRoomInviteView = () => {
    const isVisible = useIsWindowVisible('friendlist_invite');
    const { toggleWindow } = useSystemActions();
    const { send } = useWebSocketContext();
    const selectedFriendIds = useFriendsStore(x => x.selectedFriendIds);

    const [ message, setMessage ] = useState<string>('');

    const t = useTranslation();

    const sendRoomInvite = () => {
        if (selectedFriendIds.length < 1 || !message?.length || message.length > 255) return;

        send(new SendRoomInviteComposer({ message, playerIds: selectedFriendIds }));

        toggleWindow('friendlist_invite');
    };

    if (!isVisible) return null;

    return (
        <Frame
            variant="0"
            id="friendlist-room-invite"
            defaultPosition={{ x: 260, y: 20 }}
            dropShadow={false}
            resizeDirection="none"
            layout={{ position: 'absolute', width: 211, height: 175 }}
            margins={[ 6, 25, 6, 7 ]}
            caption={t('friendlist.invite.title')}
            onClose={() => toggleWindow('friendlist_invite')}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, top: 0, width: 199, height: 118 }}
            >
                <ThemeText
                    text={t('friendlist.invite.summary', '', { count: selectedFriendIds.length.toString() })}
                    textOptions={{ fontFamily: 'Volter', fontSize: 9 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, top: 5, width: 180, height: 20 }}
                />
                <TextInput
                    value={message}
                    onChange={setMessage}
                    maxLength={120}
                    multiline
                    fontFamily="Volter"
                    fontSize={9}
                    flashPlacement
                    border="#000000"
                    alwaysShowSelection
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 10, top: 24, width: 180, height: 70 }}
                />
                <ThemeText
                    text={t('friendlist.invite.note')}
                    textOptions={{ fontFamily: 'Volter', fontSize: 9 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, top: 98, width: 180, height: 20 }}
                />
            </Border>
            <Button
                variant="0"
                onPointerTap={() => toggleWindow('friendlist_invite')}
                layout={{ position: 'absolute', left: 139, top: 122, width: 60, height: 21, minWidth: 60, maxWidth: 60 }}
            >
                {t('generic.cancel')}
            </Button>
            <ButtonThick
                variant="0"
                onPointerTap={sendRoomInvite}
                layout={{ position: 'absolute', left: 0, top: 122, width: 60, height: 21, minWidth: 60, maxWidth: 60 }}
            >
                {t('friendlist.invite.send')}
            </ButtonThick>
        </Frame>
    );
};
