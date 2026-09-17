import { IHabboGroupDetails } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * Who the user has ignored, blocked and already asked to be friends with, and the badges of the
 * groups seen so far - what Flash's `SessionDataManager` kept in its `IgnoredUsersManager`,
 * `BlockedUsersManager` and `HabboGroupInfoManager`, and what the avatar menu asks it about.
 */
type State = {
    ignoredUserIds: number[];
    blockedUserIds: number[];
    /** Group id against the badge code it is drawn from. */
    groupBadges: Record<number, string>;
    /** Groups whose details have arrived, by id - enough to name a group furni's group. */
    groupDetailsById: Record<number, IHabboGroupDetails>;
    /** Asked this session; the friend button is not offered twice. */
    sentFriendRequestIds: number[];
};

type Actions = {
    setIgnoredUsers: (userIds: number[]) => void;
    /** `IgnoredUsersManager.onIgnoreResult`: 1 ignored, 2 ignored and the oldest dropped, 3 unignored. */
    applyIgnoreResult: (result: number, userId: number) => void;
    setBlockedUsers: (userIds: number[]) => void;
    /** `BlockedUsersManager.onBlockUpdate`: 1 blocked, 0 unblocked. */
    applyBlockUpdate: (result: number, userId: number) => void;
    mergeGroupBadges: (badges: Map<number, string>) => void;
    setGroupDetails: (details: IHabboGroupDetails) => void;
    markFriendRequestSent: (userId: number) => void;
    /** `SessionDataManager.giveRespect` counts the respect down as it sends it. */
    spendRespect: () => void;
};

export const UserSocialSliceInitialState: State = {
    ignoredUserIds: [],
    blockedUserIds: [],
    groupBadges: {},
    groupDetailsById: {},
    sentFriendRequestIds: [],
};

export type UserSocialSlice = State & Actions & { respectLeft: number };

export const createUserSocialSlice: StateCreator<UserSocialSlice, [], [], State & Actions> = set => ({
    ...UserSocialSliceInitialState,
    setIgnoredUsers: userIds => set({ ignoredUserIds: [ ...userIds ] }),
    applyIgnoreResult: (result, userId) => set((x) => {
        const without = x.ignoredUserIds.filter(id => id !== userId);

        switch (result) {
            case 1:
                return { ignoredUserIds: [ ...without, userId ] };
            case 2:
                return { ignoredUserIds: [ ...without.slice(1), userId ] };
            case 3:
                return { ignoredUserIds: without };
            default:
                return x;
        }
    }),
    setBlockedUsers: userIds => set({ blockedUserIds: [ ...userIds ] }),
    applyBlockUpdate: (result, userId) => set((x) => {
        const without = x.blockedUserIds.filter(id => id !== userId);

        return { blockedUserIds: (result === 1) ? [ ...without, userId ] : without };
    }),
    mergeGroupBadges: badges => set(x => ({ groupBadges: { ...x.groupBadges, ...Object.fromEntries(badges) } })),
    setGroupDetails: details => set(x => ({ groupDetailsById: { ...x.groupDetailsById, [details.groupId]: details } })),
    markFriendRequestSent: userId => set(x => (x.sentFriendRequestIds.includes(userId) ? x : { sentFriendRequestIds: [ ...x.sentFriendRequestIds, userId ] })),
    spendRespect: () => set(x => ({ respectLeft: Math.max(0, x.respectLeft - 1) })),
});
