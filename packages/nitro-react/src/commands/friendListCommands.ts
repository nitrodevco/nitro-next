import { AcceptFriendComposer, DeclineFriendComposer, EventLogComposer, FollowFriendComposer, FriendRequestQuestCompleteComposer, FriendRequestStateType, HabboSearchComposer, IFriendRequest, IMessengerFriend, MessengerFriendRelationType, SendRoomInviteComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';
import { FriendListHighlightedTabs, UserStore, userStore } from '#base/context/user';

import { sendFriendRequest } from './roomUserCommands';

type Send = WebSocketConnection['send'];

/**
 * What Flash's `HabboFriendList` does on behalf of its search tab (`SearchView`) and anything else
 * that asks someone to be a friend: the search itself, the friend request with the friend list's
 * own limit check, and the two alerts that answer it.
 */

/**
 * `FriendCategories.getFriendCount(false)`, less the group chats. Flash counts every entry of its
 * lists, groups included, but Turbo's friend limit counts friendships only, so a group chat must
 * not make the list look full before the server thinks it is.
 */
export const countFriends = (friends: Record<number, IMessengerFriend>): number => Object.values(friends).filter(friend => friend.playerId > 0).length;

/** `SearchView.searchAvatar`: an empty search is not sent. */
export const searchAvatar = (send: Send, searchQuery: string) => {
    if (searchQuery === '') return;

    send(new HabboSearchComposer({ searchQuery }));
};

/**
 * `HabboFriendList.canBeAskedForAFriend`: not a friend already, not asked already, and fewer
 * friends than the list's limit (`friendRequests.limit`, which `MessengerInit` sets from
 * `userFriendLimit`). A selector passes the state it was given, so a view follows the friend list.
 */
export const canBeAskedForAFriend = (userId: number, state: UserStore = userStore.getState()): boolean => {
    const { friends, sentFriendRequestIds, userFriendLimit } = state;

    return !friends[userId] && !sentFriendRequestIds.includes(userId) && (countFriends(friends) < userFriendLimit);
};

/**
 * `HabboFriendList.askForAFriend`: true once the request is out - or was already - and false when
 * the friend list cannot take another friend. A request that goes out also completes the friend
 * request quest.
 */
export const askForAFriend = (send: Send, userId: number, name: string): boolean => {
    if (userStore.getState().sentFriendRequestIds.includes(userId)) return true;

    if (!canBeAskedForAFriend(userId)) return false;

    sendFriendRequest(send, userId, name);
    send(new FriendRequestQuestCompleteComposer({}));

    return true;
};

/** `HabboFriendList.showLimitReachedAlert`. */
export const showFriendLimitReachedAlert = () => {
    const { getLocalizationValue, showSimpleAlert } = systemStore.getState();
    const { userFriendLimit, extendedFriendLimit } = userStore.getState();

    showSimpleAlert({
        caption: getLocalizationValue('friendlist.listfull.title'),
        message: getLocalizationValue('friendlist.listfull.text', '', { mylimit: String(userFriendLimit), clublimit: String(extendedFriendLimit) }),
    });
};

/** `HabboFriendList.showFriendRequestSentAlert`. */
export const showFriendRequestSentAlert = (name: string) => {
    const { getLocalizationValue, showSimpleAlert } = systemStore.getState();

    showSimpleAlert({
        caption: getLocalizationValue('friendlist.friendrequestsent.title'),
        message: getLocalizationValue('friendlist.friendrequestsent.text', '', { user_name: name }),
    });
};

/**
 * `FriendRequestsView.acceptRequest`: the request is marked accepted before the limit is asked,
 * as Flash did, so a request refused for a full list is dropped on the next tab click without
 * having been sent.
 */
export const acceptFriendRequest = (send: Send, requestId: number) => {
    const { friends, requests, userFriendLimit, setFriendRequestsState } = userStore.getState();

    if (!requests[requestId]) return;

    setFriendRequestsState([ requestId ], FriendRequestStateType.Accepted);

    if (countFriends(friends) >= userFriendLimit) {
        showFriendLimitReachedAlert();

        return;
    }

    send(new AcceptFriendComposer({ playerIds: [ requestId ] }));
};

/**
 * `FriendRequestsView.acceptAllRequests`: refused outright when every listed request - answered
 * ones included - would not fit; otherwise every request not yet accepted or declined goes in one
 * packet.
 */
export const acceptAllFriendRequests = (send: Send) => {
    const { friends, requests, userFriendLimit, setFriendRequestsState } = userStore.getState();
    const list = Object.values(requests);

    if ((countFriends(friends) + list.length) > userFriendLimit) {
        showFriendLimitReachedAlert();

        return;
    }

    const requestIds = list.filter(isUnanswered).map(request => request.playerId);

    setFriendRequestsState(requestIds, FriendRequestStateType.Accepted);
    send(new AcceptFriendComposer({ playerIds: requestIds }));
};

/** `FriendRequestsView.declineRequest`. */
export const declineFriendRequest = (send: Send, requestId: number) => {
    const { requests, setFriendRequestsState } = userStore.getState();

    if (!requests[requestId]) return;

    setFriendRequestsState([ requestId ], FriendRequestStateType.Declined);
    send(new DeclineFriendComposer({ declineAll: false, playerIds: [ requestId ] }));
};

/** `FriendRequestsView.declineAllRequests`: the "all" form of the packet, sent even for an empty list. */
export const declineAllFriendRequests = (send: Send) => {
    const { requests, setFriendRequestsState } = userStore.getState();

    send(new DeclineFriendComposer({ declineAll: true, playerIds: [] }));
    setFriendRequestsState(Object.values(requests).filter(isUnanswered).map(request => request.playerId), FriendRequestStateType.Declined);
};

/** `FriendRequests.acceptFailed`: the server refused to accept the request from this requester. */
export const friendRequestAcceptFailed = (requesterId: number) => userStore.getState().setFriendRequestsState([ requesterId ], FriendRequestStateType.Failed);

/** Neither accepted nor declined (`state != 2 && state != 3`): open, or a failed accept that may be tried again. */
const isUnanswered = (request: IFriendRequest) => (request.state !== FriendRequestStateType.Accepted) && (request.state !== FriendRequestStateType.Declined);

/** `FriendsView.onFollowButtonClick`. */
export const followFriend = (send: Send, friendId: number) => {
    send(new FollowFriendComposer({ playerId: friendId }));
    send(new EventLogComposer({ event: 'Navigation', data: 'Friend List', action: 'go.friendlist', extraString: '', extraInt: 0 }));
};

/** `HabboFriendList._lastRoomInvitationTime`: the client's own minute between room invitations, starting open. */
const ROOM_INVITATION_INTERVAL_MS = 60000;

let lastRoomInvitationTime = -ROOM_INVITATION_INTERVAL_MS;

/** `FriendsView.onInviteButtonClick`: true when an invitation may be written now, else the frequency alert. */
export const canOpenRoomInvite = (): boolean => {
    if ((performance.now() - lastRoomInvitationTime) >= ROOM_INVITATION_INTERVAL_MS) return true;

    const { getLocalizationValue, showSimpleAlert } = systemStore.getState();

    showSimpleAlert({ caption: getLocalizationValue('friendlist.invite.frequentalert.title'), message: getLocalizationValue('friendlist.invite.frequentalert.text') });

    return false;
};

/**
 * `RoomInviteView.sendMsg`: an empty text is refused with its alert; otherwise the invitation
 * goes to the selected friends and the minute starts again. True when it was sent.
 */
export const sendRoomInvite = (send: Send, friendIds: number[], message: string): boolean => {
    if (message === '') {
        const { getLocalizationValue, showSimpleAlert } = systemStore.getState();

        showSimpleAlert({ caption: getLocalizationValue('friendlist.invite.emptyalert.title'), message: getLocalizationValue('friendlist.invite.emptyalert.text') });

        return false;
    }

    lastRoomInvitationTime = performance.now();
    send(new SendRoomInviteComposer({ message, playerIds: friendIds }));

    return true;
};

/**
 * `FriendCategories.notifyFriendOnline`: the "friend online" bubble, while
 * `friend_online_indicator.enabled` is on and the user's online indicator preference lets this
 * friend through (`shouldNotifyFriendOnline`: 1 only friends with a relationship status, 2 nobody).
 * A click opens the conversation (`messenger/<id>`).
 */
export const notifyFriendOnline = (friend: IMessengerFriend) => {
    const { config, getLocalizationValue } = systemStore.getState();

    if (config['friend_online_indicator.enabled'] !== true) return;

    switch (userStore.getState().onlineIndicatorPreference) {
        case 1:
            if (friend.relationshipType === MessengerFriendRelationType.Zero) return;
            break;
        case 2:
            return;
    }

    notificationStore.getState().addNotification(
        getLocalizationValue('notifications.friend_online', '', { name: friend.name }),
        'friendonline',
        undefined,
        `messenger/${friend.playerId}`,
        { figure: friend.figure, gender: friend.gender },
    );
};

/**
 * `FriendListTab.setNewMessageArrived(true)`: the tab's header is highlighted, unless it is the open
 * tab. A closed friend list opens on the friends tab, which counts as open.
 */
export const highlightFriendListTab = (tab: keyof FriendListHighlightedTabs) => {
    const openTab = systemStore.getState().visibleWindows.friendlist?.tab ?? 'friends';

    userStore.getState().setFriendListTabHighlighted(tab, openTab !== tab);
};
