import { RemoveFriendComposer } from '@nitrodevco/nitro-packets';

import { useFriendsActions, useFriendsSelector, useFriendsSelectors, useIsWindowVisible, useSystemActions, useTranslation, useWebSocketContext } from '#base/context';
import { Border, Box, Button, Frame, ThemeText } from '#base/theme';

/** Pixi port of views/friendlist/dialogs/FriendListRemoveConfirmationView.tsx. */
export const FriendListRemoveConfirmationView = () => {
    const isVisible = useIsWindowVisible('friendlist_remove_confirmation');
    const { toggleWindow } = useSystemActions();
    const { selectedFriendIds } = useFriendsSelectors();
    const { setSelectedFriendIds } = useFriendsActions();
    const { send } = useWebSocketContext();

    const t = useTranslation();

    const friends = useFriendsSelector();

    const usernames = Object.values(friends)
        .filter(friend => selectedFriendIds.includes(friend.playerId))
        .map(friend => friend.name)
        .join(', ');

    const removeFriends = () => {
        if (selectedFriendIds.length < 1) return;

        send(new RemoveFriendComposer({ playerIds: selectedFriendIds }));

        setSelectedFriendIds([]);
        toggleWindow('friendlist_remove_confirmation');
    };

    if (!isVisible) return null;

    return (
        <Frame
            variant="0"
            id="friendlist-room-invite"
            layout={{ position: 'absolute', top: 20, left: 260, width: 211, height: 175 }}
            caption={t('friendlist.removefriendconfirm.title')}
            onClose={() => toggleWindow('friendlist_remove_confirmation')}
        >
            <Border layout={{ height: 116, paddingLeft: 9, paddingRight: 9, paddingTop: 4, paddingBottom: 4 }}>
                <ThemeText
                    layout={{ flex: 1 }}
                    text={t('friendlist.removefriendconfirm.userlist', '', { user_names: usernames })}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 190 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                <Button
                    layout={{ height: 22 }}
                    onPointerTap={removeFriends}
                >
                    {t('generic.ok')}
                </Button>
                <Button
                    layout={{ height: 22 }}
                    onPointerTap={() => toggleWindow('friendlist_remove_confirmation')}
                >
                    {t('generic.cancel')}
                </Button>
            </Box>
        </Frame>
    );
};
