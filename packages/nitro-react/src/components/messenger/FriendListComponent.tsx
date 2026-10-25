import { MessengerInitComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible } from '#base/context/system';
import { FriendListRemoveConfirmationView } from '#base/views/friendlist/dialogs/FriendListRemoveConfirmationView';
import { FriendListRoomInviteView } from '#base/views/friendlist/dialogs/FriendListRoomInviteView';
import { FriendListView } from '#base/views/friendlist/FriendListView';

/**
 * The friend list - `HabboFriendList`: asks for the messenger's init on mount (its answer starts
 * the friend list update timer, in `registerMessengerHandlers`), and while the `friendlist` window
 * is open shows the list with its room invite and remove friend dialogs.
 */
export const FriendListComponent = () => {
    const isVisible = useIsWindowVisible('friendlist');
    const { send } = useWebSocketContext();

    useEffect(() => {
        send(new MessengerInitComposer({}));
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <FriendListView />
            <FriendListRoomInviteView />
            <FriendListRemoveConfirmationView />
        </>
    );
};
