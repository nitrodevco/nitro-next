import { AcceptFriendResultMessage, ConsoleMessageHistoryMessage, FindFriendsProcessResultMessage, FollowFriendErrorCodeType, FollowFriendFailedMessage, FriendListErrorCodeType, FriendListFragmentMessage, FriendListUpdateMessage, FriendNotificationMessage, FriendRequestsMessage, HabboSearchResultMessage, InstantMessageErrorMessage, MessengerErrorMessage, MessengerInitMessage, MiniMailNewMessage, MiniMailUnreadCountMessage, NewConsoleMessageMessage, NewFriendRequestMessage, RoomInviteErrorMessage, RoomInviteMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The friend list and the console - Flash's `HabboFriendList` and `HabboMessenger` message
 * handlers: the initial fragments, updates, requests, searches, room invites and the messages
 * themselves. The friend data lives in the user store because the room widgets read it too.
 */
/**
 * `HabboFriendList.showAlertView`: the text a friend list error code is explained with, for a
 * rejected friend request (`AcceptFriendResult`) and a `MessengerError` alike. The codes are
 * `FriendListErrorCodeType`'s (Flash switches on `errorCode - 1`, so its `case 0` is code 1).
 * Checked against Flash by `scripts/drift/constants.py`.
 */
const FRIEND_LIST_ERRORS: Record<number, string> = {
    [FriendListErrorCodeType.YouHitFriendLimit]: 'friendlist.error.friendlistownlimit',
    [FriendListErrorCodeType.TheyHitFriendLimit]: 'friendlist.error.friendlistlimitofrequester',
    [FriendListErrorCodeType.FriendRequestsDisabled]: 'friendlist.error.friend_requests_disabled',
    [FriendListErrorCodeType.FriendRequestNotFound]: 'friendlist.error.requestnotfound',
    [FriendListErrorCodeType.BlockedByThem]: 'friendlist.error.blocked_by_them',
    [FriendListErrorCodeType.BlockedByYou]: 'friendlist.error.blocked_by_you',
};

/** `HabboFriendList.showAlertView`, under `friendlist.alert.title`; an unknown code is shown raw, as Flash did. */
const showFriendListError = (errorCode: number, clientMessageId: number = 0) => {
    const { showAlert, getLocalizationValue } = systemStore.getState();
    const key = FRIEND_LIST_ERRORS[errorCode];

    showAlert(getLocalizationValue('friendlist.alert.title'), key ? getLocalizationValue(key) : `Received messenger error: msg: ${clientMessageId}, errorCode: ${errorCode}`);
};

export const registerMessengerHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFriendLimits, setFriendCategories, processFriends, processFriendUpdates, processFriendRequests } = userStore.getState();

    return subscribeAll(subscribe, [
        on(AcceptFriendResultMessage, (data) => {
            for (const failure of data.failures) showFriendListError(failure.errorCode);
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

        // `HabboFriendList.onMessengerError`.
        on(MessengerErrorMessage, data => showFriendListError(data.errorCode, data.clientMessageId)),

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
