import { SendRoomInviteComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useFriendsSelectors, useIsWindowVisible, useSystemActions, useTranslation, useWebSocketContext } from '#base/context';
import { Border, Box, Button, Frame, ThemeText, TextInput } from '#base/theme';

/** Pixi port of views/friendlist/dialogs/FriendListRoomInviteView.tsx. */
export const FriendListRoomInviteView = () => {
    const isVisible = useIsWindowVisible('friendlist_invite');
    const { toggleWindow } = useSystemActions();
    const { send } = useWebSocketContext();
    const { selectedFriendIds } = useFriendsSelectors();

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
            layout={{ position: 'absolute', top: 20, left: 260, width: 211, height: 175 }}
            caption={t('friendlist.invite.title')}
            onClose={() => toggleWindow('friendlist_invite')}
        >
            <Border layout={{ height: 116, flexDirection: 'column', paddingLeft: 9, paddingRight: 9, paddingTop: 4, paddingBottom: 4 }}>
                <ThemeText
                    text={t('friendlist.invite.summary', '', { count: selectedFriendIds.length.toString() })}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#000000' }}
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
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#000000' }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                <Button
                    layout={{ height: 22 }}
                    onPress={sendRoomInvite}
                >
                    {t('friendlist.invite.send')}
                </Button>
                <Button
                    layout={{ height: 22 }}
                    onPress={() => toggleWindow('friendlist_invite')}
                >
                    {t('generic.cancel')}
                </Button>
            </Box>
        </Frame>
    );
};
