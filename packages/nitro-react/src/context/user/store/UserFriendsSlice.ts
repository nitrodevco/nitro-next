import { FriendListUpdateActionType, IFriendRequest, IMessengerCategory, IMessengerFriend, IMessengerSearchResult, IMessengerUpdate } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

type State = {
    userFriendLimit: number;
    normalFriendLimit: number;
    extendedFriendLimit: number;
    categories: IMessengerCategory[];
    friends: Record<number, IMessengerFriend>;
    requests: Record<number, IFriendRequest>;
    /** `AvatarSearchResults.friends` / `others`: the last `HabboSearchResultMessage`. */
    searchFriends: IMessengerSearchResult[];
    searchOthers: IMessengerSearchResult[];
};

type Actions = {
    setFriendLimits: (userFriendLimit: number, normalFriendLimit: number, extendedFriendLimit: number) => void;
    setFriendCategories: (categories: IMessengerCategory[]) => void;
    processFriends: (friends: IMessengerFriend[]) => void;
    processFriendUpdates: (updates: IMessengerUpdate[]) => void;
    processFriendRequests: (requests: IFriendRequest[]) => void;
    /** Drops requests the user has answered (accept/decline) without waiting for the server's next friend-list update. */
    removeFriendRequests: (playerIds: number[]) => void;
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
    searchFriends: [],
    searchOthers: [],
};

export type UserFriendsSlice = State & Actions;

export const createUserFriendsSlice: StateCreator<UserFriendsSlice, [], [], UserFriendsSlice> = (set, get, store) => ({
    ...UserFriendsSlice,
    setFriendLimits: (userFriendLimit: number, normalFriendLimit: number, extendedFriendLimit: number) => set({ userFriendLimit, normalFriendLimit, extendedFriendLimit }),
    setFriendCategories: (categories: IMessengerCategory[]) => set({ categories }),
    setSearchResults: (searchFriends: IMessengerSearchResult[], searchOthers: IMessengerSearchResult[]) => set({ searchFriends, searchOthers }),
    processFriends: (friends: IMessengerFriend[]) => set((x) => {
        const updates = friends.reduce((acc, data) => ({
            ...acc,
            [data.playerId]: data,
        }), {});

        return {
            friends: { ...x.friends, ...updates },
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

        return { friends };
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
    removeFriendRequests: (playerIds: number[]) => set((x) => {
        const requests = { ...x.requests };

        for (const playerId of playerIds) delete requests[playerId];

        return { requests };
    }),
});
