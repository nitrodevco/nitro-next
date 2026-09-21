import { SendRoomInviteComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useFriendsStore } from '#base/context/friend';
import { useIsWindowVisible, useSystemActions, useTranslation } from '#base/context/system';
import { Border, Box, Button, Frame, TextInput, ThemeText } from '#base/theme';

/** Pixi port of views/friendlist/dialogs/FriendListRoomInviteView.tsx. */
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
            layout={{ position: 'absolute', width: 211, height: 175 }}
            caption={t('friendlist.invite.title')}
            onClose={() => toggleWindow('friendlist_invite')}
        >
            <Border layout={{ height: 116, flexDirection: 'column', paddingLeft: 9, paddingRight: 9, paddingTop: 4, paddingBottom: 4 }}>
                <ThemeText
                    text={t('friendlist.invite.summary', '', { count: selectedFriendIds.length.toString() })}
                    textOptions={{ fill: '#000000', fontFamily: 'Volter', fontSize: 9 }}
                />
                <TextInput
                    value={message}
                    onChange={setMessage}
                    maxLength={255}
                    multiline
                    fontSize={9.12}
                    layout={{ width: '100%', height: 70, marginTop: 2 }}
                />
                <ThemeText
                    layout={{ marginTop: 1 }}
                    text={t('friendlist.invite.note')}
                    textOptions={{ fill: '#000000', fontFamily: 'Volter', fontSize: 9 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                <Button
                    layout={{ height: 22 }}
                    onPointerTap={sendRoomInvite}
                >
                    {t('friendlist.invite.send')}
                </Button>
                <Button
                    layout={{ height: 22 }}
                    onPointerTap={() => toggleWindow('friendlist_invite')}
                >
                    {t('generic.cancel')}
                </Button>
            </Box>
        </Frame>
    );
};
