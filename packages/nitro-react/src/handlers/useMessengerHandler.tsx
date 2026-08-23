import { AcceptFriendResultMessage, ConsoleMessageHistoryMessage, FindFriendsProcessResultMessage, FollowFriendErrorCodeType, FollowFriendFailedMessage, FriendListFragmentMessage, FriendListUpdateMessage, FriendNotificationMessage, FriendRequestsMessage, HabboSearchResultMessage, InstantMessageErrorMessage, MessengerErrorMessage, MessengerInitMessage, MiniMailNewMessage, MiniMailUnreadCountMessage, NewConsoleMessageMessage, NewFriendRequestMessage, RoomInviteErrorMessage, RoomInviteMessage } from '@nitrodevco/nitro-packets';

import { useTranslation, useWebSocketContext } from '#base/context';
import { useUserMessengerActions } from '#base/context/user';
import { useMessageListener } from '#base/hooks';

export const useMessengerHandler = () => {
    const { setFriendLimits, setFriendCategories, processFriends, processFriendUpdates, processFriendRequests } = useUserMessengerActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    useMessageListener(AcceptFriendResultMessage, (data) => {
        if (!data.failures.length) return;

        for (const failure of data.failures) {
            const playerId = failure.playerId;
            const errorType = failure.errorCode;

            // TODO alert or summ
        }
    });

    useMessageListener(ConsoleMessageHistoryMessage, (data) => {
    });

    useMessageListener(FindFriendsProcessResultMessage, (data) => {
        const title = data.success ? 'friendbar.find.success.title' : 'friendbar.find.error.title';
        const text = data.success ? 'friendbar.find.success.text' : 'friendbar.find.error.text';

        // window.notify(t(title), t(text))
    });

    useMessageListener(FollowFriendFailedMessage, (data) => {
        const title = 'friendlist.alert.title';

        let errorText = 'Unknown follow friend error' + data.errorCode;

        switch (data.errorCode) {
            case FollowFriendErrorCodeType.NotFriend:
                errorText = 'friendlist.followerror.notfriend';
                break;
            case FollowFriendErrorCodeType.Offline:
                errorText = 'friendlist.followerror.offline';
                break;
            case FollowFriendErrorCodeType.HotelView:
                errorText = 'friendlist.followerror.hotelview';
                break;
            case FollowFriendErrorCodeType.Prevented:
                errorText = 'friendlist.followerror.prevented';
                break;
        }

        // window.simpleAlert(title, errorText)
    });

    useMessageListener(FriendListFragmentMessage, (data) => {
        if (!data.fragment.length) return;

        processFriends(data.fragment);
    });

    useMessageListener(FriendListUpdateMessage, (data) => {
        if (data.friendCategories) setFriendCategories(data.friendCategories);

        if (data.updates && data.updates.length > 0) processFriendUpdates(data.updates);
    });

    useMessageListener(FriendNotificationMessage, (data) => {
    });

    useMessageListener(FriendRequestsMessage, (data) => {
        if (!data.requests.length) return;

        processFriendRequests(data.requests);
    });

    useMessageListener(HabboSearchResultMessage, (data) => {
    });

    useMessageListener(InstantMessageErrorMessage, (data) => {
    });

    useMessageListener(MessengerErrorMessage, (data) => {
    });

    useMessageListener(MessengerInitMessage, (data) => {
        setFriendLimits(data.userFriendLimit, data.normalFriendLimit, data.extendedFriendLimit);

        if (data.friendCategories) setFriendCategories(data.friendCategories);
    });

    useMessageListener(MiniMailNewMessage, (data) => {
    });

    useMessageListener(MiniMailUnreadCountMessage, (data) => {
    });

    useMessageListener(NewConsoleMessageMessage, (data) => {
    });

    useMessageListener(NewFriendRequestMessage, (data) => {
        processFriendRequests([ data.request ]);
    });

    useMessageListener(RoomInviteErrorMessage, (data) => {
    });

    useMessageListener(RoomInviteMessage, (data) => {
    });
};
