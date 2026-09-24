import { StateCreator } from 'zustand';

/**
 * The banner a group's base room shows over the room - Flash's `GroupRoomInfoCtrl`. Entering a
 * room whose `habboGroupId` is set asks for that group's details, and the answer for *that* group
 * fills the banner; details for any other group are cache traffic and do not touch it.
 *
 * `currentRoomId` is `HabboGroupsManager._roomId` rather than the banner's own: the manager keeps
 * the room `RoomEntryInfoMessage` last named so `onGuildCreated` can tell whether the new group's
 * base room is the one being stood in. It is the manager's, so leaving a group's room does not
 * clear it.
 */
type State = {
    /**
     * The group the room said it belongs to, while its details are being fetched and after -
     * `GroupRoomInfoCtrl._expectedGroupId`. 0 in a room with no group.
     */
    expectedGroupId: number;
    /** The group the banner is drawn for, once its details have arrived. */
    roomGroupId: number;
    /** `_expanded`: the title bar alone, or the whole card. Every fill starts expanded. */
    expanded: boolean;
    /** `HabboGroupsManager._roomId` - the room the client is standing in. */
    currentRoomId: number;
};

type Actions = {
    /** `onRoomInfo`: the room named its group, or named none. */
    setGroupRoomExpectation: (groupId: number) => void;
    /** `onGroupDetails`: the details are in for the group the room named. */
    setGroupRoomInfo: (groupId: number) => void;
    /** `onTitleClick`. */
    toggleGroupRoomInfoExpanded: () => void;
    /** `close` - leaving the room, and a group that was deactivated. */
    closeGroupRoomInfo: () => void;
    /** `onRoomEnter`: `_roomId = parser.guestRoomId`. */
    setGroupCurrentRoom: (roomId: number) => void;
};

export const GroupRoomInfoSliceInitialState: State = {
    expectedGroupId: 0,
    roomGroupId: 0,
    expanded: true,
    currentRoomId: 0,
};

export type GroupRoomInfoSlice = State & Actions;

/** What `GroupRoomInfoCtrl.close` puts back - the banner's own fields, not the manager's room id. */
const CLOSED = { expectedGroupId: 0, roomGroupId: 0, expanded: true };

export const createGroupRoomInfoSlice: StateCreator<GroupRoomInfoSlice, [], [], GroupRoomInfoSlice> = set => ({
    ...GroupRoomInfoSliceInitialState,
    setGroupRoomExpectation: groupId => set((groupId > 0) ? { expectedGroupId: groupId } : { ...CLOSED }),
    setGroupRoomInfo: groupId => set(x => ((x.expectedGroupId === groupId) ? { roomGroupId: groupId, expanded: true } : x)),
    toggleGroupRoomInfoExpanded: () => set(x => ({ expanded: !x.expanded })),
    closeGroupRoomInfo: () => set({ ...CLOSED }),
    setGroupCurrentRoom: currentRoomId => set({ currentRoomId }),
});
