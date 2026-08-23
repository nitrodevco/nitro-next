import { FriendListUpdateComposer, MessengerInitComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useIsWindowVisible, useWebSocketContext } from '#base/context';
import { FriendListRemoveConfirmationViewPixi } from '#base/views-pixi/friendlist/dialogs/FriendListRemoveConfirmationViewPixi';
import { FriendListRoomInviteViewPixi } from '#base/views-pixi/friendlist/dialogs/FriendListRoomInviteViewPixi';
import { FriendListViewPixi } from '#base/views-pixi/friendlist/FriendListViewPixi';

export const FriendListComponent = () => {
    const isVisible = useIsWindowVisible('friendlist');
    const { send } = useWebSocketContext();

    useEffect(() => {
        send(new MessengerInitComposer({}));

        const interval = setInterval(() => send(new FriendListUpdateComposer({})), 120000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <FriendListViewPixi />
            <FriendListRoomInviteViewPixi />
            <FriendListRemoveConfirmationViewPixi />
        </>
    );
};
