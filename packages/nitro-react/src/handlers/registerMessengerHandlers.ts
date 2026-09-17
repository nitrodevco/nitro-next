import { AcceptFriendResultMessage, ConsoleMessageHistoryMessage, FindFriendsProcessResultMessage, FollowFriendErrorCodeType, FollowFriendFailedMessage, FriendListFragmentMessage, FriendListUpdateMessage, FriendNotificationMessage, FriendRequestsMessage, HabboSearchResultMessage, InstantMessageErrorMessage, MessengerErrorMessage, MessengerInitMessage, MiniMailNewMessage, MiniMailUnreadCountMessage, NewConsoleMessageMessage, NewFriendRequestMessage, RoomInviteErrorMessage, RoomInviteMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from './packetSubscriptions';

export const registerMessengerHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFriendLimits, setFriendCategories, processFriends, processFriendUpdates, processFriendRequests } = userStore.getState();

    return subscribeAll(subscribe, [
        on(AcceptFriendResultMessage, (data) => {
            if (!data.failures.length) return;

            for (const failure of data.failures) {
                const playerId = failure.playerId;
                const errorType = failure.errorCode;

                // TODO alert or summ
            }
        }),

        on(ConsoleMessageHistoryMessage, (data) => {
        }),

        on(FindFriendsProcessResultMessage, (data) => {
            const title = data.success ? 'friendbar.find.success.title' : 'friendbar.find.error.title';
            const text = data.success ? 'friendbar.find.success.text' : 'friendbar.find.error.text';

            // window.notify(t(title), t(text))
        }),

        on(FollowFriendFailedMessage, (data) => {
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
        }),

        on(FriendListFragmentMessage, (data) => {
            if (!data.fragment.length) return;

            processFriends(data.fragment);
        }),

        on(FriendListUpdateMessage, (data) => {
            if (data.friendCategories) setFriendCategories(data.friendCategories);

            if (data.updates && data.updates.length > 0) processFriendUpdates(data.updates);
        }),

        on(FriendNotificationMessage, (data) => {
        }),

        on(FriendRequestsMessage, (data) => {
            if (!data.requests.length) return;

            processFriendRequests(data.requests);
        }),

        on(HabboSearchResultMessage, (data) => {
        }),

        on(InstantMessageErrorMessage, (data) => {
        }),

        on(MessengerErrorMessage, (data) => {
        }),

        on(MessengerInitMessage, (data) => {
            setFriendLimits(data.userFriendLimit, data.normalFriendLimit, data.extendedFriendLimit);

            if (data.friendCategories) setFriendCategories(data.friendCategories);
        }),

        on(MiniMailNewMessage, (data) => {
        }),

        on(MiniMailUnreadCountMessage, (data) => {
        }),

        on(NewConsoleMessageMessage, (data) => {
        }),

        on(NewFriendRequestMessage, (data) => {
            processFriendRequests([ data.request ]);
        }),

        on(RoomInviteErrorMessage, (data) => {
        }),

        on(RoomInviteMessage, (data) => {
        }),
    ]);
};
