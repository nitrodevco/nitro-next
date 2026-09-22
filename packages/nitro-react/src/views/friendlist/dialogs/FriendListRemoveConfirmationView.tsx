import { RemoveFriendComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useFriendsActions, useFriendsStore } from '#base/context/friend';
import { useIsWindowVisible, useSystemActions, useTranslation } from '#base/context/system';
import { useFriends } from '#base/context/user';
import { Border, Button, ButtonThick, Frame, ThemeText } from '#base/theme';

/**
 * `FriendRemoveView` - the `friend_remove_confirm` alert (160x200, content at margins
 * 6/25/6/7): the 150x143 border with the word-wrapped Volter 9 `remove_info` naming the selected
 * friends, over the thick `ok` and plain `cancel` buttons at y 147.
 */
export const FriendListRemoveConfirmationView = () => {
    const isVisible = useIsWindowVisible('friendlist_remove_confirmation');
    const { toggleWindow } = useSystemActions();
    const selectedFriendIds = useFriendsStore(x => x.selectedFriendIds);
    const { setSelectedFriendIds } = useFriendsActions();
    const { send } = useWebSocketContext();

    const t = useTranslation();

    const friends = useFriends();

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
            id="friendlist-remove-confirmation"
            defaultPosition={{ x: 260, y: 20 }}
            dropShadow={false}
            resizeDirection="none"
            layout={{ position: 'absolute', width: 160, height: 200 }}
            margins={[ 6, 25, 6, 7 ]}
            caption={t('friendlist.removefriendconfirm.title')}
            onClose={() => toggleWindow('friendlist_remove_confirmation')}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, top: 0, width: 150, height: 143 }}
            >
                <ThemeText
                    text={t('friendlist.removefriendconfirm.userlist', '', { user_names: usernames })}
                    textOptions={{ fontFamily: 'Volter', fontSize: 9, wordWrap: true, wordWrapWidth: 126 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, top: 10, width: 130, height: 120 }}
                />
            </Border>
            <Button
                variant="0"
                onPointerTap={() => toggleWindow('friendlist_remove_confirmation')}
                layout={{ position: 'absolute', left: 88, top: 147, width: 60, height: 21, minWidth: 60, maxWidth: 60 }}
            >
                {t('generic.cancel')}
            </Button>
            <ButtonThick
                variant="0"
                onPointerTap={removeFriends}
                layout={{ position: 'absolute', left: 0, top: 147, width: 60, height: 21, minWidth: 60, maxWidth: 60 }}
            >
                {t('generic.ok')}
            </ButtonThick>
        </Frame>
    );
};
