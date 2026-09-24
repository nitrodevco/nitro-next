import { IGuildMemberData, IMemberData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * The members window's one page - Flash's `GuildMembersWindowCtrl` and the `GuildMemberData` it
 * holds. The server owns the paging: a page is asked for and the answer replaces what is shown,
 * so the only state besides it is the group the window was opened for, whether a search is in
 * flight (the spinner beside the filter box), and the two things the controller keeps between
 * openings - the kick being confirmed and when the last page was asked for.
 */

/**
 * `GuildKickData`: who is about to be kicked or blocked, kept while the server is asked how much
 * of their furniture stands in the base room - the confirmation names that count, and only its OK
 * sends `KickMemberComposer`.
 */
export interface GroupPendingKick {
    guildId: number;
    userId: number;
    blocked: boolean;
}

type State = {
    /** `GuildMembersWindowCtrl._groupId`: what `onMembersClick` asked for; 0 when the window is closed. */
    membersGroupId: number;
    /** The page the server last sent; `undefined` until the first answer arrives. */
    members: IGuildMemberData | undefined;
    /** `setSearchingIcon`. */
    searching: boolean;
    /** What the filter box holds while the user types, before the search timer fires. */
    filterText: string;
    pendingKick: GroupPendingKick | undefined;
    /** When the last page was asked for, which is what `REQUEST_PAGE_RATELIMIT` is measured from. */
    lastSearchAt: number;
};

type Actions = {
    /** `onMembersClick`: the window was asked for a group, before the answer is in. */
    openGroupMembers: (groupId: number) => void;
    /** `onGuildMembers`: a page arrived. It also seeds the filter box, as `populateUserNameFilter` does. */
    setGroupMembers: (members: IGuildMemberData) => void;
    /** `GuildMemberData.update`: one row changed, the rest of the page stands. */
    updateGroupMember: (groupId: number, member: IMemberData) => void;
    setGroupMembersSearching: (searching: boolean) => void;
    setGroupMembersFilterText: (filterText: string) => void;
    /** `handleUserKick` / `handleUserBlock`: the furniture count is being asked for. */
    setGroupPendingKick: (pendingKick: GroupPendingKick | undefined) => void;
    /** `doSearch`: a page was asked for at this moment, which the rate limit is measured from. */
    setGroupMembersLastSearch: (lastSearchAt: number) => void;
    /** `close`. */
    closeGroupMembers: () => void;
};

export const GroupMembersSliceInitialState: State = {
    membersGroupId: 0,
    members: undefined,
    searching: false,
    filterText: '',
    pendingKick: undefined,
    lastSearchAt: 0,
};

export type GroupMembersSlice = State & Actions;

/** `GuildMembersWindowCtrl.REQUEST_PAGE_RATELIMIT` - how long `doSearch` drops a second request for. */
export const GROUP_MEMBER_REQUEST_PAGE_RATELIMIT = 500;

/** `GuildMemberData.totalPages`. */
export const groupMemberPageCount = (members: IGuildMemberData): number =>
    Math.max(1, Math.ceil(members.totalEntries / Math.max(1, members.pageSize)));

/** `GuildMembersWindowCtrl.limitPageIndex`. */
export const limitGroupMemberPage = (members: IGuildMemberData, pageIndex: number): number =>
    Math.max(0, Math.min(pageIndex, Math.ceil(members.totalEntries / Math.max(1, members.pageSize)) - 1));

export const createGroupMembersSlice: StateCreator<GroupMembersSlice, [], [], GroupMembersSlice> = set => ({
    ...GroupMembersSliceInitialState,
    openGroupMembers: membersGroupId => set({ membersGroupId, searching: true }),
    setGroupMembers: members => set({ members, membersGroupId: members.groupId, searching: false, filterText: members.userNameFilter }),
    updateGroupMember: (groupId, member) => set((x) => {
        if (!x.members || (x.members.groupId !== groupId)) return x;

        const entries = x.members.entries.some(entry => entry.userId === member.userId)
            ? x.members.entries.map(entry => ((entry.userId === member.userId) ? member : entry))
            : [ ...x.members.entries, member ];

        return { members: { ...x.members, entries } };
    }),
    setGroupMembersSearching: searching => set({ searching }),
    setGroupMembersFilterText: filterText => set({ filterText }),
    setGroupPendingKick: pendingKick => set({ pendingKick }),
    setGroupMembersLastSearch: lastSearchAt => set({ lastSearchAt }),
    // The kick being confirmed outlives the window: leaving a group is started from the details window.
    closeGroupMembers: () => set(x => ({ ...GroupMembersSliceInitialState, pendingKick: x.pendingKick })),
});
