import { FriendRequestQuestCompleteComposer, HabboSearchComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { sendFriendRequest } from './roomUserCommands';

type Send = WebSocketConnection['send'];

/**
 * What Flash's `HabboFriendList` does on behalf of its search tab (`SearchView`) and anything else
 * that asks someone to be a friend: the search itself, the friend request with the friend list's
 * own limit check, and the two alerts that answer it.
 */

/** `SearchView.searchAvatar`: an empty search is not sent. */
export const searchAvatar = (send: Send, searchQuery: string) => {
    if (searchQuery === '') return;

    send(new HabboSearchComposer({ searchQuery }));
};

/**
 * `HabboFriendList.canBeAskedForAFriend`: not a friend already, not asked already, and fewer
 * friends than the list's limit (`friendRequests.limit`, which `MessengerInit` sets from
 * `userFriendLimit`).
 */
export const canBeAskedForAFriend = (userId: number): boolean => {
    const { friends, sentFriendRequestIds, userFriendLimit } = userStore.getState();

    return !friends[userId] && !sentFriendRequestIds.includes(userId) && (Object.keys(friends).length < userFriendLimit);
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
