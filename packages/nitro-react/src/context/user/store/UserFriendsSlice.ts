import { FriendListUpdateActionType, FriendRequestStateType, IFriendRequest, IMessengerCategory, IMessengerFriend, IMessengerSearchResult, IMessengerUpdate } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { friendBarAfterFragment, friendBarAfterNotification, friendBarAfterUpdates, FriendBarNotification } from './friendBarOrder';

type State = {
    userFriendLimit: number;
    normalFriendLimit: number;
    extendedFriendLimit: number;
    categories: IMessengerCategory[];
    friends: Record<number, IMessengerFriend>;
    requests: Record<number, IFriendRequest>;
    /** The friend bar's friends - the online ones, in `HabboFriendBarData`'s order (`friendBarOrder`). */
    friendBarIds: number[];
    /** Each bar friend's notifications (`IFriendEntity.notifications`), in the order they came. */
    friendBarNotifications: Record<number, FriendBarNotification[]>;
    /** `AvatarSearchResults.friends` / `others`: the last `HabboSearchResultMessage`. */
    searchFriends: IMessengerSearchResult[];
    searchOthers: IMessengerSearchResult[];
    /** `SearchView.refreshList` has run: before the first answer the list holds no rows at all. */
    searchResultsReceived: boolean;
    /**
     * `FriendRequestsView._SafeStr_4889` set: the requests tab's list has been built once
     * (`fillList`), after which every tab click lets the answered requests go (`tabClicked`).
     * Flash never clears it.
     */
    friendRequestsListShown: boolean;
};

type Actions = {
    setFriendLimits: (userFriendLimit: number, normalFriendLimit: number, extendedFriendLimit: number) => void;
    setFriendCategories: (categories: IMessengerCategory[]) => void;
    processFriends: (friends: IMessengerFriend[]) => void;
    processFriendUpdates: (updates: IMessengerUpdate[]) => void;
    processFriendRequests: (requests: IFriendRequest[]) => void;
    /** `HabboFriendList.onFriendRequests`: `clearAndUpdateView(false)`, then every request in the list, open. */
    replaceFriendRequests: (requests: IFriendRequest[]) => void;
    /** `FriendRequest.state`: an answered request stays in the list, drawn with its outcome, until the tab is clicked. */
    setFriendRequestsState: (requesterIds: number[], state: FriendRequestStateType) => void;
    /** `FriendRequestsView.tabClicked` -> `clearAndUpdateView(true)`: the answered requests go. */
    clearAnsweredFriendRequests: () => void;
    /** `FriendRequestsView.fillList`: the requests tab has been opened. */
    markFriendRequestsListShown: () => void;
    /** `HabboFriendBarData.makeNotification` for a `FriendNotificationMessage` (see `friendBarAfterNotification`). */
    addFriendBarNotification: (friendId: number, typeCode: number, message: string) => void;
    /** `NewFriendEntityTab.deselect`: the shown-once notifications go once the tab closes. */
    clearViewedFriendBarNotifications: (friendId: number) => void;
    /** `AvatarSearchResults.searchReceived`. */
    setSearchResults: (friends: IMessengerSearchResult[], others: IMessengerSearchResult[]) => void;
};

/**
 * The friend list as the server sends it - limits, categories, friends and requests - and the
 * search tab's last results (Flash's `AvatarSearchResults`; which of them were asked to be
 * friends is `UserSocialSlice.sentFriendRequestIds`, the same record the infostand reads). On the
 * user store rather than the friend list window's, because the room widgets read it too.
 */
export const UserFriendsSlice: State = {
    userFriendLimit: 0,
    normalFriendLimit: 0,
    extendedFriendLimit: 0,
    categories: [],
    friends: {},
    requests: {},
    friendBarIds: [],
    friendBarNotifications: {},
    searchFriends: [],
    searchOthers: [],
    searchResultsReceived: false,
    friendRequestsListShown: false,
};

export type UserFriendsSlice = State & Actions;

export const createUserFriendsSlice: StateCreator<UserFriendsSlice, [], [], UserFriendsSlice> = set => ({
    ...UserFriendsSlice,
    setFriendLimits: (userFriendLimit: number, normalFriendLimit: number, extendedFriendLimit: number) => set({ userFriendLimit, normalFriendLimit, extendedFriendLimit }),
    setFriendCategories: (categories: IMessengerCategory[]) => set({ categories }),
    setSearchResults: (searchFriends: IMessengerSearchResult[], searchOthers: IMessengerSearchResult[]) => set({ searchFriends, searchOthers, searchResultsReceived: true }),
    processFriends: (friends: IMessengerFriend[]) => set((x) => {
        const updates = friends.reduce((acc, data) => ({
            ...acc,
            [data.playerId]: data,
        }), {});

        return {
            friends: { ...x.friends, ...updates },
            friendBarIds: friendBarAfterFragment(x.friendBarIds, friends),
        };
    }),
    processFriendUpdates: (updates: IMessengerUpdate[]) => set((x) => {
        const friends = { ...x.friends };

        for (const update of updates) {
            if (update.friendId === -1) continue;

            if (update.actionType === FriendListUpdateActionType.Removed) {
                delete friends[update.friendId];

                continue;
            }

            if (update.friend) friends[update.friendId] = update.friend;
        }

        const friendBarIds = friendBarAfterUpdates(x.friendBarIds, updates);
        // A friend the bar lets go of goes with their notifications: coming back is a new `FriendEntity`.
        const friendBarNotifications = Object.fromEntries(Object.entries(x.friendBarNotifications).filter(([ id ]) => friendBarIds.includes(Number(id))));

        return { friends, friendBarIds, friendBarNotifications };
    }),
    addFriendBarNotification: (friendId: number, typeCode: number, message: string) => set((x) => {
        const next = friendBarAfterNotification(x.friendBarIds, x.friendBarNotifications[friendId] ?? [], friendId, typeCode, message);

        if (!next) return x;

        return { friendBarIds: next.ids, friendBarNotifications: { ...x.friendBarNotifications, [friendId]: next.notifications } };
    }),
    clearViewedFriendBarNotifications: (friendId: number) => set((x) => {
        const notifications = x.friendBarNotifications[friendId];

        if (!notifications?.some(notification => notification.viewOnce)) return x;

        return { friendBarNotifications: { ...x.friendBarNotifications, [friendId]: notifications.filter(notification => !notification.viewOnce) } };
    }),
    processFriendRequests: (requests: IFriendRequest[]) => set((x) => {
        const updates = requests.reduce((acc, data) => ({
            ...acc,
            [data.playerId]: data,
        }), {});

        return {
            requests: { ...x.requests, ...updates },
        };
    }),
    replaceFriendRequests: (requests: IFriendRequest[]) => set({
        requests: requests.reduce((acc, data) => ({ ...acc, [data.playerId]: data }), {}),
    }),
    setFriendRequestsState: (requesterIds: number[], state: FriendRequestStateType) => set((x) => {
        const requests = { ...x.requests };

        for (const requesterId of requesterIds) {
            if (requests[requesterId]) requests[requesterId] = { ...requests[requesterId], state };
        }

        return { requests };
    }),
    markFriendRequestsListShown: () => set({ friendRequestsListShown: true }),
    clearAnsweredFriendRequests: () => set(x => ({
        requests: Object.fromEntries(Object.entries(x.requests).filter(([ , request ]) => request.state === FriendRequestStateType.Open)),
    })),
});
