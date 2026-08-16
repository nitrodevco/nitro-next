import { FriendListUpdateComposer, MessengerInitComposer } from "@nitrodevco/nitro-packets";
import { useEffect } from "react";

import { useIsWindowVisible, useWebSocketContext } from "#base/context";
import { FriendListRemoveConfirmationView } from "#base/views/friendlist/dialogs/FriendListRemoveConfirmationView";
import { FriendListRoomInviteView } from "#base/views/friendlist/dialogs/FriendListRoomInviteView";
import { FriendListView } from "#base/views/friendlist/FriendListView";

export const FriendListComponent = () => {
    const isVisible = useIsWindowVisible('friendlist');
    const { send } = useWebSocketContext();

    useEffect(() => {
        send(new MessengerInitComposer({}));

        const interval = setInterval(() => send(new FriendListUpdateComposer({})), 120000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <FriendListView />
            <FriendListRoomInviteView />
            <FriendListRemoveConfirmationView />
        </>
    );
}
