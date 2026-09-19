import { AcceptFriendResultMessage, ConsoleMessageHistoryMessage, FindFriendsProcessResultMessage, FollowFriendErrorCodeType, FollowFriendFailedMessage, FriendListFragmentMessage, FriendListUpdateMessage, FriendNotificationMessage, FriendRequestsMessage, HabboSearchResultMessage, InstantMessageErrorMessage, MessengerErrorMessage, MessengerInitMessage, MiniMailNewMessage, MiniMailUnreadCountMessage, NewConsoleMessageMessage, NewFriendRequestMessage, RoomInviteErrorMessage, RoomInviteMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The friend list and the console - Flash's `HabboFriendList` and `HabboMessenger` message
 * handlers: the initial fragments, updates, requests, searches, room invites and the messages
 * themselves. The friend data lives in the user store because the room widgets read it too.
 */
/** `HabboFriendList.showAlertView`: what a rejected friend request is explained with. */
const FRIEND_REQUEST_ERRORS: Record<number, string> = {
    0: 'friendlist.error.friendlistownlimit',
    1: 'friendlist.error.friendlistlimitofrequester',
    2: 'friendlist.error.friend_requests_disabled',
    3: 'friendlist.error.requestnotfound',
    6: 'friendlist.error.blocked_by_them',
    7: 'friendlist.error.blocked_by_you',
};

export const registerMessengerHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFriendLimits, setFriendCategories, processFriends, processFriendUpdates, processFriendRequests } = userStore.getState();

    return subscribeAll(subscribe, [
        on(AcceptFriendResultMessage, (data) => {
            const { showAlert, getLocalizationValue } = systemStore.getState();

            for (const failure of data.failures) {
                const key = FRIEND_REQUEST_ERRORS[failure.errorCode];

                showAlert(getLocalizationValue('generic.alert.title'), key ? getLocalizationValue(key) : `Received messenger error: ${failure.errorCode}`);
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
