import { FriendListUpdateActionType, IFriendRequest, IMessengerCategory, IMessengerFriend, IMessengerUpdate } from "@nitrodevco/nitro-packets";
import type { StateCreator } from "zustand";

type State = {
    userFriendLimit: number;
    normalFriendLimit: number;
    extendedFriendLimit: number;
    categories: IMessengerCategory[];
    friends: Record<number, IMessengerFriend>;
    requests: Record<number, IFriendRequest>;
}

type Actions = {
    setFriendLimits: (userFriendLimit: number, normalFriendLimit: number, extendedFriendLimit: number) => void;
    setFriendCategories: (categories: IMessengerCategory[]) => void;
    processFriends: (friends: IMessengerFriend[]) => void;
    processFriendUpdates: (updates: IMessengerUpdate[]) => void;
    processFriendRequests: (requests: IFriendRequest[]) => void;
};

export const UserFriendsSlice: State = {
    userFriendLimit: 0,
    normalFriendLimit: 0,
    extendedFriendLimit: 0,
    categories: [],
    friends: {},
    requests: {}
};

export type UserFriendsSlice = State & Actions;

export const createUserFriendsSlice: StateCreator<UserFriendsSlice, [], [], UserFriendsSlice> = (set, get, store) => ({
    ...UserFriendsSlice,
    setFriendLimits: (userFriendLimit: number, normalFriendLimit: number, extendedFriendLimit: number) => set({ userFriendLimit, normalFriendLimit, extendedFriendLimit }),
    setFriendCategories: (categories: IMessengerCategory[]) => set({ categories }),
    processFriends: (friends: IMessengerFriend[]) => set(x => {
        const updates = friends.reduce((acc, data) => ({
            ...acc,
            [data.playerId]: data
        }), {});

        return {
            friends: { ...x.friends, ...updates }
        };
    }),
    processFriendUpdates: (updates: IMessengerUpdate[]) => set(x => {
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
    processFriendRequests: (requests: IFriendRequest[]) => set(x => {
        const updates = requests.reduce((acc, data) => ({
            ...acc,
            [data.playerId]: data
        }), {});

        return {
            requests: { ...x.requests, ...updates }
        };
    }),
});