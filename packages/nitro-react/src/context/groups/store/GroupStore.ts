import { createStore } from 'zustand';

import { createGroupDetailsSlice, GroupDetailsSlice } from './GroupDetailsSlice';
import { createGroupManagementSlice, GroupManagementSlice } from './GroupManagementSlice';
import { createGroupMembersSlice, GroupMembersSlice } from './GroupMembersSlice';
import { createGroupRoomInfoSlice, GroupRoomInfoSlice } from './GroupRoomInfoSlice';

export type GroupStore = GroupDetailsSlice & GroupMembersSlice & GroupManagementSlice & GroupRoomInfoSlice;

export const createGroupStore = () => createStore<GroupStore>()((set, get, store) => ({
    ...createGroupDetailsSlice(set, get, store),
    ...createGroupMembersSlice(set, get, store),
    ...createGroupManagementSlice(set, get, store),
    ...createGroupRoomInfoSlice(set, get, store),
}));

/**
 * The one GroupStore for the whole client - the port of `HabboGroupsManager`, which is a component
 * that lives as long as the session and owns every group window. Its windows reopen onto what they
 * held (the details cache, the badge parts the server sends once), so there is nothing a
 * window-scoped store would add: components read it through their hooks, and packet handlers and
 * commands through `getState()`, which is always current.
 */
export const groupStore = createGroupStore();
