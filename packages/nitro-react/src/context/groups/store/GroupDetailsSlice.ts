import { IHabboGroupDetails } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * The group details the client has been told about, and which of them the details window is
 * showing - Flash's `DetailsWindowCtrl` plus the `HabboGroupDetailsData` its siblings share.
 *
 * Every window that names a group works from this cache: `HabboGroupsManager.onGroupDetails` hands
 * one answer to the details window, the extended profile and the room banner alike, so one record
 * per group is all there is.
 */
type State = {
    /** By group id - enough to name a group furni's group without asking again. */
    detailsById: Record<number, IHabboGroupDetails>;
    /** The group the details window shows; 0 when it is closed (`DetailsWindowCtrl._groupId`). */
    infoGroupId: number;
};

type Actions = {
    /**
     * `onGroupDetails`: caches the answer, and takes it as the details window's group when the
     * server asked for the window to open (`openDetails`).
     */
    setGroupDetails: (details: IHabboGroupDetails) => void;
    /** `DetailsWindowCtrl.close`. */
    closeGroupInfo: () => void;
    /** `HabboGroupDeactivatedMessage`: the group is gone, so forget it. */
    forgetGroup: (groupId: number) => void;
};

export const GroupDetailsSliceInitialState: State = {
    detailsById: {},
    infoGroupId: 0,
};

export type GroupDetailsSlice = State & Actions;

export const createGroupDetailsSlice: StateCreator<GroupDetailsSlice, [], [], GroupDetailsSlice> = set => ({
    ...GroupDetailsSliceInitialState,
    setGroupDetails: details => set(x => ({
        detailsById: { ...x.detailsById, [details.groupId]: details },
        infoGroupId: details.openDetails ? details.groupId : x.infoGroupId,
    })),
    closeGroupInfo: () => set({ infoGroupId: 0 }),
    forgetGroup: groupId => set((x) => {
        const detailsById = { ...x.detailsById };

        delete detailsById[groupId];

        return { detailsById, infoGroupId: (x.infoGroupId === groupId) ? 0 : x.infoGroupId };
    }),
});
