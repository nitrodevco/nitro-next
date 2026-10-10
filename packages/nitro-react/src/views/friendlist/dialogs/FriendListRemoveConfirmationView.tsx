import { RemoveFriendComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useFriendsActions, useFriendsStore } from '#base/context/friend';
import { useIsWindowVisible, useSystemActions } from '#base/context/system';
import { useFriends } from '#base/context/user';
import { TemplateWindow, useTemplateFrame } from '#base/theme';

import { friendListAlertPosition } from './friendListAlertPosition';

/** The alert's frame (`friend_remove_confirm`'s 160x200). */
const ALERT_WIDTH = 160;
const ALERT_HEIGHT = 200;

const TEMPLATE = 'habbo-friend-list-com/friend_remove_confirm_xml';

/**
 * `FriendRemoveView` - the `friend_remove_confirm` alert (`AlertView`): `remove_info` names the
 * selected friends (`Util.arrayToString`, registered as `user_names`), `ok` removes them and
 * `cancel` or the close button drops the alert.
 */
const FriendListRemoveConfirmation = () => {
    const { toggleWindow } = useSystemActions();
    const selectedFriendIds = useFriendsStore(x => x.selectedFriendIds);
    const { setSelectedFriendIds } = useFriendsActions();
    const { send } = useWebSocketContext();
    const friends = useFriends();

    const close = () => toggleWindow('friendlist_remove_confirmation');
    const windowRect = useFriendsStore(x => x.windowRect);
    const frame = useTemplateFrame({ id: 'friendlist-remove-confirmation', defaultPosition: friendListAlertPosition(windowRect, ALERT_WIDTH, ALERT_HEIGHT), rememberPosition: false, onClose: close });

    const usernames = Object.values(friends)
        .filter(friend => selectedFriendIds.includes(friend.playerId))
        .map(friend => friend.name)
        .join(', ');

    /** `onRemove`: one `RemoveFriendMessageComposer` for every selected friend. */
    const removeFriends = () => {
        if (selectedFriendIds.length > 0) {
            send(new RemoveFriendComposer({ playerIds: selectedFriendIds }));
            setSelectedFriendIds([]);
        }

        close();
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            parameters={{ 'friendlist.removefriendconfirm.userlist': { user_names: usernames } }}
            bindings={{
                cancel: { onPointerTap: close },
                ok: { onPointerTap: removeFriends },
            }}
        />
    );
};

export const FriendListRemoveConfirmationView = () => {
    const isVisible = useIsWindowVisible('friendlist_remove_confirmation');

    if (!isVisible) return null;

    return <FriendListRemoveConfirmation />;
};
