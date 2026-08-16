import { RemoveFriendComposer } from "@nitrodevco/nitro-packets";

import { useFriendsActions, useFriendsSelector, useFriendsSelectors, useIsWindowVisible, useSystemActions, useTranslation, useWebSocketContext } from "#base/context";
import { Border, Button, Frame } from "#base/theme";

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
        .join(', ')

    const removeFriends = () => {
        if (selectedFriendIds.length < 1) return;

        send(new RemoveFriendComposer({ playerIds: selectedFriendIds }));

        setSelectedFriendIds([]);
        toggleWindow('friendlist_remove_confirmation');
    }

    if (!isVisible) return null;

    return (
        <Frame variant="0" id="friendlist-room-invite" className="w-52.75 h-43.75" caption={t('friendlist.removefriendconfirm.title')} onClose={() => toggleWindow('friendlist_remove_confirmation')}>
            <Border className="h-29 px-2.25 py-1 overflow-hidden">
                <div className="text-[0.7rem] mb-0.5 leading-3.5">{t('friendlist.removefriendconfirm.userlist', '', { 'user_names': usernames })}</div>
            </Border>
            <div className="flex justify-between items-center mt-0.75">
                <Button className="h-5.5" onClick={removeFriends}>{t('generic.ok')}</Button>
                <Button className="h-5.5" onClick={() => toggleWindow('friendlist_remove_confirmation')}>{t('generic.cancel')}</Button>
            </div>
        </Frame>
    );
}