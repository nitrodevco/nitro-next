import {
    AcceptFriendResultMessage, ConsoleMessageHistoryMessage, FindFriendsProcessResultMessage, FollowFriendErrorCodeType, FollowFriendFailedMessage, FriendListErrorCodeType, FriendListFragmentMessage, FriendListUpdateMessage,
    FriendRequestsMessage, GetFriendRequestsComposer, HabboGroupDetailsMessage, HabboSearchResultMessage, InstantMessageErrorMessage, MessengerErrorMessage, MessengerInitMessage, MiniMailNewMessage, MiniMailUnreadCountMessage, NewConsoleMessageMessage, NewFriendRequestMessage, RoomInviteErrorMessage,
    RoomInviteMessage,
} from '@nitrodevco/nitro-packets';

import { addMessengerConsoleMessage, addMessengerInstantMessageError, addMessengerRoomInvite, friendRequestAcceptFailed, goToRoom, highlightFriendListTab, loadMessengerHistory, notifyFriendOnline, playMessengerMessageReceivedSound, setMessengerOnlineStatus } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { messengerStore } from '#base/context/messenger';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { configReader } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The friend list - Flash's `HabboFriendList` message handlers: the initial fragments, updates,
 * requests, the search tab's results and the errors the list reports. The friend data lives in the
 * user store because the room widgets read it too.
 *
 * And `HabboMessenger`'s console: new messages, their history, instant message errors and room
 * invites go to `MainView` (`commands/messengerCommands.ts`); a friend coming online or going
 * offline is noted in an open conversation (`FriendCategories.onFriendListUpdate` ->
 * `setOnlineStatus`); a group chat's follow finishes on the group's details. Mini mail's unread
 * count is kept only while `client.minimail.embed.enabled` is on, as `HabboMessenger` only listens
 * then; it is shown on the me menu icon (`HabboToolbar.onMiniMailUpdate`).
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

/** `HabboFriendList.simpleAlert`: the window manager's `simpleAlert` with a caption and a message only. */
const friendListAlert = (title: string, message: string) => systemStore.getState().showSimpleAlert({ caption: title, message });

/** `HabboFriendList.showAlertView`, under `friendlist.alert.title`; an unknown code is shown raw, as Flash did. */
const showFriendListError = (errorCode: number, clientMessageId: number = 0) => {
    const { getLocalizationValue } = systemStore.getState();
    const key = FRIEND_LIST_ERRORS[errorCode];

    friendListAlert(getLocalizationValue('friendlist.alert.title'), key ? getLocalizationValue(key) : `Received messenger error: msg: ${clientMessageId}, errorCode: ${errorCode}`);
};

/** `client.minimail.embed.enabled`: `HabboMessenger` listens for mini mail only with it on. */
const miniMailEnabled = () => configReader(systemStore.getState().config).configBoolean('client.minimail.embed.enabled');

export const registerMessengerHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setFriendLimits, setFriendCategories, processFriends, processFriendUpdates, processFriendRequests, replaceFriendRequests, setSearchResults } = userStore.getState();

    return subscribeAll(subscribe, [
        // `HabboFriendList.onAcceptFriendResult`: each refused request is marked failed, and explained.
        on(AcceptFriendResultMessage, (data) => {
            for (const failure of data.failures) {
                friendRequestAcceptFailed(failure.playerId);
                showFriendListError(failure.errorCode);
            }
        }),

        // `HabboFriendBarView.onFindFriendsNotification`: `notify`, which is the plain alert with its ok button.
        on(FindFriendsProcessResultMessage, (data) => {
            const { showAlert, getLocalizationValue } = systemStore.getState();
            const title = data.success ? 'friendbar.find.success.title' : 'friendbar.find.error.title';
            const text = data.success ? 'friendbar.find.success.text' : 'friendbar.find.error.text';

            showAlert(getLocalizationValue(title, title), getLocalizationValue(text, text));
        }),

        // `HabboFriendList.onFollowFriendFailed`, with `getFollowFriendErrorText`.
        on(FollowFriendFailedMessage, (data) => {
            const { getLocalizationValue } = systemStore.getState();

            let errorText = '';

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

            friendListAlert(getLocalizationValue('friendlist.alert.title'), errorText ? getLocalizationValue(errorText) : `Unknown follow friend error ${data.errorCode}`);
        }),

        on(FriendListFragmentMessage, (data) => {
            if (!data.fragment.length) return;

            processFriends(data.fragment);
        }),

        on(FriendListUpdateMessage, (data) => {
            if (data.friendCategories) setFriendCategories(data.friendCategories);

            // `FriendCategories.onFriendListUpdate`: tell the messenger when a friend's online flag flips.
            const { friends } = userStore.getState();

            for (const update of data.updates ?? []) {
                if (!update.friend) continue;

                const previous = friends[update.friend.playerId];
                const wasOnline = previous?.isOnline ?? false;

                if (wasOnline !== update.friend.isOnline) setMessengerOnlineStatus(send, update.friend.playerId, update.friend.isOnline);

                // `FriendsView.setNewMessageArrived`: a friend coming online highlights the friends tab.
                if (!wasOnline && update.friend.isOnline) highlightFriendListTab('friends');

                // `FriendCategories.onFriendListUpdate`: a friend already listed who comes online is announced; a new friend is not.
                if (previous && !previous.isOnline && update.friend.isOnline) notifyFriendOnline(update.friend);
            }

            if (data.updates && data.updates.length > 0) processFriendUpdates(data.updates);
        }),

        // `HabboFriendList.onFriendRequests`: the list is replaced, even by an empty one.
        // Any request in it highlights the requests tab.
        on(FriendRequestsMessage, (data) => {
            replaceFriendRequests(data.requests);

            if (data.requests.length > 0) highlightFriendListTab('requests');
        }),

        // `HabboFriendList.onHabboSearchResult`: `AvatarSearchResults.searchReceived`, which redraws the search tab.
        on(HabboSearchResultMessage, data => setSearchResults(data.friends, data.others)),

        // `HabboFriendList.onMessengerError`.
        on(MessengerErrorMessage, data => showFriendListError(data.errorCode, data.clientMessageId)),

        on(MessengerInitMessage, (data) => {
            setFriendLimits(data.userFriendLimit, data.normalFriendLimit, data.extendedFriendLimit);

            if (data.friendCategories) setFriendCategories(data.friendCategories);

            // `HabboFriendList.onMessengerInit` -> `getFriendRequests`: the requests waiting since the
            // last session come only when asked; `NewFriendRequest` brings just the ones sent live.
            send(new GetFriendRequestsComposer({}));
        }),

        // `HabboFriendList.onNewFriendRequest`: the request is added and the requests tab highlighted.
        on(NewFriendRequestMessage, (data) => {
            processFriendRequests([ data.request ]);
            highlightFriendListTab('requests');
        }),

        // `HabboMessenger.onNewConsoleMessage`.
        on(NewConsoleMessageMessage, data => addMessengerConsoleMessage(send, data)),

        // `HabboMessenger.onConsoleHistory`.
        on(ConsoleMessageHistoryMessage, data => loadMessengerHistory(data.chatId, data.messages)),

        // `HabboMessenger.onInstantMessageError`.
        on(InstantMessageErrorMessage, data => addMessengerInstantMessageError(send, data.playerId, data.errorCode, data.message)),

        // `HabboMessenger.onRoomInvite`.
        on(RoomInviteMessage, data => addMessengerRoomInvite(send, data.senderId, data.message)),

        // `HabboMessenger.onHabboGroupDetails`: a group chat's follow goes to the group's room.
        on(HabboGroupDetailsMessage, (data) => {
            if (!messengerStore.getState().followingToGroupRoom) return;

            messengerStore.getState().setFollowingToGroupRoom(false);
            goToRoom(send, data.data.roomId);
        }),

        // `HabboMessenger.onMiniMailMessage` / `onMiniMailUnreadCount`, registered only with the embedded mini mail on.
        on(MiniMailNewMessage, () => {
            if (!miniMailEnabled()) return;

            messengerStore.getState().addMiniMailUnread();
            playMessengerMessageReceivedSound();
        }),
        on(MiniMailUnreadCountMessage, (data) => {
            if (miniMailEnabled()) messengerStore.getState().setMiniMailUnreadCount(data.unreadCount);
        }),

        // `HabboFriendList.onRoomInviteError`: shown raw, the recipients joined the way `Util.arrayToString` does.
        on(RoomInviteErrorMessage, (data) => {
            friendListAlert(systemStore.getState().getLocalizationValue('friendlist.alert.title'), `Received room invite error: errorCode: ${data.errorCode}, recipients: ${data.failedRecipients.join(', ')}`);
        }),
    ]);
};
